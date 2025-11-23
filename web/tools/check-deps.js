#!/usr/bin/env node

/**
 * Dependency Check Script
 * Checks for required peer dependencies (Recharts, etc.)
 * and installs missing ones automatically
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Required peer dependencies for Recharts and visualization libraries
const deps = [
  "react-is",
  "prop-types",
  "d3-scale",
  "d3-shape",
  "d3-time",
  "d3-time-format",
  "d3-color",
  "d3-interpolate",
  "d3-array"
];

console.log("🔍 Checking peer dependencies...");

// Read package.json
const pkgPath = path.join(__dirname, "..", "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const installed = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.devDependencies || {}));

const missing = deps.filter(dep => !installed.includes(dep));

if (missing.length > 0) {
  console.log(`⚠️ Missing dependencies: ${missing.join(", ")}`);
  console.log("📦 Installing missing dependencies...");
  try {
    execSync(`npm install ${missing.join(" ")} --save --legacy-peer-deps`, { 
      stdio: "inherit",
      cwd: path.join(__dirname, "..")
    });
    console.log("✅ Dependencies installed successfully.");
  } catch (error) {
    console.error("❌ Error installing dependencies:", error.message);
    process.exit(1);
  }
} else {
  console.log("✅ All dependencies already installed.");
}

// Write simple log file
try {
  const timestamp = new Date().toISOString();
  const logPath = path.join(__dirname, "check-log.txt");
  const content = missing && missing.length
    ? `${timestamp} ⚠️ Installed: ${missing.join(", ")}\n`
    : `${timestamp} ✅ All dependencies already installed.\n`;
  fs.appendFileSync(logPath, content);
  console.log(`📝 Log written to ${logPath}`);
} catch (err) {
  console.warn("⚠️ Could not write log file:", err.message);
}

