/**
 * Drone simulation engine
 * Handles deterministic, smooth drone movement along waypoints
 */

import { listDronesByRestaurant, patchDrone, type Drone, type DroneUpdate } from '@/services/droneApi';
import { haversineMeters, interpolate, estimateEtaSeconds, type Coordinates } from '@/utils/geo';

export interface DroneSimulationOptions {
  restaurant: string;
  intervalMs?: number;
}

interface DroneState {
  drone: Drone;
  currentWaypointIndex: number;
  progress: number; // 0-1 progress along current segment
  lastUpdateTime: number;
}

interface SimulationState {
  drones: Map<string, DroneState>;
  lastGoodSnapshot: Drone[];
  isRunning: boolean;
  intervalId: NodeJS.Timeout | null;
  retryCount: number;
  lastPollTime: number;
}

const simulationStates = new Map<string, SimulationState>();

// Constants
const DEFAULT_INTERVAL_MS = 2000;
const MAX_RETRY_DELAY_MS = 10000;
const MIN_PATCH_INTERVAL_MS = 2000; // Throttle PATCH writes
const DEBOUNCE_UPDATE_MS = 400; // Debounce UI updates

/**
 * Simple hash function for deterministic seeding
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Get deterministic time offset based on orderId for consistent motion
 */
function getTimeOffset(orderId: string | null): number {
  if (!orderId) return 0;
  return hashString(orderId) % 10000; // 0-10 seconds offset
}

/**
 * Exponential backoff retry delay
 */
function getRetryDelay(retryCount: number): number {
  return Math.min(MAX_RETRY_DELAY_MS, Math.pow(2, retryCount) * 1000);
}

/**
 * Advance a single drone along its waypoints
 */
function advanceDrone(
  state: DroneState,
  deltaTimeMs: number,
  orderId: string | null
): DroneState {
  const { drone, currentWaypointIndex, progress } = state;
  const { waypoints, speedMps, position } = drone;

  if (waypoints.length === 0) {
    return state; // No waypoints to follow
  }

  // Determine start and end points
  const startIndex = Math.max(0, currentWaypointIndex - 1);
  const endIndex = Math.min(waypoints.length - 1, currentWaypointIndex);

  const start: Coordinates = startIndex === -1
    ? position
    : waypoints[startIndex];
  const end: Coordinates = waypoints[endIndex];

  // Calculate distance and time
  const distanceMeters = haversineMeters(start, end);
  const timeToTravelMs = (distanceMeters / speedMps) * 1000;

  if (timeToTravelMs <= 0 || distanceMeters < 1) {
    // Reached waypoint, move to next
    if (currentWaypointIndex < waypoints.length - 1) {
      return {
        ...state,
        currentWaypointIndex: currentWaypointIndex + 1,
        progress: 0,
        lastUpdateTime: Date.now(),
      };
    } else {
      // Reached final waypoint
      return {
        ...state,
        progress: 1,
        lastUpdateTime: Date.now(),
      };
    }
  }

  // Advance progress
  const progressDelta = deltaTimeMs / timeToTravelMs;
  let newProgress = progress + progressDelta;

  // Apply deterministic offset based on orderId
  const timeOffset = getTimeOffset(orderId);
  const adjustedTime = Date.now() + timeOffset;
  const seed = hashString(drone.id + adjustedTime.toString()) % 1000;
  const jitter = (seed / 1000) * 0.1; // Small jitter for realism
  newProgress = Math.min(1, newProgress + jitter);

  if (newProgress >= 1) {
    // Reached current waypoint
    if (currentWaypointIndex < waypoints.length - 1) {
      return {
        ...state,
        currentWaypointIndex: currentWaypointIndex + 1,
        progress: 0,
        lastUpdateTime: Date.now(),
      };
    } else {
      // Reached final waypoint - mark as arrived
      return {
        ...state,
        progress: 1,
        lastUpdateTime: Date.now(),
      };
    }
  }

  // Interpolate position
  const newPosition = interpolate(start, end, newProgress);

  return {
    ...state,
    progress: newProgress,
    lastUpdateTime: Date.now(),
    drone: {
      ...drone,
      position: newPosition,
    },
  };
}

/**
 * Update drone status based on waypoint progress
 */
function updateDroneStatus(state: DroneState): DroneState {
  const { drone, currentWaypointIndex, progress } = state;
  const { waypoints } = drone;

  if (waypoints.length === 0) {
    return state;
  }

  const isAtFinalWaypoint = currentWaypointIndex >= waypoints.length - 1;
  const isProgressComplete = progress >= 1;

  if (isAtFinalWaypoint && isProgressComplete && drone.status !== 'arrived') {
    return {
      ...state,
      drone: {
        ...drone,
        status: 'arrived' as const,
      },
    };
  }

  return state;
}

/**
 * Throttled PATCH update for a drone
 */
const lastPatchTimes = new Map<string, number>();

