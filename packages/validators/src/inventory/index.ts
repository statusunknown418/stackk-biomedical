import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

import {
  auditEvents,
  equipment,
  equipmentTypes,
  technicalInventories,
} from "@stackk/db/schema";

export const requestMoveEquipmentSchema = z.object({
  equipmentId: z.string(),
  newUpssId: z.string(),
});

export const newEquipmentSchema = createInsertSchema(equipment);
export type NewEquipmentSchema = z.infer<typeof newEquipmentSchema>;

export const newEquipmentTypeSchema = createInsertSchema(equipmentTypes);
export type NewEquipmentTypeSchema = z.infer<typeof newEquipmentSchema>;

export const technicalInventorySchema = createInsertSchema(technicalInventories);
export type TechnicalInventorySchema = z.infer<typeof technicalInventorySchema>;

export const auditEventSchema = createInsertSchema(auditEvents);
export type AuditEventSchema = z.infer<typeof auditEventSchema>;
