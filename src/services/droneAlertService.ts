/**
 * Drone Alert Service
 * Handles smart alerts for drone safety and efficiency
 */

import { DroneRealtimeData } from './droneRealtimeService';

export interface DroneAlert {
  droneId: string;
  droneCode: string;
  type: 'battery_low' | 'connection_lost' | 'stall' | 'maintenance_required';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

// Alert subscribers
let alertSubscribers: Set<(alerts: DroneAlert[]) => void> = new Set();

// Current active alerts
let activeAlerts: DroneAlert[] = [];

/**
 * Check for alerts based on drone data
 */
export const checkAlerts = (drones: DroneRealtimeData[]): DroneAlert[] => {
  const alerts: DroneAlert[] = [];

  drones.forEach(drone => {
    // Battery < 15% alert
    if (drone.battery < 15) {
      alerts.push({
        droneId: drone.id,
        droneCode: drone.code,
        type: 'battery_low',
        severity: drone.battery < 10 ? 'high' : 'medium',
        message: `Pin thấp (${drone.battery}%) - Cần sạc ngay`,
        timestamp: new Date().toISOString(),
        acknowledged: false
      });
    }

    // Connection lost for > 30 seconds
    if (drone.connectionStatus === 'lost_signal' || drone.connectionStatus === 'disconnected') {
      const lastUpdate = drone.lastUpdate ? new Date(drone.lastUpdate).getTime() : 0;
      const timeSinceUpdate = Date.now() - lastUpdate;
      
      if (timeSinceUpdate > 30000) { // > 30 seconds
        alerts.push({
          droneId: drone.id,
          droneCode: drone.code,
          type: 'connection_lost',
          severity: timeSinceUpdate > 60000 ? 'high' : 'medium',
          message: `Mất kết nối (${Math.floor(timeSinceUpdate / 1000)}s)`,
          timestamp: new Date().toISOString(),
          acknowledged: false
        });
      }
    }

    // Stall detection: Speed < 1 km/h while delivering
    if (drone.status === 'delivering' && drone.speed !== undefined && drone.speed < 1) {
      alerts.push({
        droneId: drone.id,
        droneCode: drone.code,
        type: 'stall',
        severity: 'medium',
        message: 'Có thể bị kẹt - Tốc độ quá thấp',
        timestamp: new Date().toISOString(),
        acknowledged: false
      });
    }

    // Maintenance required (overdue)
    if (drone.lastMaintenance) {
      const lastMaintenanceDate = new Date(drone.lastMaintenance);
      const daysSinceMaintenance = (Date.now() - lastMaintenanceDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceMaintenance > 30) {
        alerts.push({
          droneId: drone.id,
          droneCode: drone.code,
          type: 'maintenance_required',
          severity: daysSinceMaintenance > 60 ? 'high' : 'medium',
          message: `Cần bảo trì (${Math.floor(daysSinceMaintenance)} ngày)`,
          timestamp: new Date().toISOString(),
          acknowledged: false
        });
      }
    }
  });

  // Update active alerts (merge with existing, remove resolved)
  activeAlerts = alerts.map(newAlert => {
    // Check if alert already exists
    const existing = activeAlerts.find(a => 
      a.droneId === newAlert.droneId && a.type === newAlert.type
    );
    
    if (existing && existing.acknowledged) {
      // Keep acknowledged alerts but update severity if needed
      return { ...existing, severity: newAlert.severity };
    }
    
    return existing || newAlert;
  });

  return activeAlerts;
};

/**
 * Subscribe to alerts
 */
export const subscribeToAlerts = (
  callback: (alerts: DroneAlert[]) => void
): (() => void) => {
  alertSubscribers.add(callback);

  // Immediately call with current alerts
  if (activeAlerts.length > 0) {
    callback(activeAlerts);
  }

  return () => {
    alertSubscribers.delete(callback);
  };
};

/**
 * Notify subscribers of alerts
 */
const notifyAlertSubscribers = (alerts: DroneAlert[]) => {
  alertSubscribers.forEach(callback => {
    try {
      callback(alerts);
    } catch (error) {
      console.error('[droneAlertService] Error notifying alert subscriber:', error);
    }
  });
};

/**
 * Start alert monitoring
 */
export const startAlertMonitoring = (
  checkCallback: () => DroneRealtimeData[]
): (() => void) => {
  console.log('[droneAlertService] Starting alert monitoring');

  const checkAlertsInterval = setInterval(() => {
    try {
      const drones = checkCallback();
      const alerts = checkAlerts(drones);
      notifyAlertSubscribers(alerts);
    } catch (error) {
      console.error('[droneAlertService] Error in alert monitoring:', error);
    }
  }, 5000); // Check every 5 seconds

  return () => {
    clearInterval(checkAlertsInterval);
    console.log('[droneAlertService] Alert monitoring stopped');
  };
};

/**
 * Acknowledge an alert
 */
export const acknowledgeAlert = (droneId: string, alertType: DroneAlert['type']): void => {
  activeAlerts = activeAlerts.map(alert =>
    alert.droneId === droneId && alert.type === alertType
      ? { ...alert, acknowledged: true }
      : alert
  );
  notifyAlertSubscribers(activeAlerts);
};

/**
 * Get active alerts
 */
export const getActiveAlerts = (): DroneAlert[] => {
  return activeAlerts.filter(alert => !alert.acknowledged);
};

/**
 * Get alerts for a specific drone
 */
export const getDroneAlerts = (droneId: string): DroneAlert[] => {
  return activeAlerts.filter(alert => alert.droneId === droneId && !alert.acknowledged);
};

