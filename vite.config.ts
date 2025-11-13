import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get local network IP for HMR
// This automatically detects the LAN IP address for WebSocket connections
function getLocalNetworkIP(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (iface) {
      for (const alias of iface) {
        // Check for IPv4 (handles both string 'IPv4' and number 4)
        const isIPv4 = alias.family === 'IPv4' || alias.family === 4;
        if (isIPv4 && !alias.internal) {
          return alias.address;
        }
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalNetworkIP();

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
    host: true, // Allow access from LAN (listens on all network interfaces)
    port: 5173,
    strictPort: false, // Allow port fallback if 5173 is in use
    cors: true,
    // [Backend Connection] Proxy API requests to Spring Boot backend
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // Keep /api prefix - Spring Boot endpoints should be under /api
        secure: false,
        timeout: 10000, // 10 seconds timeout for HTTP requests
        // Handle backend unavailability gracefully
        configure: (proxy: any) => {
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
          
          // Handle proxy timeout
          proxy.on('proxyReq', (proxyReq: any, req: any, res: any) => {
            proxyReq.setTimeout(10000, () => {
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
          });
        },
      },
      '/ws': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying
        secure: false,
        timeout: 10000, // 10 seconds timeout for WebSocket connections
        // Handle WebSocket proxy errors gracefully
        configure: (proxy: any) => {
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
          
          // Handle WebSocket upgrade errors
          proxy.on('proxyReqWs', (proxyReq: any, req: any, socket: any) => {
            socket.on('error', (err: any) => {
              // Suppress socket errors during connection
              if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
                console.log(`[Vite WS Proxy] Connection error (${err.code}), will retry`);
              }
            });
          });
        },
      },
    },
    hmr: {
      // Use local network IP for HMR to enable WebSocket connections over LAN
      // This fixes WebSocket timeout issues when accessing from other devices
      // Port is automatically set to match the server port (5173 or fallback)
      host: localIP,
      protocol: "ws",
      // clientPort will automatically match the server port
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
  },
});