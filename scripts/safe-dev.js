#!/usr/bin/env node

/**
 * Safe Development Server Script
 * Prevents infinite loops, hanging builds, and soft-invalidated module issues
 */

import { spawn, exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { isPortInUse, freePort, findAvailablePort } from './port-utils.js';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Emoji prefixes for log readability
const emojis = {
  clean: '🧹',
  build: '📦',
  success: '✅',
  warning: '⚠️',
  error: '🚨',
  timeout: '⏰',
  info: 'ℹ️'
};

class SafeDevServer {
  constructor() {
    this.timeout = 5 * 60 * 1000; // 5 minutes
    this.startTime = Date.now();
    this.viteProcess = null;
    this.cleanupDone = false;
    this.vitePort = 5173; // Default port, will be updated if Vite uses a different one
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = emojis[type] || emojis.info;
    const color = type === 'error' ? colors.red : 
                  type === 'success' ? colors.green : 
                  type === 'warning' ? colors.yellow : colors.cyan;
    
    console.log(`${color}${emoji} [${timestamp}] ${message}${colors.reset}`);
  }

  async cleanCache() {
    this.log('Starting cache cleanup...', 'clean');
    
    const pathsToClean = [
      'node_modules/.vite',
      'dist',
      '.vite'
    ];

    for (const pathToClean of pathsToClean) {
      if (fs.existsSync(pathToClean)) {
        try {
          await this.removeDirectory(pathToClean);
          this.log(`Cleaned: ${pathToClean}`, 'clean');
        } catch (error) {
          this.log(`Warning: Could not clean ${pathToClean}: ${error.message}`, 'warning');
        }
      }
    }
    
    this.log('Cache cleanup completed', 'success');
  }

  async removeDirectory(dirPath) {
    return new Promise((resolve, reject) => {
      const command = process.platform === 'win32' 
        ? `rmdir /s /q "${dirPath}"` 
        : `rm -rf "${dirPath}"`;
      
      exec(command, (error) => {
        if (error && !error.message.includes('not found')) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async validateDependencies() {
    this.log('Validating dependencies...', 'info');
    
    if (!fs.existsSync('package.json')) {
      throw new Error('package.json not found');
    }

    if (!fs.existsSync('node_modules')) {
      this.log('node_modules not found, installing dependencies...', 'warning');
      await this.runCommand('npm', ['install', '--legacy-peer-deps']);
    }

    this.log('Dependencies validated', 'success');
  }

  async checkBackend(maxRetries = 5, retryDelay = 2000) {
    this.log('Checking backend connection...', 'info');
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const isConnected = await new Promise((resolve) => {
        const request = http.get('http://localhost:5000/api/health', { timeout: 2000 }, (res) => {
          if (res.statusCode === 200) {
            this.log('Backend is running on port 5000', 'success');
            resolve(true);
          } else {
            this.log(`Backend returned status ${res.statusCode}`, 'warning');
            resolve(false);
          }
        });

        request.on('error', (err) => {
          if (err.code === 'ECONNREFUSED') {
            if (attempt < maxRetries) {
              this.log(`Backend not ready (attempt ${attempt}/${maxRetries}), retrying in ${retryDelay/1000}s...`, 'warning');
            } else {
              this.log('Backend not running. Start Spring Boot first: cd backend && mvn spring-boot:run', 'warning');
            }
          } else {
            this.log(`Backend connection error: ${err.message}`, 'warning');
          }
          resolve(false);
        });

        request.on('timeout', () => {
          if (attempt < maxRetries) {
            this.log(`Backend connection timeout (attempt ${attempt}/${maxRetries}), retrying...`, 'warning');
          } else {
            this.log('Backend connection timeout. Is Spring Boot running?', 'warning');
          }
          request.destroy();
          resolve(false);
        });

        request.setTimeout(2000);
      });

      if (isConnected) {
        return true;
      }

      // Wait before retrying (except on last attempt)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }

    return false;
  }

  async checkAndFreePort(port) {
    this.log(`Checking if port ${port} is available...`, 'info');
    
    const inUse = await isPortInUse(port);
    if (inUse) {
      this.log(`Port ${port} is in use, attempting to free it...`, 'warning');
      const freed = await freePort(port);
      if (freed) {
        this.log(`Successfully freed port ${port}`, 'success');
        // Wait a moment for the port to be fully released
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
      } else {
        this.log(`Could not free port ${port}, will try next available port`, 'warning');
        return false;
      }
    }
    
    this.log(`Port ${port} is available`, 'success');
    return true;
  }

  async runCommand(command, args = []) {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args, { 
        stdio: 'inherit',
        shell: true 
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command failed with code ${code}`));
        }
      });

      process.on('error', reject);
    });
  }

  startVite() {
    this.log('Starting Vite development server...', 'build');
    
    this.viteProcess = spawn('npx', ['vite'], {
      stdio: 'pipe',
      shell: true
    });

    let serverStarted = false;
    let outputBuffer = '';

    this.viteProcess.stdout.on('data', (data) => {
      const output = data.toString();
      outputBuffer += output;
      
      // Extract port number from Vite output
      // Vite outputs: "Local:   http://localhost:5173/" or "Local:   http://127.0.0.1:5174/"
      const portMatch = output.match(/Local:\s+http:\/\/[^:]+:(\d+)/);
      if (portMatch) {
        const detectedPort = parseInt(portMatch[1]);
        if (detectedPort !== this.vitePort) {
          this.vitePort = detectedPort;
          this.log(`Vite is running on port ${this.vitePort}`, 'info');
        }
      }
      
      // Check for server ready indicators
      if (output.includes('Local:') || output.includes('ready in')) {
        if (!serverStarted) {
          serverStarted = true;
          this.log('Development server started successfully!', 'success');
          this.log(`Server is ready at http://localhost:${this.vitePort}`, 'success');
        }
      }
      
      // Filter and format output
      this.formatOutput(output);
    });

    this.viteProcess.stderr.on('data', (data) => {
      const error = data.toString();
      
      // Filter out common non-critical warnings
      if (!this.isIgnorableError(error)) {
        this.log(`Vite Error: ${error.trim()}`, 'error');
      }
    });

    this.viteProcess.on('close', (code) => {
      if (code !== 0) {
        this.log(`Vite process exited with code ${code}`, 'error');
      }
    });

    // Set timeout
    setTimeout(() => {
      if (!serverStarted) {
        this.log('Timeout exceeded! Server did not start within 5 minutes', 'timeout');
        this.log('Terminating process...', 'error');
        this.cleanup();
        process.exit(1);
      }
    }, this.timeout);
  }

  formatOutput(output) {
    const lines = output.split('\n');
    
    for (const line of lines) {
      if (line.trim()) {
        // Filter out repetitive HMR messages
        if (line.includes('hmr update') && line.includes('(x')) {
          return; // Skip repetitive HMR updates
        }
        
        // Filter out Fast Refresh warnings
        if (line.includes('Could not Fast Refresh')) {
          return; // Skip Fast Refresh warnings
        }
        
        // Format important messages
        if (line.includes('ready in')) {
          this.log(`Server ready: ${line.trim()}`, 'success');
        } else if (line.includes('Local:')) {
          this.log(`Server URL: ${line.trim()}`, 'info');
        } else if (line.includes('error')) {
          this.log(`Error: ${line.trim()}`, 'error');
        } else if (line.includes('warning')) {
          this.log(`Warning: ${line.trim()}`, 'warning');
        }
      }
    }
  }

  isIgnorableError(error) {
    const ignorablePatterns = [
      'Could not Fast Refresh',
      'export is incompatible',
      'soft-invalidated module',
      'transform result'
    ];
    
    return ignorablePatterns.some(pattern => error.includes(pattern));
  }

  cleanup() {
    if (this.cleanupDone) return;
    
    this.log('Cleaning up...', 'clean');
    
    if (this.viteProcess) {
      this.viteProcess.kill('SIGTERM');
      setTimeout(() => {
        if (!this.viteProcess.killed) {
          this.viteProcess.kill('SIGKILL');
        }
      }, 1000);
    }
    
    this.cleanupDone = true;
  }

  async start() {
    try {
      // Clear screen
      console.clear();
      this.log('🚀 FoodFast Development Server - Safe Mode', 'info');
      this.log('==========================================', 'info');
      
      // Step 1: Clean cache
      await this.cleanCache();
      
      // Step 2: Validate dependencies
      await this.validateDependencies();
      
      // Step 3: Check and free port 5173 if needed
      const portFreed = await this.checkAndFreePort(5173);
      if (!portFreed) {
        this.log('Port 5173 is in use and could not be freed. Vite will use the next available port.', 'warning');
      }
      
      // Step 4: Check backend connection with retry logic (optional, won't fail if backend is down)
      await this.checkBackend(5, 2000);
      
      // Step 5: Start Vite with timeout protection
      this.startVite();
      
      // Handle process termination
      process.on('SIGINT', () => {
        this.log('Received SIGINT, shutting down gracefully...', 'warning');
        this.cleanup();
        process.exit(0);
      });
      
      process.on('SIGTERM', () => {
        this.log('Received SIGTERM, shutting down gracefully...', 'warning');
        this.cleanup();
        process.exit(0);
      });
      
    } catch (error) {
      this.log(`Fatal error: ${error.message}`, 'error');
      this.cleanup();
      process.exit(1);
    }
  }
}

// Start the safe development server
const server = new SafeDevServer();
server.start().catch(error => {
  console.error('Failed to start development server:', error);
  process.exit(1);
});
