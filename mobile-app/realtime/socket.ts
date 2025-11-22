import SockJS from 'sockjs-client';
import { Client, Frame, IMessage } from '@stomp/stompjs';
import { BASE_URL } from '@/constants/config';

type SubscriptionCallback<T = any> = (payload: T) => void;

class RealtimeSocket {
  private client: Client | null = null;
  private connected = false;
  private orderCallbacks: Set<SubscriptionCallback> = new Set();
  private droneCallbacks: Set<SubscriptionCallback> = new Set();
  private cartCallbacks: Set<SubscriptionCallback> = new Set();

  connect() {
    if (this.client || this.connected) {
      return;
    }

    this.client = new Client({
      webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: () => {},
    });

    this.client.onConnect = () => {
      this.connected = true;
      this.subscribeToTopics();
    };

    this.client.onDisconnect = () => {
      this.connected = false;
    };

    this.client.onStompError = (frame: Frame) => {
      console.error('[RealtimeSocket] STOMP error:', frame.headers['message'], frame.body);
    };

    this.client.activate();
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      this.connected = false;
    }
  }

  onOrderUpdate(callback: SubscriptionCallback) {
    this.orderCallbacks.add(callback);
    this.connect();
    return () => this.orderCallbacks.delete(callback);
  }

  onDroneUpdate(callback: SubscriptionCallback) {
    this.droneCallbacks.add(callback);
    this.connect();
    return () => this.droneCallbacks.delete(callback);
  }

  onCartUpdate(callback: SubscriptionCallback) {
    this.cartCallbacks.add(callback);
    this.connect();
    return () => this.cartCallbacks.delete(callback);
  }

  private subscribeToTopics() {
    if (!this.client || !this.connected) {
      return;
    }

    this.client.subscribe('/topic/orders', (message: IMessage) => {
      try {
        const payload = JSON.parse(message.body);
        this.orderCallbacks.forEach(cb => cb(payload));
      } catch (error) {
        console.error('[RealtimeSocket] Failed to parse order update:', error);
      }
    });

    this.client.subscribe('/topic/drone', (message: IMessage) => {
      try {
        const payload = JSON.parse(message.body);
        this.droneCallbacks.forEach(cb => cb(payload));
      } catch (error) {
        console.error('[RealtimeSocket] Failed to parse drone update:', error);
      }
    });

    this.client.subscribe('/topic/cart', (message: IMessage) => {
      const payload = JSON.parse(message.body);
      this.cartCallbacks.forEach(cb => cb(payload));
    });
  }
}

export const realtimeSocket = new RealtimeSocket();

