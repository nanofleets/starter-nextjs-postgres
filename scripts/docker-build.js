#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// Check for required NAME environment variable
const name = process.env.NAME;
if (!name) {
  console.error("Error: NAME environment variable is required in .env");
  process.exit(1);
}

// Get values from environment variables (loaded by dotenv)
const registryUser = process.env.DOCKER_USERNAME || "";
const tag = process.env.TAG || "latest";

// Build image name
const imageName = registryUser
  ? `${registryUser}/${name}:${tag}`
  : `${name}:${tag}`;

console.log("\nBuilding image...");
console.log("Image:", imageName);
console.log("");

try {
  console.log("→ Building...");
  execSync(`docker build -t "${imageName}" .`, {
    stdio: "inherit",
  });

  console.log("\nBuild completed successfully!");
  console.log(`Image: ${imageName}`);
} catch (error) {
  console.error("\nError during build:");
  console.error(error.message);
  process.exit(1);
}
