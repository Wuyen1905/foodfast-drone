/**
 * Admin AI Assistant Service
 * Local logic-driven insights and recommendations
 * NO external AI APIs - all computation is local
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export interface AIInsight {
  type: 'maintenance' | 'performance' | 'business' | 'warning';
  text: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface AssistantContext {
  lastUpdate: string;
  recommendations: string[];
}

export interface InsightData {
  dronesNeedingMaintenance: any[];
  busiestRestaurant: string | null;
  slowestAvgDelivery: { day: string; minutes: number } | null;
  lowBatteryDrones: any[];
  highPerformanceRestaurants: string[];
}

export interface BatteryTrendPoint {
  droneId: string;
  battery: number;
}

// In-memory cache for performance (optimized for ≤16ms calculations)
let cache: {
  insights: AIInsight[] | null;
  timestamp: number;
  ttl: number;
  dataCache: {
    drones: any[] | null;
    analytics: any | null;
    restaurants: any[] | null;
    timestamp: number;
  };
} = {
  insights: null,
  timestamp: 0,
  ttl: 5000, // 5 second cache
  dataCache: {
    drones: null,
    analytics: null,
    restaurants: null,
    timestamp: 0
  }
};

/**
 * Calculate days since date
 */
const daysSince = (dateString: string): number => {
  const date = new Date(dateString);
  const now = Date.now();
  return Math.floor((now - date.getTime()) / (1000 * 60 * 60 * 24));
};

/**
 * Fetch assistant context from API
 */
export const fetchAssistantContext = async (): Promise<AssistantContext | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/assistantContext`);
    return response.data;
  } catch (error) {
    console.warn('[assistantService] Assistant context not available, using local logic only');
    return null;
  }
};

/**
 * Compute insights from data (local logic only)
 * Optimized for performance (≤16ms frame budget)
 */
export const computeInsights = async (): Promise<InsightData> => {
  const startTime = performance.now();
  
  try {
    // Check data cache first (1 second TTL for data)
    const now = Date.now();
    let drones: any[] = [];
    let analytics: any = {};
    let restaurants: any[] = [];
    
    if (cache.dataCache.drones && (now - cache.dataCache.timestamp) < 1000) {
      // Use cached data
      drones = cache.dataCache.drones;
      analytics = cache.dataCache.analytics || {};
      restaurants = cache.dataCache.restaurants || [];
    } else {
      // Fetch required data in parallel
      const [dronesResponse, analyticsResponse, restaurantsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/drones`).catch(() => ({ data: [] })),
        axios.get(`${API_BASE_URL}/analytics`).catch(() => ({ data: {} })),
        axios.get(`${API_BASE_URL}/restaurants`).catch(() => ({ data: [] }))
      ]);
      
      drones = Array.isArray(dronesResponse.data) ? dronesResponse.data : [];
      analytics = analyticsResponse.data || {};
      restaurants = Array.isArray(restaurantsResponse.data) ? restaurantsResponse.data : [];
      
      // Update cache
      cache.dataCache = {
        drones,
        analytics,
        restaurants,
        timestamp: now
      };
    }
    
    // Compute insights locally with improved logic
    const droneInsights = drones.map((drone: any) => {
      const battery = drone.battery !== undefined ? drone.battery : 100;
      const lastMaintenance = drone.lastMaintenance;
      const daysSinceMaintenance = lastMaintenance ? daysSince(lastMaintenance) : 0;
      const droneCode = drone.code || drone.droneCode || drone.id || 'Unknown';
      
      if (battery < 20) {
        return {
          type: 'danger',
          text: `Drone ${droneCode} battery critical (${battery}%) - urgent recharge needed`,
          priority: 'high' as const,
          drone
        };
      } else if (battery < 30) {
        return {
          type: 'warning',
          text: `Drone ${droneCode} battery low (${battery}%)`,
          priority: 'medium' as const,
          drone
        };
      } else if (daysSinceMaintenance > 30) {
        return {
          type: 'warning',
          text: `Drone ${droneCode} overdue maintenance (last service ${daysSinceMaintenance} days ago)`,
          priority: 'medium' as const,
          drone
        };
      } else {
        return {
          type: 'success',
          text: `Drone ${droneCode} operating normally (battery ${battery}%)`,
          priority: 'low' as const,
          drone
        };
      }
    });
    
    const dronesNeedingMaintenance = drones.filter((drone: any) => {
      const battery = drone.battery || 100;
      const lastMaintenance = drone.lastMaintenance;
      const daysSinceMaintenance = lastMaintenance ? daysSince(lastMaintenance) : 0;
      
      return battery < 30 || daysSinceMaintenance > 30;
    });
    
    const lowBatteryDrones = drones.filter((drone: any) => {
      const battery = drone.battery || 100;
      return battery < 20;
    });
    
    // Find busiest restaurant from revenue data
    let busiestRestaurant: string | null = null;
    if (analytics.revenue && Array.isArray(analytics.revenue)) {
      // Group revenue by restaurant (simplified - would need restaurant mapping)
      const restaurantRevenue: Record<string, number> = {};
      restaurants.forEach((r: any) => {
        restaurantRevenue[r.id] = r.revenue || 0;
      });
      
      const sorted = Object.entries(restaurantRevenue).sort((a, b) => b[1] - a[1]);
      if (sorted.length > 0) {
        const restaurant = restaurants.find((r: any) => r.id === sorted[0][0]);
        busiestRestaurant = restaurant?.name || null;
      }
    }
    
    // Find slowest average delivery time
    let slowestAvgDelivery: { day: string; minutes: number } | null = null;
    if (analytics.averageDeliveryTime && Array.isArray(analytics.averageDeliveryTime)) {
      const sorted = [...analytics.averageDeliveryTime].sort((a, b) => b.minutes - a.minutes);
      if (sorted.length > 0) {
        slowestAvgDelivery = sorted[0];
      }
    }
    
    // Find high performance restaurants (rating > 4.5)
    const highPerformanceRestaurants = restaurants
      .filter((r: any) => (r.rating || 0) > 4.5)
      .map((r: any) => r.name);
    
    // Get revenue insights from analytics.branches if available
    const revenueInsights: any[] = [];
    if (analytics.branches && Array.isArray(analytics.branches)) {
      analytics.branches.forEach((branch: any) => {
        if (branch.growth !== undefined) {
          revenueInsights.push({
            type: branch.growth > 10 ? 'info' : branch.growth > 0 ? 'success' : 'warning',
            text: `${branch.name} revenue ${branch.growth > 0 ? '↑' : '↓'}${Math.abs(branch.growth)}% this week`,
            priority: branch.growth > 10 ? 'low' : branch.growth < -5 ? 'medium' : 'low',
            branch
          });
        }
      });
    }
    
    return {
      dronesNeedingMaintenance,
      busiestRestaurant,
      slowestAvgDelivery,
      lowBatteryDrones,
      highPerformanceRestaurants,
      droneInsights,
      revenueInsights
    };
  } catch (error) {
    console.error('[assistantService] Error computing insights:', error);
    return {
      dronesNeedingMaintenance: [],
      busiestRestaurant: null,
      slowestAvgDelivery: null,
      lowBatteryDrones: [],
      highPerformanceRestaurants: []
    };
  } finally {
    // Performance monitoring
    const elapsed = performance.now() - startTime;
    if (elapsed > 16) {
      console.warn(`[assistantService] computeInsights took ${elapsed.toFixed(2)}ms (target: ≤16ms)`);
    }
  }
};

