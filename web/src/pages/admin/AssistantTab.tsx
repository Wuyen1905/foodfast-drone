/**
 * Admin AI Assistant Tab
 * Logic-driven insights and recommendations
 * NO external AI APIs - all computation is local
 */

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIInsights, type AIInsight, getBatteryTrend } from '@/services/assistantService';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Container = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const Header = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const InsightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InsightCard = styled(motion.div)<{ $type: string; $priority: string }>`
  border-left: 4px solid ${props => {
    if (props.$type === 'maintenance' || props.$type === 'warning') return '#f59e0b';
    if (props.$type === 'performance' || props.$type === 'info') return '#3b82f6';
    if (props.$type === 'business' || props.$type === 'success') return '#22c55e';
    if (props.$type === 'danger') return '#ef4444';
    return '#6c757d';
  }};
  padding: 16px;
  background: ${props => {
    if (props.$priority === 'high' || props.$type === 'danger') return '#fef2f2';
    if (props.$priority === 'medium' || props.$type === 'warning') return '#fffbeb';
    if (props.$type === 'success') return '#f0fdf4';
    if (props.$type === 'info') return '#eff6ff';
    return '#ffffff';
  }};
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const InsightHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const InsightType = styled.strong<{ $type: string }>`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${props => {
    if (props.$type === 'maintenance' || props.$type === 'warning') return '#f59e0b';
    if (props.$type === 'performance' || props.$type === 'info') return '#3b82f6';
    if (props.$type === 'business' || props.$type === 'success') return '#22c55e';
    if (props.$type === 'danger') return '#ef4444';
    return '#6c757d';
  }};
`;

const PriorityBadge = styled.span<{ $priority: string }>`
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${props => {
    if (props.$priority === 'high') return '#ef4444';
    if (props.$priority === 'medium') return '#f59e0b';
    return '#22c55e';
  }};
  color: white;
  font-weight: 600;
  text-transform: uppercase;
`;

const InsightText = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
  line-height: 1.6;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyText = styled.p`
  font-size: 16px;
  margin: 0;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

// Shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const ShimmerCard = styled.div`
  height: 80px;
  background: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #e0e0e0 40px,
    #f0f0f0 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const ChartSection = styled.div`
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px solid #f0f0f0;
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChartContainer = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  min-height: 180px;
`;

const NoDataText = styled.p`
  text-align: center;
  color: #999;
  padding: 40px 20px;
  margin: 0;
`;

const InsightIcon = styled.span`
  font-size: 20px;
  margin-right: 8px;
`;

const InsightCardContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const TimestampText = styled.span`
  font-size: 12px;
  color: #666;
  font-weight: 500;
`;

const AssistantTab: React.FC = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toISOString());
  const [batteryTrend, setBatteryTrend] = useState<any[]>([]);

  const loadInsights = async () => {
    try {
      setLoading(true);
      const [aiInsights, batteryData] = await Promise.all([
        getAIInsights(),
        getBatteryTrend()
      ]);
      setInsights(aiInsights);
      setBatteryTrend(batteryData);
      setLastUpdate(new Date().toISOString());
    } catch (error) {
      console.error('[AssistantTab] Error loading insights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load initially
    loadInsights();

    // Refresh every 30 seconds
    const interval = setInterval(loadInsights, 30000);

    return () => clearInterval(interval);
  }, []);

  // Get icon for insight type
  const getInsightIcon = (type: string): string => {
    switch (type) {
      case 'maintenance':
      case 'warning':
        return '🔧';
      case 'danger':
        return '⚠️';
      case 'performance':
      case 'info':
        return '📊';
      case 'business':
      case 'success':
        return '✅';
      default:
        return 'ℹ️';
    }
  };

  // Show shimmer loading while fetching
  const showShimmer = loading && insights.length === 0;

  // Don't show empty state if we have data or are loading
  if (!showShimmer && insights.length === 0 && !loading) {
    return (
      <Container>
        <Header>
          <Title>🤖 AI Assistant</Title>
          <Subtitle>All systems operating normally. No action items at this time.</Subtitle>
        </Header>
        <EmptyState>
          <EmptyIcon>✨</EmptyIcon>
          <EmptyText>No insights available at this time.</EmptyText>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>🤖 AI Assistant</Title>
        <Subtitle>
          {loading ? (
            <>Analyzing system data and providing insights...</>
          ) : (
            <>
              Last updated at{' '}
              <TimestampText>{new Date(lastUpdate).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}</TimestampText>
            </>
          )}
        </Subtitle>
      </Header>

      <AnimatePresence mode="wait">
        {showShimmer ? (
          <InsightsList key="loading">
            {[1, 2, 3].map((i) => (
              <ShimmerCard key={i} />
            ))}
          </InsightsList>
        ) : insights.length === 0 ? (
          <EmptyState key="empty">
            <EmptyIcon>✨</EmptyIcon>
            <EmptyText>No insights available at this time.</EmptyText>
          </EmptyState>
        ) : (
          <InsightsList key="insights">
            {insights.map((insight, index) => (
              <InsightCard
                key={index}
                $type={insight.type}
                $priority={insight.priority}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <InsightCardContent>
                  <InsightIcon>{getInsightIcon(insight.type)}</InsightIcon>
                  <div style={{ flex: 1 }}>
                    <InsightHeader>
                      <InsightType $type={insight.type}>
                        {insight.type === 'warning' ? 'Maintenance' :
                         insight.type === 'success' ? 'Status' :
                         insight.type === 'info' ? 'Performance' :
                         insight.type === 'danger' ? 'Critical' :
                         insight.type}
                      </InsightType>
                      <PriorityBadge $priority={insight.priority}>{insight.priority}</PriorityBadge>
                    </InsightHeader>
                    <InsightText>{insight.text}</InsightText>
                  </div>
                </InsightCardContent>
              </InsightCard>
            ))}
          </InsightsList>
        )}
      </AnimatePresence>

      {!showShimmer && (
        <ChartSection>
          <ChartTitle>📈 Drone Battery Health Trend</ChartTitle>
          <ChartContainer>
            {batteryTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={batteryTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="droneId" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Battery %', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="battery" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <NoDataText>No battery trend data available.</NoDataText>
            )}
          </ChartContainer>
        </ChartSection>
      )}
    </Container>
  );
};

export default AssistantTab;

