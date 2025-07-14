import type { TRPCRouterRecord } from "@trpc/server";
import { google } from "googleapis";

import { getGoogleClient } from "../lib/google-calendar";
import { protectedProcedure } from "../trpc";

export const calendarRouter = {
  newCalendar: protectedProcedure.mutation(async ({ ctx }) => {
    const t1 = performance.now();

    const accessToken = await ctx.authApi.getAccessToken({
      body: { providerId: "google", userId: ctx.auth.user.id },
      headers: ctx.headers,
    });

    const t2 = performance.now();

    const googleOauth = await getGoogleClient(ctx);

    try {
      const { data } = await google.calendar("v3").calendars.insert({
        requestBody: {
          summary: "Stackk Biomedical Events",
          timeZone: "America/New_York",
          description: "A new calendar for my events",
        },
        auth: googleOauth,
      });

      console.log(`[LOG] Time to list user accounts: ${t2 - t1}ms`, data);

      return {
        success: true,
        accessToken,
      };
    } catch (err) {
      return {
        success: false,
        error: err,
      };
    }
  }),
} satisfies TRPCRouterRecord;
