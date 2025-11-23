#!/usr/bin/env node

/**
 * Cross-platform port utilities
 * Detects and manages port conflicts for Vite development server
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import net from 'net';

const execAsync = promisify(exec);

/**
 * Check if a port is in use
 * @param {number} port - Port number to check
 * @returns {Promise<boolean>} - True if port is in use
 */
export async function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => resolve(false));
      server.close();
    });
    
    server.on('error', () => {
      resolve(true);
    });
  });
}

/**
 * Find the process ID using a port (Windows)
 * @param {number} port - Port number
 * @returns {Promise<number|null>} - Process ID or null
 */
async function findProcessWindows(port) {
  try {
    // Method 1: Use netstat with findstr
    const { stdout } = await execAsync(`netstat -ano | findstr :${port} | findstr LISTENING`);
    const lines = stdout.trim().split('\n');
    
    for (const line of lines) {
      // Format: TCP    0.0.0.0:5173    0.0.0.0:0    LISTENING    12345
      // The PID is the last number in the line
      const match = line.match(/LISTENING\s+(\d+)$/);
      if (match) {
        const pid = parseInt(match[1]);
        if (!isNaN(pid) && pid > 0) {
          return pid;
        }
      }
      
      // Alternative: Extract last number from the line
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 5) {
        const lastPart = parts[parts.length - 1];
        const pid = parseInt(lastPart);
        if (!isNaN(pid) && pid > 0) {
          return pid;
        }
      }
    }
    
    // Method 2: Use PowerShell (more reliable)
    try {
      const { stdout: psStdout } = await execAsync(
        `powershell -Command "Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty OwningProcess"`
      );
      const pid = parseInt(psStdout.trim());
      if (!isNaN(pid) && pid > 0) {
        return pid;
      }
    } catch (psError) {
      // PowerShell method failed, continue with other methods
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Find the process ID using a port (macOS/Linux)
 * @param {number} port - Port number
 * @returns {Promise<number|null>} - Process ID or null
 */
async function findProcessUnix(port) {
  try {
    // Try lsof first (most reliable on macOS)
    try {
      const { stdout } = await execAsync(`lsof -ti:${port}`);
      const pid = parseInt(stdout.trim());
      if (!isNaN(pid) && pid > 0) {
        return pid;
      }
    } catch (lsofError) {
      // lsof might not be available, try netstat
    }
    
    // Fallback to netstat
    const { stdout } = await execAsync(`netstat -tulpn 2>/dev/null | grep :${port} || ss -tulpn 2>/dev/null | grep :${port}`);
    const match = stdout.match(/LISTEN\s+\d+\/\w+.*?(\d+)/);
    if (match) {
      const pid = parseInt(match[1]);
      if (!isNaN(pid) && pid > 0) {
        return pid;
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Find the process ID using a port (cross-platform)
 * @param {number} port - Port number
 * @returns {Promise<number|null>} - Process ID or null
 */
export async function findProcessOnPort(port) {
  if (process.platform === 'win32') {
    return findProcessWindows(port);
  } else {
    return findProcessUnix(port);
  }
}

/**
 * Kill a process by PID (cross-platform)
 * @param {number} pid - Process ID
 * @returns {Promise<boolean>} - True if successful
 */
export async function killProcess(pid) {
  try {
    if (process.platform === 'win32') {
      await execAsync(`taskkill /F /PID ${pid}`);
    } else {
      await execAsync(`kill -9 ${pid}`);
    }
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Free a port by killing the process using it
 * @param {number} port - Port number to free
 * @returns {Promise<boolean>} - True if port was freed
 */
export async function freePort(port) {
  const pid = await findProcessOnPort(port);
  if (pid) {
    return await killProcess(pid);
  }
  return false;
}

/**
 * Find the next available port starting from a given port
 * @param {number} startPort - Starting port number
 * @param {number} maxAttempts - Maximum number of ports to check
 * @returns {Promise<number>} - Available port number
 */
export async function findAvailablePort(startPort, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    const port = startPort + i;
    const inUse = await isPortInUse(port);
    if (!inUse) {
      return port;
    }
  }
  throw new Error(`No available port found in range ${startPort}-${startPort + maxAttempts - 1}`);
}

