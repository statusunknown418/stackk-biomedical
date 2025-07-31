import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth;
  }),
  getMembers: protectedProcedure.query(({ ctx }) => {
    return ctx.authApi.listMembers();
  }),
} satisfies TRPCRouterRecord;
