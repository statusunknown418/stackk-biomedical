import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { protectedProcedure } from "../../trpc";

export const equipmentsQueriesRouter = {
  listAll: protectedProcedure.query(({ ctx }) => {
    const activeOrganizationId = ctx.auth.session.activeOrganizationId;

    if (!activeOrganizationId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    /**
     * TODO: Improve performance with caching - https://linear.app/stackkstudios/issue/STK-123/be-integrate-upstashredis-cache
     */
    return ctx.db.query.equipment.findMany({
      where: (t, ops) => ops.eq(t.organizationId, activeOrganizationId),
      limit: 100,
      columns: {
        id: true,
        logo: true,
        serialNumber: true,
        specificType: true,
        brand: true,
        model: true,
        status: true,
      },
      with: {
        upss: {
          columns: {
            id: true,
            code: true,
          },
        },
      },
    });
  }),
  getOnUpss: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    const activeOrganizationId = ctx.auth.session.activeOrganizationId;

    if (!activeOrganizationId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.db.query.equipment.findMany({
      where: (t, ops) => {
        return ops.and(
          ops.eq(t.organizationId, activeOrganizationId),
          ops.eq(t.upssId, input),
        );
      },
      with: {
        equipmentType: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });
  }),
  getDetails: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    const activeOrganizationId = ctx.auth.session.activeOrganizationId;

    if (!activeOrganizationId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.db.query.equipment.findFirst({
      where: (t, ops) => {
        return ops.and(
          ops.eq(t.organizationId, activeOrganizationId),
          ops.eq(t.id, input),
        );
      },
      with: {
        equipmentType: {
          columns: {
            id: true,
            name: true,
          },
        },
        upss: {
          columns: {
            id: true,
            code: true,
            name: true,
          },
        },
      },
    });
  }),
} satisfies TRPCRouterRecord;
