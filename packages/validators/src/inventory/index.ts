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

export const newTechnicalInventorySchema = createInsertSchema(technicalInventories);
export type NewTechnicalInventorySchema = z.infer<typeof newTechnicalInventorySchema>;

export const newAuditEventSchema = createInsertSchema(auditEvents);
export type NewAuditEventSchema = z.infer<typeof newAuditEventSchema>;
