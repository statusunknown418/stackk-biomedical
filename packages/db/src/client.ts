import { drizzle } from "drizzle-orm/libsql";

import { dbEnv } from "./env";

const env = dbEnv();

export const db = drizzle({
  connection: {
    url: env.TURSO_CONNECTION_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
});
