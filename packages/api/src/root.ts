import { authRouter } from "./router/auth";
import { equipmentMutationsRouter } from "./router/equipments/mutations";
import { equipmentsQueriesRouter } from "./router/equipments/queries";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  equipments: {
    queries: equipmentsQueriesRouter,
    mutations: equipmentMutationsRouter,
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
