import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { api } from '@/api';
import { theme } from '@/theme';
import axios from 'axios';
import { simulateDronePath, getDroneByOrder, getDronePath, type PathPoint } from '@/services/droneService';

// [Data Sync] Use shared mock API server (same as web frontend)
const API_BASE_URL = 'http://192.168.0.100:8080/api';

interface DroneProps {
  orderId?: string;
  route?: {
    params?: {
      orderId?: string;
    };
  };
}

export default function Drone({ orderId, route }: DroneProps) {
  const [eta, setEta] = useState<number>(15);
  const [progress, setProgress] = useState<number>(0);
  // [Bind simulateDronePath Fix]
  const [activeDrone, setActiveDrone] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [dronePosition, setDronePosition] = useState<PathPoint | null>(null);
  const [mapDimensions, setMapDimensions] = useState<{ width: number; height: number }>({ width: 300, height: 300 });
  const pathCleanupRef = useRef<(() => void) | null>(null);

  // Get orderId from props or route params
  const currentOrderId = orderId || route?.params?.orderId;

  // [Status Normalization] Normalize order status for consistent drone activation
  // Converts English "Delivering" to Vietnamese "Đang giao" for unified logic
  // Handles both "Delivering" and "Đang giao" as the same logical state
  const normalizeOrderStatus = (status: string | undefined | null): string => {
    if (!status) return '';
    const raw = status.trim().toLowerCase();
    if (raw === 'delivering') return 'Đang giao';
    return status;
  };

  // [Bind simulateDronePath Fix]
  // Fetch order and drone data when orderId is available (initial load)
  useEffect(() => {
    if (!currentOrderId) {
      // Fallback to generic drone status if no orderId
      return;
    }

    const fetchOrderAndDrone = async () => {
      try {
        // [Data Sync] Fetch order from shared API
        const orderResponse = await axios.get(`${API_BASE_URL}/orders/${currentOrderId}`);
        const orderData = orderResponse.data;
        setOrder(orderData);
        
        // [Data Sync] Log sync status
        console.log(`[SYNC OK ✅] Mobile fetched order ${currentOrderId} from API`);

        // Fetch assigned drone using service
        const assignedDrone = await getDroneByOrder(currentOrderId);
        
        if (assignedDrone) {
          // Get path for drone (from API or generate if needed)
          const dronePath = getDronePath(assignedDrone);
          if (dronePath && dronePath.length > 0) {
            assignedDrone.path = dronePath;
          }
          
          setActiveDrone(assignedDrone);
          
          // Set initial position immediately if order is already in "Đang giao" status
          // [Status Normalization] Normalize status to handle both English and Vietnamese
          const normalizedStatus = normalizeOrderStatus(orderData.status);
          const isDelivering = normalizedStatus === 'Đang giao';
          
          if (isDelivering && assignedDrone.path && assignedDrone.path.length > 0) {
            setDronePosition(assignedDrone.path[0]);
            console.log(`[Drone] Initial drone position set for order ${currentOrderId} with status ${orderData.status}`);
            console.log(`📍 [Drone Motion Debug] Initial drone position:`, assignedDrone.path[0]); // [Drone Motion Debug]
          }
        } else {
          console.warn(`⚠️ No drone assigned for order ${currentOrderId}.`);
        }
      } catch (error) {
        console.error(`[Drone] Error fetching order/drone data for ${currentOrderId}:`, error);
      }
    };

    fetchOrderAndDrone();
  }, [currentOrderId]);

  // [Data Sync] Real-time polling to sync order status and drone state (every 3 seconds for faster sync)
  useEffect(() => {
    if (!currentOrderId) {
      return;
    }

    let isMounted = true;

    // [Data Sync] Polling interval: 3 seconds (reduced for faster synchronization)
    const pollingInterval = setInterval(async () => {
      if (!isMounted) return;

      try {
        // Fetch latest order status
        const orderResponse = await axios.get(`${API_BASE_URL}/orders/${currentOrderId}`);
        const latestOrder = orderResponse.data;
        
        if (!latestOrder || !isMounted) return;

        // Update order state if status changed
        setOrder(prevOrder => {
          if (!prevOrder || prevOrder.status !== latestOrder.status) {
            console.log(`[Drone] Order ${currentOrderId} status changed: ${prevOrder?.status || 'unknown'} → ${latestOrder.status}`);
            // [Data Sync] Log sync success
            console.log(`[SYNC OK ✅] Mobile order ${currentOrderId} synced with API (status: ${latestOrder.status})`);
            return latestOrder;
          }
          // [Data Sync] Log sync even if status unchanged
          console.log(`[SYNC OK ✅] Mobile order ${currentOrderId} in sync with API`);
          return prevOrder;
        });

        // When status = "Delivering" or "Đang giao", show the drone and update its path
        // [Status Normalization] Normalize status to handle both English and Vietnamese
        const normalizedStatus = normalizeOrderStatus(latestOrder.status);
        const isDelivering = normalizedStatus === 'Đang giao';
        
        if (isDelivering && isMounted) {
          // Fetch assigned drone using service
          const assignedDrone = await getDroneByOrder(currentOrderId);
          
          if (assignedDrone) {
            // Get path for drone
            const dronePath = getDronePath(assignedDrone);
            if (dronePath && dronePath.length > 0) {
              assignedDrone.path = dronePath;
            }
            
            // Update active drone state immediately to trigger path simulation
            setActiveDrone(prevDrone => {
              if (!prevDrone || prevDrone.id !== assignedDrone.id) {
                console.log(`🛸 Starting drone simulation for order: ${currentOrderId}`);
                console.log(`[Drone] Drone ${assignedDrone.id} assigned to order ${currentOrderId}, status: ${latestOrder.status}`);
                // Set initial position from first path point if available
                if (assignedDrone.path && assignedDrone.path.length > 0) {
                  setDronePosition(assignedDrone.path[0]);
                  console.log(`📍 [Drone Motion Debug] Initial drone position:`, assignedDrone.path[0]); // [Drone Motion Debug]
                }
                return assignedDrone;
              }
              return prevDrone;
            });
          } else {
            console.warn(`⚠️ No drone found for order ${currentOrderId} with status ${latestOrder.status}`);
          }
        }

        // When status = "Delivered" or "Đã giao" or "Đã hủy", hide drone and stop tracking
        const isCompleted = latestOrder.status === 'Delivered' || 
                           latestOrder.status === 'delivered' || 
                           latestOrder.status === 'Đã giao' ||
                           latestOrder.status === 'Cancelled' || 
                           latestOrder.status === 'cancelled' || 
                           latestOrder.status === 'Đã hủy';
        
        if (isCompleted && isMounted) {
          // Cleanup path simulation immediately
          if (pathCleanupRef.current) {
            pathCleanupRef.current();
            pathCleanupRef.current = null;
          }
          
          // Hide drone immediately - clear both state variables
          setActiveDrone(prevDrone => {
            if (prevDrone) {
              console.log(`[Drone] Order ${currentOrderId} status changed to ${latestOrder.status}, hiding drone ${prevDrone.id}`);
            }
            return null;
          });
          setDronePosition(null);
          console.log(`[Drone] Order ${currentOrderId} completed/cancelled (status: ${latestOrder.status}), drone hidden and tracking stopped`);
        }
      } catch (error) {
        console.error(`[Drone] Error polling order/drone data for ${currentOrderId}:`, error);
        // [Data Sync] Log desync on error
        console.warn(`[DESYNC ⚠️] Mobile failed to fetch order ${currentOrderId} from API`);
      }
    }, 3000); // [Data Sync] Poll every 3 seconds for faster synchronization

    // Cleanup on unmount or when orderId changes
    return () => {
      isMounted = false;
      clearInterval(pollingInterval);
    };
  }, [currentOrderId]);

  // [Bind simulateDronePath Fix]
  // Start path simulation when activeDrone is available and order status is "Đang giao"
  useEffect(() => {
    // Cleanup previous simulation if exists
    if (pathCleanupRef.current) {
      pathCleanupRef.current();
      pathCleanupRef.current = null;
    }

    // Stop simulation if order is cancelled or completed
    const isCompleted = order && (
      order.status === 'cancelled' || 
      order.status === 'Cancelled' || 
      order.status === 'delivered' || 
      order.status === 'Delivered' ||
      order.status === 'Đã giao' ||
      order.status === 'Đã hủy'
    );
    
    if (isCompleted) {
      // Clear drone position immediately when order is completed/cancelled
      setDronePosition(null);
      console.log(`[Drone] Path simulation stopped for order ${currentOrderId} - status: ${order.status}`);
      console.log(`🧹 [Drone Motion Debug] Cleanup: simulation stopped for order: ${order?.id}`); // [Drone Motion Debug]
      return;
    }

    // Start path simulation if drone is available and order is delivering
    // [Status Normalization] Normalize status to handle both English and Vietnamese
    const normalizedStatus = order ? normalizeOrderStatus(order.status) : '';
    const isDelivering = normalizedStatus === 'Đang giao';
    
    if (activeDrone && isDelivering) {
      // Ensure drone has path data
      const droneWithPath = { ...activeDrone };
      if (!droneWithPath.path || droneWithPath.path.length === 0) {
        const dronePath = getDronePath(droneWithPath);
        if (dronePath && dronePath.length > 0) {
          droneWithPath.path = dronePath;
        }
      }
      
      // Only start simulation if path exists
      if (droneWithPath.path && droneWithPath.path.length > 0) {
        console.log(`🛸 [Drone Motion Debug] Starting simulation for order:`, order?.id); // [Drone Motion Debug]
        console.log(`📍 [Drone Motion Debug] Initial drone position:`, dronePosition); // [Drone Motion Debug]
        const cleanup = simulateDronePath(droneWithPath, (pos) => {
          setDronePosition(pos);
          console.log(`📍 Drone position:`, pos);
          console.log(`📡 [Drone Motion Debug] Drone position updated:`, pos); // [Drone Motion Debug]
        }, 2000); // Move every 2 seconds

        if (cleanup) {
          pathCleanupRef.current = cleanup;
          console.log(`[Drone] Started path simulation for drone ${activeDrone.id} on order ${currentOrderId}`);
        }
      }
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (pathCleanupRef.current) {
        pathCleanupRef.current();
        pathCleanupRef.current = null;
        console.log(`🧹 [Drone Motion Debug] Cleanup: simulation stopped for order: ${order?.id}`); // [Drone Motion Debug]
      }
    };
  }, [activeDrone, order, currentOrderId]);

  // [Bind simulateDronePath Fix]
  // Debug logging for active drone and position
  useEffect(() => {
    if (activeDrone) console.log("🧭 Active drone:", activeDrone.id);
    if (dronePosition) console.log("📍 Drone position:", dronePosition);
  }, [activeDrone, dronePosition]);

  // Fallback to generic tracking if no order/drone
  useEffect(() => {
    if (!order || !activeDrone) {
      // Fallback to generic tracking if no order/drone
    const id = setInterval(async () => {
      const r = await api.get('/drone/status');
      setEta(r.data.etaMinutes);
      setProgress(r.data.progress);
    }, 1000);
    return () => clearInterval(id);
    }

    // Update tracking based on drone state
    const id = setInterval(async () => {
      try {
        // Fetch latest drone data
        const droneResponse = await axios.get(`${API_BASE_URL}/drones/${activeDrone.id}`);
        const latestDrone = droneResponse.data;

        // Calculate progress based on drone status and position
        // [Status Normalization] Normalize status to handle both English and Vietnamese
        const normalizedDroneStatus = normalizeOrderStatus(latestDrone.status);
        if (normalizedDroneStatus === 'Đang giao' || latestDrone.status === 'enroute') {
          // Estimate progress based on battery or use mock API
          const r = await api.get('/drone/status');
          setEta(Math.max(1, Math.ceil(r.data.etaMinutes)));
          setProgress(r.data.progress);
        } else if (latestDrone.status === 'returning') {
          setEta(0);
          setProgress(100);
          // Hide drone when returning
          setDronePosition(null);
        } else {
          // Drone is idle/charging
          setEta(0);
          setProgress(0);
        }
      } catch (error) {
        // Fallback to mock API on error
        const r = await api.get('/drone/status');
        setEta(r.data.etaMinutes);
        setProgress(r.data.progress);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [order, activeDrone]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drone Delivery Tracking</Text>
      {order && activeDrone && (
        <Text style={styles.subtitle}>Order: {order.id} | Drone: {activeDrone.code || activeDrone.id}</Text>
      )}
      <View style={styles.barBg}><View style={[styles.barFill, { width: `${Math.round(progress * 100)}%` }]} /></View>
      <Text>ETA: {eta} minutes</Text>
      <View 
        style={styles.map} 
        onLayout={(event) => {
          // Store map dimensions for accurate positioning
          const { width, height } = event.nativeEvent.layout;
          setMapDimensions({ width, height });
        }}
      >
        <Text style={{ color: theme.colors.secondaryText }}>
          {order && activeDrone 
            ? `Drone ${activeDrone.code || activeDrone.id} en-route for order ${order.id}...`
            : 'Map placeholder (drone en-route...)'}
        </Text>
        {/* [Bind simulateDronePath Fix] */}
        {/* Drone marker - positioned dynamically based on dronePosition */}
        {dronePosition && (
          <View style={[
            styles.droneMarker,
            {
              // Convert path coordinates (0-100 range) to pixel positions within map
              // Scale coordinates to fit map dimensions, ensuring marker stays within bounds
              left: Math.max(0, Math.min(mapDimensions.width - 24, (dronePosition.x / 100) * mapDimensions.width - 12)),
              top: Math.max(0, Math.min(mapDimensions.height - 24, (dronePosition.y / 100) * mapDimensions.height - 12))
            }
          ]}>
            <Text style={styles.droneIcon}>🛸</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: theme.colors.primary },
  subtitle: { fontSize: 12, color: theme.colors.secondaryText || '#666', marginBottom: 8 },
  barBg: { height: 12, backgroundColor: '#eee', borderRadius: 8, overflow: 'hidden', marginVertical: 12 },
  barFill: { height: '100%', backgroundColor: theme.colors.primary },
  map: { 
    marginTop: 12, 
    height: 300, 
    backgroundColor: '#f8f8f8', 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  droneMarker: {
    position: 'absolute',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 5, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
  droneIcon: {
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  }
});

