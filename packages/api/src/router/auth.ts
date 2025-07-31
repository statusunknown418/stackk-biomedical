import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth;
  }),
  getMembers: protectedProcedure.query(({ ctx }) => {
    const activeOrganizationId = ctx.auth.session.activeOrganizationId;

    if (!activeOrganizationId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User does not have an active organization",
      });
    }

    return ctx.db.query.members.findMany({
      where: (t, op) => {
        return op.and(op.eq(t.organizationId, activeOrganizationId));
      },
      with: {
        user: {
          columns: {
            id: true,
            username: true,
            image: true,
            name: true,
          },
        },
      },
    });
  }),
} satisfies TRPCRouterRecord;
