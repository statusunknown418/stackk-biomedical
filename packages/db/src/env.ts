import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";

export function dbEnv() {
  return createEnv({
    server: {
      TURSO_CONNECTION_URL: z.url().min(1),
      TURSO_AUTH_TOKEN: z.string().min(1),
      NODE_ENV: z.enum(["development", "test", "production"]),
    },
    experimental__runtimeEnv: {},
    skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  });
}
