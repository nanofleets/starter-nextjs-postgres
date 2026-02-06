import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import { existsSync } from "fs";

// Load .env first, then .env.local to override
dotenv.config({ path: ".env" });
if (existsSync(".env.local")) {
  dotenv.config({ path: ".env.local", override: true });
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
