import { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { teams } from "@stackk/db/schema";
import { defaultTeams, NewSpaceSchema } from "@stackk/validators";

import { protectedProcedure } from "../trpc";

export const spacesRouter = {
  setupSpace: protectedProcedure
    .input(NewSpaceSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.authApi.createOrganization({
        body: {
          ...input,
        },
        headers: ctx.headers,
      });

      if (!result?.id) {
        return { success: false, data: null };
      }

      return {
        success: true,
        data: result,
      };
    }),
  setActive: protectedProcedure
    .input(z.object({ organizationId: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.authApi.setActiveOrganization({
        body: {
          organizationId: input.organizationId,
        },
        headers: ctx.headers,
      });
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.authApi.listOrganizations({ headers: ctx.headers });
  }),
  listTeams: protectedProcedure.query(async ({ ctx }) => {
    console.log({ ctx: ctx.auth });
    return ctx.authApi.listOrganizationTeams({ headers: ctx.headers });
  }),
} satisfies TRPCRouterRecord;
