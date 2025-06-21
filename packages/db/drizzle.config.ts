import type { Config } from "drizzle-kit";

if (!process.env.TURSO_CONNECTION_URL) {
  throw new Error("Missing TURSO_URL");
}

if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error("Missing TURSO_AUTH_TOKEN");
}

export default {
  schema: "./src/schema.ts",
  dialect: "turso",
  casing: "snake_case",
  breakpoints: true,
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