async function throttledPatchDrone(id: string, update: DroneUpdate): Promise<void> {
  const now = Date.now();
  const lastPatch = lastPatchTimes.get(id) || 0;

  if (now - lastPatch < MIN_PATCH_INTERVAL_MS) {
    return; // Skip if too soon
  }

  try {
    await patchDrone(id, update);
    lastPatchTimes.set(id, now);
  } catch (error) {
    console.error(`Failed to patch drone ${id}:`, error);
  }
}

/**
 * Poll drones from API with retry logic
 */
async function pollDrones(restaurant: string, state: SimulationState): Promise<Drone[]> {
  try {
    const drones = await listDronesByRestaurant(restaurant);
    state.lastGoodSnapshot = drones;
    state.retryCount = 0;
    state.lastPollTime = Date.now();
    return drones;
  } catch (error) {
    console.error(`Failed to poll drones for ${restaurant}:`, error);
    state.retryCount += 1;

    // Use cached snapshot on error
    if (state.lastGoodSnapshot.length > 0) {
      return state.lastGoodSnapshot;
    }

    // Retry with exponential backoff
    const retryDelay = getRetryDelay(state.retryCount);
    setTimeout(() => {
      pollDrones(restaurant, state).catch(console.error);
    }, retryDelay);

    return [];
  }
}

/**
 * Initialize or update drone states from API data
 */
function syncDroneStates(drones: Drone[], state: SimulationState): void {
  drones.forEach((drone) => {
    if (!state.drones.has(drone.id)) {
      // Initialize new drone
      state.drones.set(drone.id, {
        drone,
        currentWaypointIndex: 0,
        progress: 0,
        lastUpdateTime: Date.now(),
      });
    } else {
      // Update existing drone (preserve simulation state, update API data)
      const existing = state.drones.get(drone.id)!;
      state.drones.set(drone.id, {
        ...existing,
        drone: {
          ...drone,
          position: existing.drone.position, // Keep simulated position
        },
      });
    }
  });

  // Remove drones that no longer exist
  const droneIds = new Set(drones.map((d) => d.id));
  for (const [id] of state.drones) {
    if (!droneIds.has(id)) {
      state.drones.delete(id);
    }
  }
}

/**
 * Main simulation loop
 */
function runSimulation(restaurant: string, state: SimulationState): void {
  const intervalMs = DEFAULT_INTERVAL_MS;
  let lastFrameTime = Date.now();

  const frame = async () => {
    if (!state.isRunning) return;

    const now = Date.now();
    const deltaTime = now - lastFrameTime;
    lastFrameTime = now;

    // Poll API periodically (every 5 seconds)
    if (now - state.lastPollTime > 5000) {
      const drones = await pollDrones(restaurant, state);
      syncDroneStates(drones, state);
    }

    // Advance all drones
    const updates: Array<{ id: string; update: DroneUpdate }> = [];

    for (const [id, droneState] of state.drones) {
      const advanced = advanceDrone(droneState, deltaTime, droneState.drone.orderId);
      const withStatus = updateDroneStatus(advanced);
      state.drones.set(id, withStatus);

      // Prepare update for API
      const { drone } = withStatus;
      updates.push({
        id,
        update: {
          position: drone.position,
          status: drone.status,
          updatedAt: new Date().toISOString(),
        },
      });
    }

    // Throttled PATCH updates
    updates.forEach(({ id, update }) => {
      throttledPatchDrone(id, update).catch(console.error);
    });

    // Schedule next frame
    state.intervalId = setTimeout(frame, intervalMs);
  };

  frame();
}

/**
 * Start drone simulation for a restaurant
 */
export function startDroneSimulation(options: DroneSimulationOptions): () => void {
  const { restaurant, intervalMs = DEFAULT_INTERVAL_MS } = options;

  // Get or create simulation state
  let state = simulationStates.get(restaurant);
  if (!state) {
    state = {
      drones: new Map(),
      lastGoodSnapshot: [],
      isRunning: false,
      intervalId: null,
      retryCount: 0,
      lastPollTime: 0,
    };
    simulationStates.set(restaurant, state);
  }

  // Idempotent: don't start if already running
  if (state.isRunning) {
    return () => stopDroneSimulation(restaurant);
  }

  state.isRunning = true;

  // Initial poll
  pollDrones(restaurant, state)
    .then((drones) => {
      syncDroneStates(drones, state!);
      runSimulation(restaurant, state!);
    })
    .catch(console.error);

  // Return stop function
  return () => stopDroneSimulation(restaurant);
}

/**
 * Stop drone simulation for a restaurant
 */
export function stopDroneSimulation(restaurant: string): void {
  const state = simulationStates.get(restaurant);
  if (!state) return;

  state.isRunning = false;
  if (state.intervalId) {
    clearTimeout(state.intervalId);
    state.intervalId = null;
  }
}

/**
 * Get current drone states for a restaurant
 */
export function getDroneStates(restaurant: string): Drone[] {
  const state = simulationStates.get(restaurant);
  if (!state) return [];

  return Array.from(state.drones.values()).map((s) => s.drone);
}

