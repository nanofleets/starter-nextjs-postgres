#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// Check for required environment variables
const name = process.env.NAME;
const registryUser = process.env.DOCKER_USERNAME;

if (!name) {
  console.error("Error: NAME environment variable is required in .env");
  process.exit(1);
}

if (!registryUser) {
  console.error(
    "Error: DOCKER_USERNAME environment variable is required in .env",
  );
  process.exit(1);
}

const tag = process.env.TAG || "latest";
const appName = process.env.APP_NAME || name;
const path_prefix = process.env.PATH_PREFIX || "/";
const cpuLimit = process.env.CPU_LIMIT || "50m";
const memoryLimit = process.env.MEMORY_LIMIT || "100mb";

// Build image name
const imageName = `${registryUser}/${name}:${tag}`;

console.log("\nCreating NOA app...");
console.log("Image:", imageName);
console.log("App name:", appName);
console.log("");

try {
  const command = `noa app create ${imageName} -n ${appName} --path ${path_prefix} --cpu-limit=${cpuLimit} --memory-limit=${memoryLimit}`;
  console.log(`Running: ${command}\n`);
  execSync(command, { stdio: "inherit" });

  console.log("\nNOA app created successfully!");
} catch (error) {
  console.error("\nError creating NOA app:");
  console.error(error.message);
  process.exit(1);
}
