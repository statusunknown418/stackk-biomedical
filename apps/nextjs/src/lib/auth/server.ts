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

/**
 * TODO: update this once we're ready to deploy
 */
// const productionUrl = `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;

const productionUrl =
  env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;

export const auth = initAuth({ baseUrl, productionUrl });

export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

export const getActiveMember = async () => {
  return auth.api.getActiveMember({ headers: await headers() });
};

export const getCachedSpaces = cache(async () => {
  return auth.api.listOrganizations({ headers: await headers() });
});

export const signOut = async () => auth.api.signOut({ headers: await headers() });
