/**
 * Revenue Chart Component
 * Uses Recharts to display revenue analytics
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
  ResponsiveContainer
} from 'recharts';

export interface RevenueDataPoint {
  date: string;
  amount: number;
  orders?: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  type?: 'line' | 'bar';
  height?: number;
  showOrders?: boolean;
}

/**
 * Revenue Chart Component
 * Displays revenue over time
 */
const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  type = 'line',
  height = 300,
  showOrders = false
}) => {
  // Format data for chart
  const chartData = data.map(point => ({
    date: new Date(point.date).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' }),
    amount: point.amount / 1000, // Convert to thousands for readability
    orders: point.orders || 0
  }));

  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return `${(value * 1000).toLocaleString('vi-VN')}₫`;
  };

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Bar dataKey="amount" fill="#667eea" name="Revenue (₫)" />
          {showOrders && <Bar dataKey="orders" fill="#48bb78" name="Orders" />}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => formatCurrency(value)}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#667eea"
          strokeWidth={2}
          name="Revenue (₫)"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        {showOrders && (
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#48bb78"
            strokeWidth={2}
            name="Orders"
            dot={{ r: 4 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;

