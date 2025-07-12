import { createInsertSchema } from "drizzle-zod";

import { patients } from "@stackk/db/schema";

export const newPatientSchema = createInsertSchema(patients);
