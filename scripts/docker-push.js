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
    "Error: DOCKER_USERNAME environment variable is required in .env for pushing",
  );
  process.exit(1);
}

const tag = process.env.TAG || "latest";

// Build image name
const imageName = `${registryUser}/${name}:${tag}`;

console.log("\nPushing image...");
console.log("Image:", imageName);
console.log("");

try {
  console.log("→ Pushing...");
  execSync(`docker push "${imageName}"`, {
    stdio: "inherit",
  });

  console.log("\nPush completed successfully!");
  console.log(`Image: ${imageName}`);
} catch (error) {
  console.error("\nError during push:");
  console.error(error.message);
  process.exit(1);
}
