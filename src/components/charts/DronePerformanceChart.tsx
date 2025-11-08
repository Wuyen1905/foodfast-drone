/**
 * Drone Performance Chart Component
 * Uses Recharts to display drone performance metrics
 * Logic-only component - uses existing container components
 */

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export interface DeliveryTimeDataPoint {
  day: string;
  minutes: number;
}

export interface DronePerformanceData {
  deliveryTime?: DeliveryTimeDataPoint[];
  batteryLevels?: { droneCode: string; battery: number }[];
  healthScores?: { droneCode: string; score: number }[];
  missionsCompleted?: { droneCode: string; missions: number }[];
}

interface DronePerformanceChartProps {
  data: DronePerformanceData;
  type?: 'deliveryTime' | 'battery' | 'health' | 'missions';
  height?: number;
}

/**
 * Drone Performance Chart Component
 * Displays various drone performance metrics
 */
const DronePerformanceChart: React.FC<DronePerformanceChartProps> = ({
  data,
  type = 'deliveryTime',
  height = 300
}) => {
  // Delivery Time Chart
  if (type === 'deliveryTime' && data.deliveryTime) {
    const chartData = data.deliveryTime.map(point => ({
      day: point.day,
      minutes: point.minutes
    }));

    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            formatter={(value: number) => `${value.toFixed(1)} minutes`}
            labelFormatter={(label) => `Day: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#48bb78"
            strokeWidth={2}
            name="Avg Delivery Time"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // Battery Levels Chart
  if (type === 'battery' && data.batteryLevels) {
    const chartData = data.batteryLevels.map(point => ({
      drone: point.droneCode,
      battery: point.battery
    }));

    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="drone" />
          <YAxis label={{ value: 'Battery %', angle: -90, position: 'insideLeft' }} domain={[0, 100]} />
          <Tooltip
            formatter={(value: number) => `${value}%`}
            labelFormatter={(label) => `Drone: ${label}`}
          />
          <Legend />
          <Bar dataKey="battery" fill="#ffc107" name="Battery Level" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Health Scores Chart
  if (type === 'health' && data.healthScores) {
    const chartData = data.healthScores.map(point => ({
      drone: point.droneCode,
      score: point.score
    }));

    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="drone" />
          <YAxis label={{ value: 'Health Score', angle: -90, position: 'insideLeft' }} domain={[0, 100]} />
          <Tooltip
            formatter={(value: number) => `${value}/100`}
            labelFormatter={(label) => `Drone: ${label}`}
          />
          <Legend />
          <Bar dataKey="score" fill="#28a745" name="Health Score" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Missions Completed Chart
  if (type === 'missions' && data.missionsCompleted) {
    const chartData = data.missionsCompleted.map(point => ({
      drone: point.droneCode,
      missions: point.missions
    }));

    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="drone" />
          <YAxis label={{ value: 'Missions', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            formatter={(value: number) => `${value} missions`}
            labelFormatter={(label) => `Drone: ${label}`}
          />
          <Legend />
          <Bar dataKey="missions" fill="#17a2b8" name="Missions Completed" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Default: No data message
  return (
    <div style={{ 
      height, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: '#999',
      fontSize: '14px'
    }}>
      No data available for this chart type
    </div>
  );
};

export default DronePerformanceChart;

