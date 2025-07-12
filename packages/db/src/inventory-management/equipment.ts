import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import { organizations, teams } from "../authentication";
import { equipmentTypes } from "./equipment-type";

/**
 * @description Equipments are organized based on they `equipmentType` but they can also have a `specificType`
 * for example: `ventilator` -> `specific: pulmonary`
 * @param deletedAt - Soft delete timestamp
 */
export const equipment = sqliteTable(
  "equipment",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `equip_${createId()}`),
    serialNumber: t.text("serial_number").notNull().unique(),
    logo: t.text("logo"),
    specificType: t.text("specific_type"),
    brand: t.text("brand").notNull(),
    model: t.text("model").notNull(),
    acquisitionDate: t.integer("acquisition_date", { mode: "timestamp" }),
    acquisitionCostCents: t.integer("acquisition_cost_cents"),
    warrantyEndDate: t.integer("warranty_end_date", { mode: "timestamp" }),
    status: t.text("status").notNull().default("idle"),
    location: t.text("location"),
    organizationId: t
      .text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    upssId: t
      .text("upss_id")
      .notNull()
      .references(() => teams.id, { onDelete: "restrict" }),
    equipmentTypeId: t
      .text("equipment_type_id")
      .notNull()
      .references(() => equipmentTypes.id, { onDelete: "restrict" }),
    createdAt: t
      .integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date()),
    updatedAt: t
      .integer("updated_at", { mode: "timestamp" })
      .$onUpdateFn(() => new Date()),
    deletedAt: t.integer("deleted_at", { mode: "timestamp" }),
  }),
  (t) => [
    index("equipment_upss_idx").on(t.upssId),
    index("equipment_type_idx").on(t.equipmentTypeId),
  ],
);

export const equipmentSeverity = ["info", "warning", "error", "critical"];

export const equipmentChangesHistory = sqliteTable(
  "equipment_changes_history",
  (t) => ({
    id: t.integer("id").primaryKey({ autoIncrement: true }),
    equipmentId: t
      .text("equipment_id")
      .notNull()
      .references(() => equipment.id, { onDelete: "cascade" }),
    change: t.text("change").notNull(),
    actor: t.text("actor").notNull(),
    reason: t.text("reason"),
    severity: t.text("severity").notNull().default("info"),
    recordedAt: t
      .integer("recorded_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  }),
  (t) => [index("equipment_change_equipment_idx").on(t.equipmentId)],
);
