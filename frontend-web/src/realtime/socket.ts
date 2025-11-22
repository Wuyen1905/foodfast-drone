import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

type Callback<T = any> = (payload: T) => void;

class WebRealtimeSocket {
  private client: Client | null = null;
  private orderSubscribers: Set<Callback> = new Set();
  private droneSubscribers: Set<Callback> = new Set();
  private connected = false;

  private connect() {
    if (this.connected || this.client) {
      return;
    }

    this.client = new Client({
      webSocketFactory: () => {
        const wsUrl = import.meta.env.VITE_WS_BASE_URL;
        if (!wsUrl && !import.meta.env.DEV) {
          throw new Error('VITE_WS_BASE_URL environment variable is required for production');
        }
        return new SockJS(wsUrl ? `${wsUrl}/ws` : '/ws');
      },
      reconnectDelay: 4000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: () => {},
    });

    this.client.onConnect = () => {
      this.connected = true;
      this.subscribeTopics();
    };

    this.client.onDisconnect = () => {
      this.connected = false;
      this.client = null;
    };

    this.client.onStompError = (frame) => {
      console.error('[Realtime] STOMP error:', frame.headers['message'], frame.body);
    };

    this.client.activate();
  }

  private subscribeTopics() {
    if (!this.client) {
      return;
    }

    this.client.subscribe('/topic/orders', (message: IMessage) => {
      try {
        const payload = JSON.parse(message.body);
        this.orderSubscribers.forEach(cb => cb(payload));
      } catch (error) {
        console.error('[Realtime] Failed to parse order message:', error);
      }
    });

    this.client.subscribe('/topic/drone', (message: IMessage) => {
      try {
        const payload = JSON.parse(message.body);
        this.droneSubscribers.forEach(cb => cb(payload));
      } catch (error) {
        console.error('[Realtime] Failed to parse drone message:', error);
      }
    });
  }

  subscribeOrderUpdates(callback: Callback) {
    this.orderSubscribers.add(callback);
    this.connect();
    return () => this.orderSubscribers.delete(callback);
  }

  subscribeDroneUpdates(callback: Callback) {
    this.droneSubscribers.add(callback);
    this.connect();
    return () => this.droneSubscribers.delete(callback);
  }

  onOrderUpdate(callback: Callback) {
    return this.subscribeOrderUpdates(callback);
  }
}

const realtimeSocket = new WebRealtimeSocket();

export const subscribeOrderUpdates = (callback: Callback) =>
  realtimeSocket.subscribeOrderUpdates(callback);

export const subscribeDroneUpdates = (callback: Callback) =>
  realtimeSocket.subscribeDroneUpdates(callback);

export { realtimeSocket };

