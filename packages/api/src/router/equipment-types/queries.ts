import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { protectedProcedure } from "../../trpc";

export const eqTypesQueriesRouter = {
  /**
   * @description Get all equipment types for the current organization
   * @description Useful for main dashboard tables
   */
  list: protectedProcedure.query(({ ctx }) => {
    const activeOrganizationId = ctx.auth.session.activeOrganizationId;

    if (!activeOrganizationId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.db.query.equipmentTypes.findFirst({
      where: (t, ops) => {
        return ops.and(
          ops.eq(t.organizationId, activeOrganizationId),
          ops.isNotNull(t.deletedAt),
        );
      },
      columns: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        logo: true,
      },
      with: {
        upss: {
          columns: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
  }),
  /**
   * @description Get a single equipment type by ID or TYPE
   * @description Useful for single equipment type details
   */
  getSingle: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    const activeOrganizationId = ctx.auth.session.activeOrganizationId;

    if (!activeOrganizationId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.db.query.equipmentTypes.findFirst({
      where: (t, ops) => {
        return ops.and(
          ops.eq(t.organizationId, activeOrganizationId),
          ops.eq(t.id, input),
          ops.isNotNull(t.deletedAt),
        );
      },
      with: {
        equipment: {
          columns: {
            id: true,
            logo: true,
            serialNumber: true,
            specificType: true,
            brand: true,
            model: true,
            status: true,
          },
        },
        upss: {
          columns: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
  }),
};
