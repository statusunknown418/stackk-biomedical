import type { z } from "zod/v4";
import { createId } from "@paralleldrive/cuid2";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

import { organizations, teams } from "../authentication";

export interface RiskCriteria {
  riskLevel?: "low" | "medium" | "high";
  criteria: { name: string; value: number | string }[];
  notes?: { description: string }[];
}

export const equipmentTypes = sqliteTable("equipment_type", (t) => ({
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => `eq_type_${createId()}`),
  name: t.text("name").notNull(),
  logo: t.text("logo"),
  description: t.text("description"),
  riskCriteria: t.text("risk_criteria", { mode: "json" }).$type<RiskCriteria>(),
  upssId: t
    .text("upss_id")
    .notNull()
    .references(() => teams.id, { onDelete: "restrict" }),
  organizationId: t
    .text("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  createdAt: t
    .integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: t.integer("updated_at", { mode: "timestamp" }).$onUpdateFn(() => new Date()),
  deletedAt: t.integer("deleted_at", { mode: "timestamp" }),
}));

export const EquipmentTypeSchema = createInsertSchema(equipmentTypes);

export type EquipmentType = z.infer<typeof EquipmentTypeSchema>;
