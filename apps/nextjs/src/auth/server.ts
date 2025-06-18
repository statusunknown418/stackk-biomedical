import "server-only";

import { cache } from "react";
import { headers } from "next/headers";

import { initAuth } from "@stackk/auth";

import { env } from "~/env";

const baseUrl =
  env.VERCEL_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_URL}`
      : "http://localhost:3000";

const productionUrl = `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;

export const auth = initAuth({ baseUrl, productionUrl });

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);
