import axios from "axios";

export async function getBackendUrl() {
  try {
    const res = await axios.get("http://localhost:8080/api/_host_info", { timeout: 2000 });

    if (res.data?.backend_url) {
      console.log("[Auto-Detect] Backend URL:", res.data.backend_url);
      return res.data.backend_url;
    }
  } catch (e) {
    console.log("[Auto-Detect] Failed, fallback to localhost.");
  }

  return "http://localhost:8080/api";
}

