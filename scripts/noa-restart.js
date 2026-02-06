#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
  quiet: true,
});

const name = process.env.NAME;

if (!name) {
  console.error("Error: NAME environment variable is required in .env");
  process.exit(1);
}

try {
  execSync(`noa app restart ${name}`, { stdio: "inherit" });
} catch (error) {
  process.exit(1);
}
