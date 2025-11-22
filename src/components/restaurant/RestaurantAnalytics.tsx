import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { formatVND } from '../../utils/currency';

interface AnalyticsProps {
  theme?: {
    primary?: string;
    secondary?: string;
  };
  restaurant?: "SweetDreams" | "Aloha";
}

const AnalyticsContainer = styled.div`
  margin-top: 24px;
`;

const SectionTitle = styled.h2<{ $color?: string }>`
  color: ${props => props.$color || '#FF6600'};
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const KPICard = styled(motion.div)<{ $gradient: string }>`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$gradient};
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const KPIHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const KPIIcon = styled.div<{ $bg: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const KPILabel = styled.div`
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const KPIValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 8px;
`;

const KPIChange = styled.div<{ $positive: boolean }>`
  font-size: 14px;
  color: ${props => props.$positive ? '#28a745' : '#dc3545'};
  font-weight: 600;
  
  &::before {
    content: '${props => props.$positive ? '↗' : '↘'}';
    margin-right: 4px;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const ChartTitle = styled.h3`
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
`;

const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 250px;
  gap: 12px;
  padding: 16px 0;
`;

const BarColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Bar = styled(motion.div)<{ $height: number; $color: string }>`
  width: 100%;
  height: ${props => props.$height}%;
  background: ${props => props.$color};
  border-radius: 8px 8px 0 0;
  position: relative;
  cursor: pointer;
  transition: filter 0.2s ease;
  
  &:hover {
    filter: brightness(1.1);
  }
`;

const BarValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const BarLabel = styled.div`
  font-size: 12px;
  color: #666;
  text-align: center;
`;

const PieChart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PieCircle = styled.svg`
  width: 200px;
  height: 200px;
`;

const PieLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${props => props.$color};
`;

const LegendText = styled.div`
  flex: 1;
`;

const LegendLabel = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const LegendValue = styled.div`
  font-size: 12px;
  color: #666;
`;

const TopProductsCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e9ecef;
    transform: translateX(4px);
  }
`;

const ProductRank = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const ProductSales = styled.div`
  font-size: 14px;
  color: #666;
`;

const ProductRevenue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #FF6600;
`;

const RestaurantAnalytics: React.FC<AnalyticsProps> = ({ theme, restaurant = "SweetDreams" }) => {
  // TODO: Backend integration in Phase 2 - removed all hardcoded mock data
  const [kpiData, setKpiData] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<Array<{ label: string; value: number }>>([]);
  const [orderStatusData, setOrderStatusData] = useState<Array<{ label: string; value: number; color: string }>>([]);
  const [topProducts, setTopProducts] = useState<Array<{ name: string; sales: number; revenue: number }>>([]);

  // Load analytics from backend API
  const loadAnalytics = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
      
      // Normalize restaurant ID
      let restaurantIdParam = restaurant;
      if (restaurant.toLowerCase() === 'sweetdreams') {
        restaurantIdParam = 'rest_2';
      } else if (restaurant.toLowerCase() === 'aloha') {
        restaurantIdParam = 'restaurant_2';
      }
      
      // Fetch analytics and overview data
      const [analyticsResponse, overviewResponse, ordersResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/analytics/restaurant/${restaurantIdParam}?period=day`).catch(() => null),
        fetch(`${API_BASE_URL}/analytics/restaurant/${restaurantIdParam}/overview`).catch(() => null),
        fetch(`${API_BASE_URL}/orders?restaurant=${restaurantIdParam}`).catch(() => null)
      ]);
      
      // Process analytics data
      if (analyticsResponse?.ok) {
        const analytics = await analyticsResponse.json();
        
        // Set KPI data
        setKpiData([
          { label: 'Doanh thu', value: analytics.revenue || 0 },
          { label: 'Đơn hàng', value: analytics.orders || 0 },
          { label: 'Giá trị TB', value: analytics.avgOrderValue || 0 },
          { label: 'Thời gian giao', value: analytics.deliveryTime || 18 }
        ]);
      }
      
      // Process overview data for revenue chart and top products
      if (overviewResponse?.ok) {
        const overview = await overviewResponse.json();
        
        // Set revenue data (simplified - could be enhanced with historical data)
        setRevenueData([
          { label: 'Hôm nay', value: overview.revenue || 0 }
        ]);
        
        // Set top products
        setTopProducts(overview.topItems || []);
      }
      
      // Process orders for order status data
      if (ordersResponse?.ok) {
        const orders = await ordersResponse.json();
        
        // Count orders by status
        const statusCounts: Record<string, number> = {};
        orders.forEach((o: any) => {
          const status = o.status || 'Pending';
          statusCounts[status] = (statusCounts[status] || 0) + 1;
        });
        
        // Map to order status data format
        const statusColors: Record<string, string> = {
          'Pending': '#ffc107',
          'Confirmed': '#17a2b8',
          'Preparing': '#007bff',
          'Delivering': '#28a745',
          'Delivered': '#6c757d',
          'Cancelled': '#dc3545'
        };
        
        setOrderStatusData(
          Object.entries(statusCounts).map(([label, value]) => ({
            label,
            value,
            color: statusColors[label] || '#6c757d'
          }))
        );
      }
    } catch (error) {
      console.error('[RestaurantAnalytics] Error loading analytics:', error);
    }
  };

  // Load analytics data on mount
  useEffect(() => {
    loadAnalytics();
  }, [restaurant]);

  // Calculate max revenue safely (handle empty array)
  const maxRevenue = revenueData.length > 0 ? Math.max(...revenueData.map(d => d.value)) : 1;
  
  // Calculate total orders safely (handle empty array)
  const totalOrders = orderStatusData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

  return (
    <AnalyticsContainer>
      <SectionTitle $color={theme?.primary}>
        📊 Thống kê và phân tích thông minh
      </SectionTitle>

      {/* KPI Cards */}
      <KPIGrid>
        {kpiData.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
            Không có dữ liệu KPI
          </div>
        ) : (
          kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            $gradient={kpi.gradient}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <KPIHeader>
              <div>
                <KPILabel>{kpi.label}</KPILabel>
                <KPIValue>{kpi.value}</KPIValue>
                <KPIChange $positive={kpi.positive}>{kpi.change}</KPIChange>
              </div>
              <KPIIcon $bg={kpi.bg}>{kpi.icon}</KPIIcon>
            </KPIHeader>
          </KPICard>
          ))
        )}
      </KPIGrid>

      {/* Charts */}
      <ChartsGrid>
        {/* Revenue Trend Chart */}
        <ChartCard>
          <ChartTitle>📈 Xu hướng doanh thu tuần</ChartTitle>
          {revenueData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Không có dữ liệu doanh thu
            </div>
          ) : (
            <BarChart>
              {revenueData.map((data, index) => (
              <BarColumn key={index}>
                <BarValue>{formatVND(data.value)}</BarValue>
                <Bar
                  $height={(data.value / maxRevenue) * 100}
                  $color={`linear-gradient(180deg, ${theme?.primary || '#FF6600'}, ${theme?.secondary || '#e55a00'})`}
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.value / maxRevenue) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                />
                <BarLabel>{data.label}</BarLabel>
              </BarColumn>
              ))}
            </BarChart>
          )}
        </ChartCard>

        {/* Orders by Status Pie Chart */}
        <ChartCard>
          <ChartTitle>🎯 Đơn hàng theo trạng thái</ChartTitle>
          {orderStatusData.length === 0 || totalOrders === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Không có dữ liệu đơn hàng
            </div>
          ) : (
            <PieChart>
              <PieCircle viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#e1e5e9"
                  strokeWidth="40"
                />
                {orderStatusData.map((item, index) => {
                const percentage = (item.value / totalOrders) * 100;
                const angle = (percentage / 100) * 360;
                const startAngle = currentAngle;
                currentAngle += angle;

                const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = 100 + 80 * Math.cos((startAngle + angle - 90) * Math.PI / 180);
                const y2 = 100 + 80 * Math.sin((startAngle + angle - 90) * Math.PI / 180);
                const largeArc = angle > 180 ? 1 : 0;

                return (
                  <motion.path
                    key={index}
                    d={`M 100,100 L ${x1},${y1} A 80,80 0 ${largeArc} 1 ${x2},${y2} Z`}
                    fill={item.color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  />
                );
              })}
              <circle cx="100" cy="100" r="50" fill="white" />
              <text
                x="100"
                y="95"
                textAnchor="middle"
                fontSize="24"
                fontWeight="700"
                fill="#333"
              >
                {totalOrders}
              </text>
              <text
                x="100"
                y="115"
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                Đơn hàng
              </text>
            </PieCircle>

            <PieLegend>
              {orderStatusData.map((item, index) => (
                <LegendItem key={index}>
                  <LegendColor $color={item.color} />
                  <LegendText>
                    <LegendLabel>{item.label}</LegendLabel>
                    <LegendValue>
                      {item.value} đơn ({((item.value / totalOrders) * 100).toFixed(0)}%)
                    </LegendValue>
                  </LegendText>
                </LegendItem>
              ))}
            </PieLegend>
          </PieChart>
          )}
        </ChartCard>
      </ChartsGrid>

      {/* Top Products */}
      <TopProductsCard>
        <ChartTitle>🏆 Top 3 món ăn phổ biến</ChartTitle>
        {topProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Không có dữ liệu sản phẩm
          </div>
        ) : (
          <ProductList>
            {topProducts.map((product, index) => (
            <ProductItem key={index}>
              <ProductRank $color={rankColors[index]}>
                {index + 1}
              </ProductRank>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductSales>{product.sales} đơn hàng</ProductSales>
              </ProductInfo>
              <ProductRevenue>{formatVND(product.revenue)}</ProductRevenue>
            </ProductItem>
            ))}
          </ProductList>
        )}
      </TopProductsCard>
    </AnalyticsContainer>
  );
};

export default RestaurantAnalytics;

