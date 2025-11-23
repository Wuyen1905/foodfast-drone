import http from "http";

const BACKEND_URL = "http://localhost:8080/api/health";
const TIMEOUT = 3000; // 3 seconds timeout

console.log("🔍 Checking backend connection...");

const request = http.get(BACKEND_URL, { timeout: TIMEOUT }, (res) => {
  if (res.statusCode === 200) {
    console.log("✅ Backend is running on port 8080");
    process.exit(0);
  } else {
    console.error(`⚠️ Backend returned status ${res.statusCode}. Start Spring Boot first.`);
    process.exit(1);
  }
});

request.on("error", (err) => {
  if (err.code === "ECONNREFUSED") {
    console.error("⚠️ Backend not running. Please start backend on port 8080.");
    console.error("   Run: cd backend && mvn spring-boot:run");
  } else {
    console.error(`⚠️ Backend connection error: ${err.message}`);
  }
  process.exit(1);
});

request.on("timeout", () => {
  console.error("⚠️ Backend connection timeout. Is Spring Boot running?");
  request.destroy();
  process.exit(1);
});

request.setTimeout(TIMEOUT);

