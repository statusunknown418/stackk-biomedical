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
    name: t.text("name"),
    serialNumber: t.text("serial_number").notNull().unique(),
    patrimonialRegistry: t.text("patrimonial_registry"),
    origin: t.text("origin"),
    logo: t.text("logo"),
    specificType: t.text("specific_type"),
    brand: t.text("brand").notNull(),
    model: t.text("model").notNull(),
    acquisitionDate: t.integer("acquisition_date", { mode: "timestamp" }),
    acquisitionCostCents: t.integer("acquisition_cost_cents"),
    warrantyEndDate: t.integer("warranty_end_date", { mode: "timestamp" }),
    status: t.text("status").notNull().default("idle"),
    location: t.text("location"),
    providerId: t
      .text("provider_id")
      .notNull()
      .references(() => equipmentProviders.id, { onDelete: "restrict" }),
    makerId: t
      .text("maker_id")
      .notNull()
      .references(() => equipmentMaker.id, { onDelete: "restrict" }),
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
    index("equipment_patrimonial_registry_idx").on(t.patrimonialRegistry),
  ],
);

export const equipmentChangesHistory = sqliteTable(
  "equipment_changes_history",
  (t) => ({
    id: t.integer("id").primaryKey({ autoIncrement: true }),
    equipmentId: t
      .text("equipment_id")
      .notNull()
      .references(() => equipment.id, { onDelete: "cascade" }),
    change: t.text("change").notNull(),
    cost: t.integer("cost"),
    actor: t.text("actor").notNull(),
    reason: t.text("reason"),
    assignee: t.text("assignee"),
    severity: t.text("severity").notNull().default("info"),
    modality: t.text(),
    recordedAt: t
      .integer("recorded_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  }),
  (t) => [index("equipment_change_equipment_idx").on(t.equipmentId)],
);

export const equipmentProviders = sqliteTable(
  "equipment_providers",
  (t) => ({
    id: t.integer("id").primaryKey({ autoIncrement: true }),
    name: t.text("provider").notNull(),
    phone: t.text("phone"),
    email: t.text("email"),
    createdAt: t
      .integer("recorded_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  }),
  (t) => [index("equipment_providers_name_idx").on(t.name)],
);

export const equipmentMaker = sqliteTable(
  "equipment_maker",
  (t) => ({
    id: t.integer("id").primaryKey({ autoIncrement: true }),
    name: t.text("name").notNull(),
    phone: t.text("phone"),
    email: t.text("email"),
    createdAt: t
      .integer("recorded_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  }),
  (t) => [index("equipment_maker_name_idx").on(t.name)],
);
