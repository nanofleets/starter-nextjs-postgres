#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
  quiet: true,
});

// Check for required environment variables
const name = process.env.NAME;
const registryUser = process.env.DOCKER_USERNAME;
const databaseUrl = process.env.DATABASE_URL;

if (!name) {
  console.error(
    'Error: missing NAME in .env — this should be the app name (e.g. "todo")',
  );
  process.exit(1);
}

if (!registryUser) {
  console.error(
    "Error: DOCKER_USERNAME environment variable is required in .env",
  );
  process.exit(1);
}

if (!databaseUrl) {
  console.error("Error: DATABASE_URL environment variable is required in .env");
  process.exit(1);
}

const tag = process.env.TAG || "latest";
const imageName = `${registryUser}/${name}:${tag}`;

console.log("\nDeploying NOA app...");
console.log("Image:", imageName);
console.log("App name:", name);
console.log("");

try {
  const command = `noa deploy ${imageName} -n ${name} --path / --cpu-limit=300m --memory-limit=200mb -e DATABASE_URL=${databaseUrl}`;
  console.log(`Running: ${command}\n`);
  execSync(command, { stdio: "inherit" });

  console.log("\nNOA app deployed successfully!");
} catch (error) {
  console.error("\nError deploying NOA app:");
  console.error(error.message);
  process.exit(1);
}
