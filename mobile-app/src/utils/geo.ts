/**
 * Geographic utility functions for drone simulation (Mobile)
 * Provides distance calculation, interpolation, and ETA estimation
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param a First coordinate
 * @param b Second coordinate
 * @returns Distance in meters
 */
export function haversineMeters(a: Coordinates, b: Coordinates): number {
  const R = 6371000; // Earth radius in meters
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const deltaLat = (b.lat - a.lat) * Math.PI / 180;
  const deltaLng = (b.lng - a.lng) * Math.PI / 180;

  const sinDeltaLat = Math.sin(deltaLat / 2);
  const sinDeltaLng = Math.sin(deltaLng / 2);

  const a_val = sinDeltaLat * sinDeltaLat +
    Math.cos(lat1) * Math.cos(lat2) *
    sinDeltaLng * sinDeltaLng;

  const c = 2 * Math.atan2(Math.sqrt(a_val), Math.sqrt(1 - a_val));

  return R * c;
}

/**
 * Ease-in-out cubic easing function for smooth interpolation
 * @param t Progress value between 0 and 1
 * @returns Eased value between 0 and 1
 */
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Interpolate between two coordinates with easing
 * @param a Start coordinate
 * @param b End coordinate
 * @param t Progress value between 0 and 1 (will be eased)
 * @returns Interpolated coordinate
 */
export function interpolate(a: Coordinates, b: Coordinates, t: number): Coordinates {
  const easedT = easeInOutCubic(Math.max(0, Math.min(1, t)));
  return {
    lat: a.lat + (b.lat - a.lat) * easedT,
    lng: a.lng + (b.lng - a.lng) * easedT,
  };
}

/**
 * Estimate time of arrival in seconds based on distance and speed
 * @param distanceMeters Distance in meters
 * @param speedMps Speed in meters per second
 * @returns Estimated time in seconds
 */
export function estimateEtaSeconds(distanceMeters: number, speedMps: number): number {
  if (speedMps <= 0) return Infinity;
  return Math.max(0, Math.ceil(distanceMeters / speedMps));
}

