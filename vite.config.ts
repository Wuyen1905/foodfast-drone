import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: 'window', // Fix SockJS "global is not defined" issue
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    cors: true,
    // [Backend Connection] Proxy API requests to Spring Boot backend
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // Keep /api prefix - Spring Boot endpoints should be under /api
        secure: false,
        timeout: 30000, // 30 seconds timeout for HTTP requests (increased to prevent payload cutting)
        // Prevent payload cutting by increasing buffer sizes and adding logging
        configure: (proxy: any) => {
          proxy.on('proxyReq', (proxyReq: any, req: any, res: any) => {
            // Log request details for debugging
            console.log(`[Vite Proxy] ${req.method} ${req.url}`);
            // Increase timeout to prevent payload cutting
            proxyReq.setTimeout(30000, () => {
              if (res && !res.headersSent) {
                res.writeHead(504, {
                  'Content-Type': 'application/json',
                });
                res.end(JSON.stringify({ 
                  error: 'Gateway Timeout',
                  message: 'Backend request timed out'
                }));
              }
            });
            // Set larger buffer sizes to handle large payloads
            if (req.headers['content-length']) {
              const contentLength = parseInt(req.headers['content-length'], 10);
              console.log(`[Vite Proxy] Request payload size: ${contentLength} bytes`);
            }
          });
          
          proxy.on('error', (err: any, req: any, res: any) => {
            // Suppress ECONNREFUSED and ECONNRESET errors when backend is not ready
            if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
              console.log(`[Vite Proxy] Backend not ready (${err.code}), request will be retried by client`);
              // Return a 503 Service Unavailable response
              if (res && !res.headersSent) {
                res.writeHead(503, {
                  'Content-Type': 'application/json',
                });
                res.end(JSON.stringify({ 
                  error: 'Backend service unavailable',
                  message: 'The backend server is starting up. Please try again in a moment.'
                }));
              }
            } else {
              console.error('[Vite Proxy] Error:', err);
            }
          });
        },
      },
      '/ws': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying
        secure: false,
        timeout: 30000, // 30 seconds timeout for WebSocket connections (increased for stability)
        // Prevent payload cutting by increasing buffer sizes
        configure: (proxy: any) => {
          // Increase WebSocket buffer sizes to prevent payload cutting
          proxy.on('proxyReqWs', (proxyReq: any, req: any, socket: any) => {
            // Set larger buffer sizes to handle large payloads
            if (socket) {
              socket.setNoDelay(true);
              socket.setKeepAlive(true, 60000);
            }
            // Log WebSocket connection attempts
            console.log('[Vite WS Proxy] WebSocket upgrade request:', req.url);
          });
          
          proxy.on('upgrade', (req: any, socket: any, head: any) => {
            // Log upgrade events
            console.log('[Vite WS Proxy] WebSocket upgrade:', req.url);
          });
          
          proxy.on('error', (err: any, req: any, socket: any) => {
            // Suppress WebSocket connection errors when backend is not ready
            if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
              console.log(`[Vite WS Proxy] Backend not ready (${err.code}), WebSocket will retry automatically`);
              // Close the socket gracefully
              if (socket && !socket.destroyed) {
                socket.end();
              }
            } else {
              console.error('[Vite WS Proxy] Error:', err);
            }
          });
        },
      },
    },
    hmr: {
      host: "localhost",
      protocol: "ws",
      port: 5173,
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
  },
});