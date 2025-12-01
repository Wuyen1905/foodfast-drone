import axios from "axios";

const BACKEND_IP_LIST = [
	"http://192.168.1.101:8080/api",  // Laptop LAN của user
	"http://10.193.134.235:8080/api", // 4G của user
	"http://172.20.10.2:8080/api",    // LAN/4G của bạn user
];

let cached: string | null = null;

const pingBackend = async (url: string): Promise<boolean> => {
	try {
		const baseUrl = url.replace("/api", "");
		await axios.head(baseUrl, { timeout: 1000 });
		return true;
	} catch (error) {
		return false;
	}
};

export const getBackendUrl = async (): Promise<string> => {
	if (cached) return cached;

	for (const ip of BACKEND_IP_LIST) {
		console.log("[IP-FALLBACK] Trying:", ip);
		if (await pingBackend(ip)) {
			cached = ip;
			console.log("[IP-FALLBACK] Selected backend:", ip);
			return ip;
		}
	}

	throw new Error("No backend reachable");
};

export const getWebSocketUrl = async () =>
	(await getBackendUrl()).replace("/api", "/ws");
