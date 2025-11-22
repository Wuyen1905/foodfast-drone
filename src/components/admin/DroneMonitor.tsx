/**
 * Drone Monitor Component
 * Read-only monitoring of all drones grouped by restaurant ownership
 * Enhanced with real-time tracking, alerts, and emergency controls
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminDrone, AdminRestaurant } from '../../types/admin';
import { flagDrone, clearDroneFlag, reassignDrone, getAllRestaurants } from '../../services/adminService';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  fetchRealtimeDroneData, 
  subscribeToRealtimeUpdates, 
  startRealtimePolling, 
  stopRealtimePolling,
  getLastUpdateTimestamp,
  type DroneRealtimeData 
} from '../../services/droneRealtimeService';
import { 
  subscribeToAlerts, 
  startAlertMonitoring, 
  getDroneAlerts,
  type DroneAlert 
} from '../../services/droneAlertService';
import { recallDrone } from '../../services/droneEmergencyService';
import DroneSummaryBar from './DroneSummaryBar';
import DroneDetailModal from './DroneDetailModal';
import { getRestaurantById } from '../../services/adminService';
import toast from 'react-hot-toast';
// TODO: Backend integration in Phase 2 - removed mockDrones import

// Fetch drones from backend API
const fetchDrones = async (): Promise<any[]> => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
    const response = await fetch(`${API_BASE_URL}/drones`);
    if (!response.ok) {
      throw new Error(`Failed to fetch drones: ${response.status}`);
    }
    const drones = await response.json();
    return Array.isArray(drones) ? drones : [];
  } catch (error) {
    console.error('[DroneMonitor] Error fetching drones:', error);
    return [];
  }
};

const Container = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${props => props.$active ? '#667eea' : '#e1e5e9'};
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: ${props => props.$active ? '#5568d3' : '#f8f9fa'};
  }
`;

const RestaurantSection = styled.div`
  margin-bottom: 30px;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  overflow: hidden;
`;

const RestaurantHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RestaurantName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DroneCount = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const DroneGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 25px;
  background: #f8f9fa;
`;

const DroneCard = styled(motion.div)<{ $flagged?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid ${props => props.$flagged ? '#ff6b6b' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const DroneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const DroneId = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch (props.$status) {
      case 'Idle': return '#d4edda';
      case 'Delivering': return '#cce5ff';
      case 'Charging': return '#fff3cd';
      case 'Maintenance': return '#f8d7da';
      default: return '#e1e5e9';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'Idle': return '#155724';
      case 'Delivering': return '#004085';
      case 'Charging': return '#856404';
      case 'Maintenance': return '#721c24';
      default: return '#666';
    }
  }};
`;

const DroneInfo = styled.div`
  margin-bottom: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
`;

const InfoLabel = styled.span`
  color: #666;
`;

const InfoValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const BatteryBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e1e5e9;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;
`;

const BatteryFill = styled.div<{ $level: number }>`
  height: 100%;
  width: ${props => props.$level}%;
  background: ${props => {
    if (props.$level < 20) return '#dc3545';
    if (props.$level < 50) return '#ffc107';
    return '#28a745';
  }};
  transition: all 0.3s ease;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
`;

const ActionButton = styled.button<{ $variant?: 'flag' | 'clear' }>`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$variant === 'clear' ? '#28a745' : '#ff6b6b'};
  color: white;
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FlagIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
`;

const IssueDescription = styled.div`
  background: #fff3cd;
  color: #856404;
  padding: 10px;
  border-radius: 6px;
  font-size: 12px;
  margin-top: 10px;
  border-left: 3px solid #ffc107;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #333;
`;

const ModalText = styled.p`
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.6;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$primary ? '#667eea' : '#e1e5e9'};
  color: ${props => props.$primary ? 'white' : '#666'};
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
`;

const AlertIndicator = styled.div<{ $severity: string }>`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => {
    switch (props.$severity) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  }};
  border: 2px solid white;
  box-shadow: 0 0 0 2px ${props => {
    switch (props.$severity) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  }};
  animation: ${props => props.$severity === 'high' ? 'pulse 2s infinite' : 'none'};
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const RealtimeIndicator = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ConnectionStatus = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => {
      switch (props.$status) {
        case 'online': return '#28a745';
        case 'lost_signal': return '#ffc107';
        case 'disconnected': return '#dc3545';
        default: return '#6c757d';
      }
    }};
  }
`;

const EmergencyButton = styled(ActionButton)`
  background: #dc3545 !important;
  flex: 1;
`;

interface DroneMonitorProps {
  drones: AdminDrone[];
  onUpdate: () => void;
}

const DroneMonitor: React.FC<DroneMonitorProps> = ({ drones, onUpdate }) => {
  const { admin } = useAdminAuth();
  const [statusFilter, setStatusFilter] = useState<'All' | 'Idle' | 'Delivering' | 'Charging' | 'Maintenance'>('All');
  const [modalData, setModalData] = useState<{ drone: AdminDrone; action: 'flag' | 'clear' | 'reassign' | 'recall' | 'detail' } | null>(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState<AdminRestaurant[]>([]);
  
  // Load restaurants on mount
  useEffect(() => {
    getAllRestaurants().then(setRestaurants).catch(console.error);
  }, []);
  
  // Enhanced real-time data
  const [realtimeDrones, setRealtimeDrones] = useState<DroneRealtimeData[]>([]);
  const [alerts, setAlerts] = useState<DroneAlert[]>([]);
  const [selectedDrone, setSelectedDrone] = useState<DroneRealtimeData | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toISOString());

  // Initialize real-time services
  useEffect(() => {
    // Start real-time polling
    startRealtimePolling(3000);

    // Subscribe to real-time updates
    const unsubscribeRealtime = subscribeToRealtimeUpdates((updatedDrones) => {
      setRealtimeDrones(updatedDrones);
      setLastUpdate(getLastUpdateTimestamp());
    });

    // Subscribe to alerts
    const unsubscribeAlerts = subscribeToAlerts((updatedAlerts) => {
      setAlerts(updatedAlerts);
    });

    // Initial fetch
    fetchRealtimeDroneData().then(setRealtimeDrones);

    return () => {
      stopRealtimePolling();
      unsubscribeRealtime();
      unsubscribeAlerts();
    };
  }, []);

  // Start alert monitoring after realtime drones are loaded
  useEffect(() => {
    if (realtimeDrones.length > 0) {
      const stopAlertMonitoring = startAlertMonitoring(() => realtimeDrones);
      return stopAlertMonitoring;
    }
  }, [realtimeDrones]);

  // Merge real-time data with AdminDrone data (only if we have real drones)
  const enhancedDrones: (AdminDrone & Partial<DroneRealtimeData>)[] = drones.length > 0 ? drones.map(drone => {
    const realtime = realtimeDrones.find(rd => rd.id === drone.id);
    
    // Map realtime status to AdminDrone status format
    let mappedStatus: AdminDrone['status'] = drone.status;
    if (realtime) {
      if (realtime.status === 'delivering') mappedStatus = 'Delivering';
      else if (realtime.status === 'returning') mappedStatus = 'Charging';
      else if (realtime.status === 'maintenance') mappedStatus = 'Maintenance';
      else if (realtime.status === 'offline') mappedStatus = 'Idle';
      else if (realtime.status === 'active' && !realtime.orderId) mappedStatus = 'Idle';
    }
    
    return {
      ...drone,
      // Override with realtime data
      battery: realtime?.battery ?? drone.battery,
      status: mappedStatus,
      currentOrderId: realtime?.orderId || drone.currentOrderId,
      // Add realtime fields
      ...(realtime && {
        position: realtime.position,
        speed: realtime.speed,
        connectionStatus: realtime.connectionStatus,
        eta: realtime.eta
      })
    };
  }) : [];

  // TODO: Backend integration in Phase 2 - removed mockDrones fallback
  const dronesToDisplay = enhancedDrones.length > 0 ? enhancedDrones : [];

  // Group drones by restaurant
  const groupedDrones = dronesToDisplay.reduce((acc, drone) => {
    if (!acc[drone.restaurantId]) {
      acc[drone.restaurantId] = {
        restaurantName: drone.restaurantName,
        drones: []
      };
    }
    acc[drone.restaurantId].drones.push(drone);
    return acc;
  }, {} as Record<string, { restaurantName: string; drones: (AdminDrone & Partial<DroneRealtimeData>)[] }>);

  const filteredDrones = (
    restaurantDrones: (AdminDrone & Partial<DroneRealtimeData>)[]
  ) => {
    return restaurantDrones.filter(drone => 
      statusFilter === 'All' || drone.status === statusFilter
    );
  };

  const openModal = (drone: AdminDrone, action: 'flag' | 'clear' | 'reassign' | 'recall' | 'detail') => {
    setModalData({ drone, action });
    setIssueDescription(drone.issueDescription || '');
    setSelectedRestaurantId('');
    // Restaurants are already loaded in useEffect
    
    // For detail modal, find real-time data
    if (action === 'detail') {
      const realtime = realtimeDrones.find(rd => rd.id === drone.id);
      if (realtime) {
        setSelectedDrone(realtime);
        setDetailModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setModalData(null);
    setIssueDescription('');
    setSelectedRestaurantId('');
    setDetailModalOpen(false);
    setSelectedDrone(null);
  };

  const handleRecallDrone = async () => {
    if (!modalData || !admin) return;
    
    const success = await recallDrone(
      modalData.drone.id,
      admin.id,
      admin.name
    );
    
    if (success) {
      toast.success(`Đã gọi drone ${modalData.drone.id} về trạm sạc`);
      onUpdate();
      closeModal();
    } else {
      toast.error('Không thể gọi drone về trạm');
    }
  };

  // Get drone realtime data from backend API
  const getDroneRealtimeData = async (droneId: string): Promise<DroneRealtimeData | null> => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
      const response = await fetch(`${API_BASE_URL}/drones/${droneId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch drone data: ${response.status}`);
      }
      const drone = await response.json();
      
      // Map to DroneRealtimeData format
      return {
        id: drone.id,
        restaurantId: drone.restaurantId || drone.restaurant || '',
        restaurantName: drone.restaurantName || '',
        status: drone.status || 'Idle',
        battery: drone.battery || drone.batteryLevel || 100,
        currentOrderId: drone.currentOrderId,
        position: { lat: 10.762622, lng: 106.660172 }, // Default position
        speed: 0,
        connectionStatus: 'connected',
        eta: undefined
      };
    } catch (error) {
      console.error('[DroneMonitor] Error fetching drone realtime data:', error);
      return null;
    }
  };

  const handleDroneClick = async (drone: AdminDrone & Partial<DroneRealtimeData>, mockRealtime?: DroneRealtimeData) => {
    // Try to find realtime data from realtimeDrones first
    const realtime = mockRealtime || realtimeDrones.find(rd => rd.id === drone.id);
    if (realtime) {
      setSelectedDrone(realtime);
      setDetailModalOpen(true);
    } else {
      // Fetch realtime data from API
      const realtimeData = await getDroneRealtimeData(drone.id);
      if (realtimeData) {
        setSelectedDrone(realtimeData);
        setDetailModalOpen(true);
      } else {
        // No realtime data available - could show error message
        console.warn('No realtime data available for drone:', drone.id);
      }
    }
  };

  const handleFlagDrone = () => {
    if (!modalData || !admin || !issueDescription.trim()) return;
    
    const success = flagDrone(modalData.drone.id, issueDescription.trim(), admin.id, admin.name);
    if (success) {
      onUpdate();
      closeModal();
    }
  };

  const handleClearFlag = () => {
    if (!modalData || !admin) return;
    
    const success = clearDroneFlag(modalData.drone.id, admin.id, admin.name);
    if (success) {
      onUpdate();
      closeModal();
    }
  };

  const handleReassignDrone = () => {
    if (!modalData || !admin || !selectedRestaurantId) return;
    
    const newRestaurant = restaurants.find(r => r.id === selectedRestaurantId);
    if (!newRestaurant) return;
    
    const success = reassignDrone(
      modalData.drone.id,
      selectedRestaurantId,
      newRestaurant.name,
      admin.id,
      admin.name
    );
    
    if (success) {
      onUpdate();
      closeModal();
    }
  };

  const formatDate = (timestamp: number) => {
    const days = Math.floor((Date.now() - timestamp) / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  // TODO: Backend integration in Phase 2 - removed mockDrones fallback
  const displayDrones = enhancedDrones.length > 0 ? enhancedDrones : [];
  
  const totalDrones = displayDrones.length;
  const statusCounts = {
    Idle: displayDrones.filter(d => d.status === 'Idle').length,
    Delivering: displayDrones.filter(d => d.status === 'Delivering').length,
    Charging: displayDrones.filter(d => d.status === 'Charging').length,
    Maintenance: displayDrones.filter(d => d.status === 'Maintenance').length
  };

  // Get restaurant name for detail modal
  const [restaurantName, setRestaurantName] = useState<string>('');
  useEffect(() => {
    if (selectedDrone?.restaurantId) {
      getRestaurantById(selectedDrone.restaurantId).then(restaurant => {
        if (restaurant) {
          setRestaurantName(restaurant.name);
        }
      });
    }
  }, [selectedDrone]);

  return (
    <Container>
      <Header>
        <div>
          <Title>Giám sát drone</Title>
          <RealtimeIndicator>
            <span>•</span>
            Cập nhật {Math.round((Date.now() - new Date(lastUpdate).getTime()) / 1000)}s trước
          </RealtimeIndicator>
        </div>
      </Header>

      {/* Fleet Summary Bar - Only show if we have real drones */}
      {enhancedDrones.length > 0 && <DroneSummaryBar drones={realtimeDrones} />}
      
      <FilterGroup>
        <FilterButton 
          $active={statusFilter === 'All'} 
          onClick={() => setStatusFilter('All')}
        >
          Tất cả ({totalDrones})
        </FilterButton>
        <FilterButton 
          $active={statusFilter === 'Idle'} 
          onClick={() => setStatusFilter('Idle')}
        >
          🟢 Rảnh rỗi ({statusCounts.Idle})
        </FilterButton>
        <FilterButton 
          $active={statusFilter === 'Delivering'} 
          onClick={() => setStatusFilter('Delivering')}
        >
          🔵 Đang giao hàng ({statusCounts.Delivering})
        </FilterButton>
        <FilterButton 
          $active={statusFilter === 'Charging'} 
          onClick={() => setStatusFilter('Charging')}
        >
          🟡 Đang sạc ({statusCounts.Charging})
        </FilterButton>
        <FilterButton 
          $active={statusFilter === 'Maintenance'} 
          onClick={() => setStatusFilter('Maintenance')}
        >
          🔴 Bảo trì ({statusCounts.Maintenance})
        </FilterButton>
      </FilterGroup>
      
      <div style={{ marginTop: '30px' }}>
        {Object.entries(groupedDrones).map(([restaurantId, { restaurantName, drones: restaurantDrones }]) => {
          const filtered = filteredDrones(restaurantDrones);
          if (filtered.length === 0) return null;
          
          // Check if this is mock data (when no real drones exist)
          const isMockData = enhancedDrones.length === 0;
          
          return (
            <RestaurantSection key={restaurantId}>
              <RestaurantHeader>
                <RestaurantName>
                  🏪 {restaurantName} {isMockData && '(Demo)'}
                </RestaurantName>
                <DroneCount>
                  {filtered.length} / {restaurantDrones.length} máy bay
                </DroneCount>
              </RestaurantHeader>
              
              <DroneGrid>
                {filtered.map((drone, index) => {
                  // TODO: Backend integration in Phase 2 - removed mock realtime data generation
                  // Get realtime data from realtimeDrones (from backend API)
                  const realtime = realtimeDrones.find(rd => rd.id === drone.id);
                  // If no realtime data, use placeholder values (will be replaced with backend data in Phase 2)
                  const position = realtime?.position || null;
                  const speed = realtime?.speed || 0;
                  const connectionStatus = realtime?.connectionStatus || 'offline' as const;
                  const eta = realtime?.eta || undefined;
                  
                  const droneAlerts = getDroneAlerts(drone.id);
                  const hasAlert = droneAlerts.length > 0;
                  const alertSeverity = hasAlert ? droneAlerts[0].severity : undefined;
                  
                  return (
                  <DroneCard
                    key={drone.id}
                    $flagged={drone.flaggedForIssue}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ position: 'relative', cursor: 'pointer' }}
                    onClick={() => handleDroneClick(drone, realtime)}
                  >
                    {drone.flaggedForIssue && <FlagIcon>🚩</FlagIcon>}
                    {hasAlert && <AlertIndicator $severity={alertSeverity || 'medium'} />}
                    
                    <DroneHeader>
                      <DroneId>{drone.id}</DroneId>
                      <StatusBadge $status={drone.status}>
                        {drone.status === 'Idle' ? 'Rảnh rỗi' : drone.status === 'Delivering' ? 'Đang giao hàng' : drone.status === 'Charging' ? 'Đang sạc' : 'Bảo trì'}
                      </StatusBadge>
                    </DroneHeader>
                    
                    <DroneInfo>
                      <InfoRow>
                        <InfoLabel>Pin:</InfoLabel>
                        <InfoValue>{Math.round(drone.battery)}%</InfoValue>
                      </InfoRow>
                      <BatteryBar>
                        <BatteryFill $level={drone.battery} />
                      </BatteryBar>
                      
                      {realtime?.position && (
                        <InfoRow style={{ marginTop: '12px' }}>
                          <InfoLabel>Vị trí GPS:</InfoLabel>
                          <InfoValue style={{ fontSize: '11px' }}>
                            {realtime.position.lat.toFixed(4)}, {realtime.position.lng.toFixed(4)}
                          </InfoValue>
                        </InfoRow>
                      )}
                      
                      {realtime?.speed !== undefined && realtime.speed > 0 && (
                        <InfoRow>
                          <InfoLabel>Tốc độ:</InfoLabel>
                          <InfoValue>{realtime.speed} km/h</InfoValue>
                        </InfoRow>
                      )}
                      
                      {realtime?.connectionStatus && (
                        <InfoRow>
                          <InfoLabel>Kết nối:</InfoLabel>
                          <ConnectionStatus $status={realtime.connectionStatus}>
                            {realtime.connectionStatus === 'online' ? 'Trực tuyến' : 
                             realtime.connectionStatus === 'lost_signal' ? 'Mất tín hiệu' : 
                             'Ngắt kết nối'}
                          </ConnectionStatus>
                        </InfoRow>
                      )}
                      
                      {(drone.currentOrderId || realtime?.orderId) && (
                        <InfoRow style={{ marginTop: '12px' }}>
                          <InfoLabel>Đơn hàng hiện tại:</InfoLabel>
                          <InfoValue>{realtime?.orderId || drone.currentOrderId}</InfoValue>
                        </InfoRow>
                      )}
                      
                      {realtime?.eta !== undefined && (drone.status === 'Delivering' || realtime?.status === 'delivering') && (
                        <InfoRow>
                          <InfoLabel>Thời gian ước tính đến nơi:</InfoLabel>
                          <InfoValue>{realtime.eta} phút</InfoValue>
                        </InfoRow>
                      )}
                      
                      <InfoRow>
                        <InfoLabel>Bảo trì gần nhất:</InfoLabel>
                        <InfoValue>{formatDate(drone.lastMaintenance)}</InfoValue>
                      </InfoRow>
                    </DroneInfo>
                    
                    {hasAlert && (
                      <IssueDescription style={{ marginTop: '10px', background: alertSeverity === 'high' ? '#ffebee' : '#fff3cd' }}>
                        <strong>⚠️ Cảnh báo:</strong> {droneAlerts[0].message}
                      </IssueDescription>
                    )}
                    
                    {drone.flaggedForIssue && drone.issueDescription && (
                      <IssueDescription>
                        <strong>⚠️ Issue:</strong> {drone.issueDescription}
                      </IssueDescription>
                    )}
                    
                    <ActionButtons onClick={(e) => e.stopPropagation()}>
                      {drone.flaggedForIssue ? (
                        <ActionButton
                          $variant="clear"
                          onClick={() => openModal(drone, 'clear')}
                        >
                          ✓ Xóa cờ
                        </ActionButton>
                      ) : (
                        <>
                          <ActionButton
                            $variant="flag"
                            onClick={() => openModal(drone, 'flag')}
                            style={{ flex: 1 }}
                          >
                            🚩 Báo sự cố
                          </ActionButton>
                          {drone.status === 'Idle' && (
                            <ActionButton
                              onClick={() => openModal(drone, 'reassign')}
                              style={{ flex: 1, background: '#007bff' }}
                            >
                              🔄 Phân công lại
                            </ActionButton>
                          )}
                          {(drone.status === 'Delivering' || realtime?.status === 'delivering') && (
                            <EmergencyButton
                              onClick={() => openModal(drone, 'recall')}
                            >
                              ⚠️ Can thiệp khẩn cấp
                            </EmergencyButton>
                          )}
                        </>
                      )}
                    </ActionButtons>
                  </DroneCard>
                  );
                })}
              </DroneGrid>
            </RestaurantSection>
          );
        })}
        
        {Object.values(groupedDrones).every(({ drones }) => filteredDrones(drones).length === 0) && (
          <EmptyState>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🚁</div>
            <div>Không có máy bay nào phù hợp với bộ lọc</div>
          </EmptyState>
        )}
      </div>
      
      <AnimatePresence>
        {modalData && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {modalData.action === 'flag' ? (
                <>
                  <ModalTitle>Báo cáo sự cố máy bay</ModalTitle>
                  <ModalText>
                    Đánh dấu <strong>{modalData.drone.id}</strong> cần bảo trì hoặc theo dõi sự cố.
                    Trạng thái máy bay sẽ được đặt sang "Bảo trì" và hành động sẽ được ghi lại.
                  </ModalText>
                  <Input
                    placeholder="Mô tả sự cố (VD: Pin suy giảm, Hỏng hóc cơ khí, v.v.)"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                  />
                  <ModalActions>
                    <ModalButton onClick={closeModal}>Hủy</ModalButton>
                    <ModalButton 
                      $primary 
                      onClick={handleFlagDrone}
                      disabled={!issueDescription.trim()}
                    >
                      Báo cáo sự cố
                    </ModalButton>
                  </ModalActions>
                </>
              ) : modalData.action === 'reassign' ? (
                <>
                  <ModalTitle>Phân công lại máy bay</ModalTitle>
                  <ModalText>
                    Phân công lại <strong>{modalData.drone.id}</strong> từ{' '}
                    <strong>{modalData.drone.restaurantName}</strong> sang nhà hàng đã xác minh khác.
                    <span style={{ display: 'block', marginTop: '10px', color: '#007bff' }}>
                      ℹ️ Chỉ nhà hàng đang hoạt động mới có thể nhận phân công máy bay.
                    </span>
                  </ModalText>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
                      Chọn nhà hàng đích
                    </label>
                    <select
                      value={selectedRestaurantId}
                      onChange={(e) => setSelectedRestaurantId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '14px',
                        background: 'white'
                      }}
                    >
                      <option value="">-- Chọn nhà hàng --</option>
                      {restaurants
                        .filter(r => r.status === 'Active' && r.id !== modalData.drone.restaurantId)
                        .map(r => (
                          <option key={r.id} value={r.id}>
                            {r.name} ({r.category}) - {r.droneCount} máy bay
                          </option>
                        ))}
                    </select>
                  </div>
                  
                  <ModalActions>
                    <ModalButton onClick={closeModal}>Hủy</ModalButton>
                    <ModalButton 
                      $primary 
                      onClick={handleReassignDrone}
                      disabled={!selectedRestaurantId}
                    >
                      Xác nhận phân công lại
                    </ModalButton>
                  </ModalActions>
                </>
              ) : modalData.action === 'recall' ? (
                <>
                  <ModalTitle>⚠️ Can thiệp khẩn cấp</ModalTitle>
                  <ModalText>
                    Bạn có muốn gọi drone <strong>{modalData.drone.id}</strong> về trạm sạc không?
                    <span style={{ display: 'block', marginTop: '10px', color: '#dc3545' }}>
                      ⚠️ Drone sẽ dừng giao hàng hiện tại và trở về trạm sạc.
                    </span>
                  </ModalText>
                  <ModalActions>
                    <ModalButton onClick={closeModal}>Hủy</ModalButton>
                    <ModalButton 
                      $primary 
                      onClick={handleRecallDrone}
                      style={{ background: '#dc3545' }}
                    >
                      Xác nhận
                    </ModalButton>
                  </ModalActions>
                </>
              ) : (
                <>
                  <ModalTitle>Xóa cờ máy bay</ModalTitle>
                  <ModalText>
                    Bạn có chắc chắn muốn xóa cờ bảo trì của <strong>{modalData.drone.id}</strong>?
                    <span style={{ display: 'block', marginTop: '10px', color: '#28a745' }}>
                      ✓ Trạng thái máy bay sẽ được đặt lại về "Rảnh rỗi" và đánh dấu đang hoạt động.
                    </span>
                  </ModalText>
                  <ModalActions>
                    <ModalButton onClick={closeModal}>Hủy</ModalButton>
                    <ModalButton $primary onClick={handleClearFlag}>
                      Xóa cờ
                    </ModalButton>
                  </ModalActions>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

      {/* Drone Detail Modal */}
      <DroneDetailModal
        drone={selectedDrone}
        isOpen={detailModalOpen}
        onClose={closeModal}
        restaurantName={restaurantName}
      />
    </Container>
  );
};

export default DroneMonitor;

