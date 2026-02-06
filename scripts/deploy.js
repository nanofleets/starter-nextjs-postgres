#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// Parse command line arguments
const args = process.argv.slice(2);
const deployTarget = args[0]; // "frontend", "backend", or undefined (both)

// Get values from environment variables (loaded by dotenv)
const registryUser = process.env.DOCKER_USERNAME || "nanofleets";
const tag = process.env.TAG || "latest";
const frontendName =
  process.env.FRONTEND_PROJECT_NAME || "starter-hello-frontend";
const backendName = process.env.BACKEND_PROJECT_NAME || "starter-hello-backend";

const shouldDeployFrontend = !deployTarget || deployTarget === "frontend";
const shouldDeployBackend = !deployTarget || deployTarget === "backend";

const frontendImage = `${registryUser}/${frontendName}:${tag}`;
const backendImage = `${registryUser}/${backendName}:${tag}`;

console.log("\nDeploying apps...");
if (shouldDeployFrontend) console.log("Frontend:", frontendImage);
if (shouldDeployBackend) console.log("Backend: ", backendImage);
console.log("");

try {
  if (shouldDeployFrontend) {
    console.log("→ Deploying frontend...");
    execSync(`noa app create ${frontendImage} -n frontend --path /`, {
      stdio: "inherit",
    });
  }

  if (shouldDeployBackend) {
    console.log(
      shouldDeployFrontend
        ? "\n→ Deploying backend..."
        : "→ Deploying backend...",
    );
    execSync(`noa app create ${backendImage} -n backend --path=/api`, {
      stdio: "inherit",
    });
  }

  console.log("\nDeployment completed successfully!");
} catch (error) {
  console.error("\nError during deployment:");
  console.error(error.message);
  process.exit(1);
}
