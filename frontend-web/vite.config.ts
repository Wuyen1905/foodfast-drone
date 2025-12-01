import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import os from "os";

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address; // Return first valid LAN IP
      }
    }
  }
  return "localhost"; // fallback
}

const lanIp = getLocalIp();
console.log("[Vite] Using backend target:", `http://${lanIp}:8080`);

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
        target: `http://${lanIp}:8080`,
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
        target: `http://${lanIp}:8080`,
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
      // Use auto-detected LAN IP for HMR to enable WebSocket connections over LAN
      // This fixes WebSocket timeout issues when accessing from other devices
      host: lanIp,
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