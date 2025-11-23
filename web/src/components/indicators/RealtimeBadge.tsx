/**
 * Realtime Badge Component
 * Subtle visual indicator showing last update time
 * Minimal visual change - only adds badge next to existing title
 */

import React from 'react';

interface RealtimeBadgeProps {
  lastUpdate: string;
  className?: string;
}

export const RealtimeBadge: React.FC<RealtimeBadgeProps> = ({ lastUpdate, className }) => {
  const lastUpdateTime = new Date(lastUpdate).getTime();
  const now = Date.now();
  const diff = Math.round((now - lastUpdateTime) / 1000);
  
  // Determine color based on time difference
  let color: string;
  if (diff < 10) {
    color = '#22c55e'; // green - very recent
  } else if (diff < 30) {
    color = '#f59e0b'; // orange - recent
  } else {
    color = '#ef4444'; // red - stale
  }
  
  const formattedTime = new Date(lastUpdate).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  return (
    <span
      className={className}
      style={{
        fontSize: '0.75rem',
        color: color,
        marginLeft: 6,
        opacity: 0.85,
        fontWeight: 500
      }}
      title={`Last updated at ${formattedTime}`}
    >
      • Realtime {diff}s ago
    </span>
  );
};

export default RealtimeBadge;

