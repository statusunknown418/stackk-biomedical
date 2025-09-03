import { authRouter } from "./router/auth";
import { calendarRouter } from "./router/calendar";
import { eqTypesQueriesRouter } from "./router/equipment-types/queries";
import { equipmentMutationsRouter } from "./router/equipments/mutations";
import { equipmentsQueriesRouter } from "./router/equipments/queries";
import { spacesRouter } from "./router/spaces";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  calendar: calendarRouter,
  eqTypes: {
    queries: eqTypesQueriesRouter,
  },
  equipments: {
    queries: equipmentsQueriesRouter,
    mutations: equipmentMutationsRouter,
  },
  spaces: spacesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
