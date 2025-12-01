export const getBackendUrl = (): string => {
	const list = [
		"http://192.168.1.101:8080/api",
		"http://10.193.134.235:8080/api",
		"http://172.20.10.2:8080/api"
	];
	for (const url of list) {
		console.log("[Mobile Backend] Using:", url);
		return url;
	}
	return list[0]; // Fallback (should never reach here)
};

export const getWebSocketUrl = () =>
	getBackendUrl().replace("/api", "/ws");

