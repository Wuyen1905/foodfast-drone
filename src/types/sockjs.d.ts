/**
 * TypeScript declarations for WebSocket libraries
 * Ensures TypeScript recognizes sockjs-client and @stomp/stompjs modules
 */

declare module "sockjs-client" {
  class SockJS {
    constructor(url: string, protocols?: string | string[], options?: any);
    readyState: number;
    url: string;
    protocol: string;
    onopen: ((event: any) => void) | null;
    onmessage: ((event: any) => void) | null;
    onclose: ((event: any) => void) | null;
    onerror: ((error: any) => void) | null;
    send(data: string): void;
    close(code?: number, reason?: string): void;
  }
  export default SockJS;
}

declare module "@stomp/stompjs" {
  export interface IMessage {
    body: string;
    headers: { [key: string]: string };
    command: string;
    ack(headers?: any): any;
    nack(headers?: any): any;
  }

  export interface ITransaction {
    id: string;
    commit(): void;
    abort(): void;
  }

  export interface IStompSocket {
    url: string;
    protocols?: string | string[];
    readyState: number;
    CONNECTING: number;
    OPEN: number;
    CLOSING: number;
    CLOSED: number;
    binaryType: string;
    extensions: string;
    protocol: string;
    onopen: ((event: any) => void) | null;
    onclose: ((event: any) => void) | null;
    onerror: ((event: any) => void) | null;
    onmessage: ((event: any) => void) | null;
    send(data: string | ArrayBuffer): void;
    close(code?: number, reason?: string): void;
  }

  export interface ClientOptions {
    brokerURL?: string;
    webSocketFactory?: () => IStompSocket;
    reconnectDelay?: number;
    heartbeatIncoming?: number;
    heartbeatOutgoing?: number;
    debug?: (str: string) => void;
    logRawCommunication?: boolean;
    onConnect?: (frame?: any) => void;
    onDisconnect?: () => void;
    onStompError?: (frame: any) => void;
    onWebSocketClose?: (event: CloseEvent) => void;
    onWebSocketError?: (event: Event) => void;
  }

  export class Client {
    connected: boolean;
    active: boolean;
    options: ClientOptions;
    heartbeat: { incoming: number; outgoing: number };
    
    constructor(options?: ClientOptions);
    
    configure(options: ClientOptions): void;
    activate(): void;
    deactivate(): void;
    
    subscribe(destination: string, callback: (message: IMessage) => void, headers?: any): any;
    unsubscribe(id: string, headers?: any): void;
    send(destination: string, headers?: any, body?: string): void;
    publish(options: { destination: string; body?: string; headers?: any }): void;
    
    begin(transaction: string): ITransaction;
    commit(transaction: string): void;
    abort(transaction: string): void;
    
    debug(...args: any[]): void;
    disconnect(disconnectCallback?: () => void, headers?: any): void;
  }
}

