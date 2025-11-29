import axios from "axios";
import { getApiBaseUrl } from "../config/backend";

const API_BASE_URL = getApiBaseUrl();

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: false
});

export default api;