/**
 * Generate AI insights (local logic only)
 * Optimized for performance with caching
 */
export const getAIInsights = async (): Promise<AIInsight[]> => {
  const startTime = performance.now();
  
  // Check cache first
  const now = Date.now();
  if (cache.insights && (now - cache.timestamp) < cache.ttl) {
    return cache.insights;
  }
  
  try {
    // Fetch assistant context and compute insights in parallel
    const [context, insightData] = await Promise.all([
      fetchAssistantContext(),
      computeInsights()
    ]);
    
    const insights: AIInsight[] = [];
    
    // Add individual drone insights (improved logic)
    if (insightData.droneInsights) {
      // Add critical and warning insights first
      const criticalInsights = insightData.droneInsights.filter((d: any) => 
        d.type === 'danger' || (d.type === 'warning' && d.priority === 'medium')
      );
      criticalInsights.forEach((insight: any) => {
        insights.push({
          type: insight.type,
          text: insight.text,
          priority: insight.priority,
          timestamp: new Date().toISOString()
        });
      });
      
      // Add a few success insights (limit to 2-3)
      const successInsights = insightData.droneInsights.filter((d: any) => d.type === 'success').slice(0, 2);
      successInsights.forEach((insight: any) => {
        insights.push({
          type: insight.type,
          text: insight.text,
          priority: insight.priority,
          timestamp: new Date().toISOString()
        });
      });
    } else {
      // Fallback to original logic
      if (insightData.dronesNeedingMaintenance.length > 0) {
        insights.push({
          type: 'maintenance',
          text: `${insightData.dronesNeedingMaintenance.length} drone(s) need maintenance soon (low battery or overdue maintenance).`,
          priority: insightData.dronesNeedingMaintenance.length > 3 ? 'high' : 'medium',
          timestamp: new Date().toISOString()
        });
      }
      
      if (insightData.lowBatteryDrones.length > 0) {
        insights.push({
          type: 'maintenance',
          text: `${insightData.lowBatteryDrones.length} drone(s) have battery below 20% - urgent attention required.`,
          priority: 'high',
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Performance insights
    if (insightData.slowestAvgDelivery) {
      insights.push({
        type: 'performance',
        text: `${insightData.slowestAvgDelivery.day} has the slowest average delivery time (${insightData.slowestAvgDelivery.minutes.toFixed(1)} minutes).`,
        priority: insightData.slowestAvgDelivery.minutes > 10 ? 'high' : 'medium',
        timestamp: new Date().toISOString()
      });
    }
    
    // Revenue insights from analytics.branches
    if (insightData.revenueInsights && insightData.revenueInsights.length > 0) {
      insightData.revenueInsights.forEach((revenueInsight: any) => {
        insights.push({
          type: revenueInsight.type,
          text: revenueInsight.text,
          priority: revenueInsight.priority,
          timestamp: new Date().toISOString()
        });
      });
    }
    
    // Business insights
    if (insightData.busiestRestaurant) {
      insights.push({
        type: 'business',
        text: `${insightData.busiestRestaurant} is the most active restaurant today.`,
        priority: 'low',
        timestamp: new Date().toISOString()
      });
    }
    
    if (insightData.highPerformanceRestaurants.length > 0) {
      insights.push({
        type: 'business',
        text: `${insightData.highPerformanceRestaurants.length} restaurant(s) have excellent ratings (>4.5).`,
        priority: 'low',
        timestamp: new Date().toISOString()
      });
    }
    
    // Add recommendations from API context
    if (context && context.recommendations) {
      context.recommendations.forEach((rec: string) => {
        let type: AIInsight['type'] = 'business';
        let priority: AIInsight['priority'] = 'medium';
        
        // Determine type and priority from text
        if (rec.toLowerCase().includes('battery') || rec.toLowerCase().includes('maintenance')) {
          type = 'maintenance';
          priority = rec.toLowerCase().includes('below') || rec.toLowerCase().includes('urgent') ? 'high' : 'medium';
        } else if (rec.toLowerCase().includes('delivery') || rec.toLowerCase().includes('time')) {
          type = 'performance';
          priority = rec.toLowerCase().includes('slow') || rec.toLowerCase().includes('×') ? 'high' : 'medium';
        }
        
        insights.push({
          type,
          text: rec,
          priority,
          timestamp: context.lastUpdate || new Date().toISOString()
        });
      });
    }
    
    // Sort by priority (high first)
    insights.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    
    // Update cache
    cache.insights = insights;
    cache.timestamp = now;
    
    // Performance monitoring
    const elapsed = performance.now() - startTime;
    if (elapsed > 16) {
      console.warn(`[assistantService] getAIInsights took ${elapsed.toFixed(2)}ms (target: ≤16ms)`);
    } else {
      console.log(`[assistantService] Generated ${insights.length} insights in ${elapsed.toFixed(2)}ms`);
    }
    
    return insights;
  } catch (error) {
    console.error('[assistantService] Error getting AI insights:', error);
    return [];
  }
};

/**
 * Get battery trend data for chart
 */
export const getBatteryTrend = async (): Promise<BatteryTrendPoint[]> => {
  try {
    // Try to fetch from API first
    try {
      const response = await axios.get(`${API_BASE_URL}/batteryTrend`);
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
    } catch (apiError) {
      // Fallback: calculate from drones data
    }
    
    // Fallback: fetch drones and extract battery data
    const dronesResponse = await axios.get(`${API_BASE_URL}/drones`).catch(() => ({ data: [] }));
    const drones = Array.isArray(dronesResponse.data) ? dronesResponse.data : [];
    
    // Get latest 3 drones with battery data
    return drones
      .filter((d: any) => d.battery !== undefined)
      .slice(0, 3)
      .map((d: any) => ({
        droneId: d.code || d.droneCode || d.id || 'Unknown',
        battery: Math.max(0, Math.min(100, d.battery || 0))
      }));
  } catch (error) {
    console.error('[assistantService] Error getting battery trend:', error);
    return [];
  }
};

/**
 * Clear cache (for testing)
 */
export const clearCache = (): void => {
  cache.insights = null;
  cache.timestamp = 0;
};

