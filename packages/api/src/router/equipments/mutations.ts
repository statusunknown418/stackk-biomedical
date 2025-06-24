import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";

import { auditEvents } from "@stackk/db/schema";
import { requestMoveEquipmentSchema } from "@stackk/validators";

import { protectedProcedure } from "../../trpc";

export const equipmentMutationsRouter = {
  requestMove: protectedProcedure
    .input(requestMoveEquipmentSchema)
    .mutation(async ({ ctx, input }) => {
      const t1 = performance.now();
      const member = await ctx.authApi.getActiveMember();
      const t2 = performance.now();

      console.log(`[LOG] Time to get active member: ${t2 - t1}ms`);

      if (!member?.organizationId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You must be a member of an organization to move equipment",
        });
      }

      return ctx.db.insert(auditEvents).values({
        agentUserId: ctx.auth.user.id,
        action: "equipment:move",
        severity: "information",
        target: input.equipmentId,
        type: {
          system: member.organizationId,
          code: "move_equipment",
          display: "Move Equipment",
        },
      });
    }),
} satisfies TRPCRouterRecord;
