import { google } from "googleapis";

import "@stackk/auth";

import { TRPCError } from "@trpc/server";

import { authEnv } from "@stackk/auth/env";

import type { ContextReturnType } from "../trpc";

export const getGoogleClient = async (ctx: ContextReturnType) => {
  const env = authEnv();

  const userId = ctx.auth?.user.id;

  if (!userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authenticated. Please sign in.",
    });
  }

  const tokens = await ctx.db.query.accounts.findFirst({
    where: (accounts, { eq, and }) =>
      and(eq(accounts.providerId, "google"), eq(accounts.userId, userId)),
    columns: {
      accessToken: true,
      idToken: true,
      refreshToken: true,
      accessTokenExpiresAt: true,
      id: true,
    },
  });

  if (!tokens?.accessToken || !tokens.idToken) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No access token or ID token found. Please sign in again.",
    });
  }

  const googleOauth = new google.auth.OAuth2({
    clientId: env.AUTH_GOOGLE_ID,
    clientSecret: env.AUTH_GOOGLE_SECRET,
    redirectUri: `${
      env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://stackk-biomedical.vercel.app"
    }/api/auth/callback/google`,
  });

  if (tokens.accessTokenExpiresAt && tokens.accessTokenExpiresAt < new Date()) {
    try {
      const data = await ctx.authApi.refreshToken({
        body: {
          providerId: "google",
          userId: userId,
          accountId: tokens.id,
        },
        headers: ctx.headers,
      });

      googleOauth.setCredentials({
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });

      return googleOauth;
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      return googleOauth;
    }
  }

  googleOauth.setCredentials({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
  });

  return googleOauth;
};

export const calendarClient = async (ctx: ContextReturnType) => {
  const googleOauth = await getGoogleClient(ctx);

  return google.calendar({
    version: "v3",
    auth: googleOauth,
  });
};
