import axios from 'axios';

function buildBaseUrl() {
  const hostname = window.location.hostname;

  // derive backend = same-host + port 8080
  const url = `http://${hostname}:8080/api`;

  console.log("[API] Auto Backend URL:", url);
  return url;
}

export const api = axios.create({
  baseURL: buildBaseUrl(),
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});
