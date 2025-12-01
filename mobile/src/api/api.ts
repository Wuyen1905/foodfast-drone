import axios from 'axios';
import { getBackendUrl } from './getBackendUrl';

// Backend API client for mobile app
// Uses IP fallback list via getBackendUrl
export const api = axios.create({
	baseURL: "http://192.168.1.101:8080/api", // Temporary, will be updated
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

(async () => {
	const API_BASE_URL = await getBackendUrl();
	console.log("[MOBILE] Using backend:", API_BASE_URL);
	api.defaults.baseURL = API_BASE_URL;
})();

