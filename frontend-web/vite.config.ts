import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// WiFi IPv4 address for LAN access
// This is the IP address that mobile devices will use to access the dev server
const WIFI_IP = "192.168.0.100";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@realtime": path.resolve(__dirname, "./src/realtime"),
      "@schemas": path.resolve(__dirname, "./src/schemas"),
      "@state": path.resolve(__dirname, "./src/state"),
    },
  },
  server: {
    host: true, // Listen on all network interfaces for LAN access
    port: 5173,
    strictPort: false, // Allow port fallback if 5173 is in use (will try 5174, 5175, etc.)
    cors: true,
    // Proxy API requests to Spring Boot backend
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        timeout: 30000,
        configure: (proxy: any) => {
          proxy.on('proxyReq', (proxyReq: any, req: any, res: any) => {
            console.log(`[Vite Proxy] ${req.method} ${req.url}`);
          });
          proxy.on('error', (err: any, req: any, res: any) => {
            if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
              console.log(`[Vite Proxy] Backend not ready (${err.code}), request will be retried`);
              if (res && !res.headersSent) {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Backend service unavailable' }));
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
        ws: true,
        secure: false,
        timeout: 30000,
        configure: (proxy: any) => {
          proxy.on('error', (err: any, req: any, socket: any) => {
            if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
              console.log(`[Vite WS Proxy] Backend not ready (${err.code}), WebSocket will retry`);
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
      // Use WiFi IP for HMR to enable WebSocket connections over LAN
      // This fixes WebSocket timeout issues when accessing from other devices
      host: WIFI_IP,
      protocol: "ws",
      clientPort: 5173, // Match server port
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
  },
});