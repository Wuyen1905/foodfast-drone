// Backend URL builder for web (Vite + browser)
// Goal: Use the same host as the web app, port 8080, path /api.
// Works for laptop + phone, any WiFi / 4G, any IP.

const DEFAULT_PORT = 8080;
const DEFAULT_PATH = '/api';

export function getApiBaseUrl(): string {
  // 1. If VITE_API_BASE_URL is defined, use it (for later production deployment)
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envUrl && typeof envUrl === 'string' && envUrl.startsWith('http')) {
    console.log('[backend] Using VITE_API_BASE_URL:', envUrl);
    return envUrl.replace(/\/+$/, '');
  }

  // 2. For dev: derive from window.location.host
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    const base = `http://${hostname}:${DEFAULT_PORT}${DEFAULT_PATH}`;
    console.log('[backend] Using derived dev URL from hostname:', base);
    return base.replace(/\/+$/, '');
  }

  // 3. Fallback (rare: SSR / safety)
  const fallback = `http://localhost:${DEFAULT_PORT}${DEFAULT_PATH}`;
  console.warn('[backend] Fallback backend URL:', fallback);
  return fallback.replace(/\/+$/, '');
}

