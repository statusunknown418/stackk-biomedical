import type { BetterAuthOptions } from "better-auth";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oAuthProxy, organization } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { uniformIntDistribution, xoroshiro128plus } from "pure-rand";

import { db } from "@stackk/db/client";

import { authEnv } from "../env";
import { appAc, appRoles } from "./access-control";

export function initAuth(options: { baseUrl: string; productionUrl: string }) {
  const env = authEnv();

  const config = {
    database: drizzleAdapter(db, {
      provider: "sqlite",
      usePlural: true,
    }),
    appName: "Stackk Biomedical",
    advanced: {
      database: {
        generateId: false,
      },
    },
    baseURL: options.baseUrl,
    secret: env.AUTH_SECRET,
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 60 * 60 * 24 * 30,
      },
      updateAge: 60 * 60 * 24 * 15,
    },
    user: {
      additionalFields: {
        username: {
          type: "string",
          required: true,
          unique: true,
        },
      },
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            const baseUsername = user.email.split("@")[0]?.toLowerCase().trim();
            const randDistribution = xoroshiro128plus(777);
            const [randNumber] = uniformIntDistribution(1, 10_000, randDistribution);

            return new Promise((resolve) => {
              resolve({
                data: {
                  ...user,
                  username: `${baseUsername}#${randNumber.toString().padStart(4, "0")}`,
                },
              });
            });
          },
        },
      },
    },
    plugins: [
      oAuthProxy({
        /**
         * Auto-inference blocked by https://github.com/better-auth/better-auth/pull/2891
         */
        currentURL: options.baseUrl,
        productionURL: options.productionUrl,
      }),
      expo(),
      passkey(),
      organization({
        ac: appAc,
        roles: appRoles,
        teams: {
          enabled: true,
          maximumTeams() {
            return 20;
          },
        },
      }),
    ],
    socialProviders: {
      google: {
        clientId: env.AUTH_GOOGLE_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
        redirectURI: `${options.productionUrl}/api/auth/callback/google`,
      },
    },
    logger: {
      disabled: env.NODE_ENV === "development",
      level: "debug",
    },
    trustedOrigins: ["expo://"],
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
