import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import { organizations, teams } from "../authentication";
import { equipmentTypes } from "./equipment-type";

export const equipment = sqliteTable(
  "equipment",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `equip_${createId()}`),
    serialNumber: t.text("serial_number").notNull().unique(),
    brand: t.text("brand").notNull(),
    model: t.text("model").notNull(),
    acquisitionDate: t.integer("acquisition_date", { mode: "timestamp" }),
    acquisitionCostCents: t.integer("acquisition_cost_cents"),
    warrantyEndDate: t.integer("warranty_end_date", { mode: "timestamp" }),
    status: t.text("status").notNull(),
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
  }),
  (t) => [
    index("equipment_upss_idx").on(t.upssId),
    index("equipment_type_idx").on(t.equipmentTypeId),
    index("equipment_serial_idx").on(t.serialNumber),
  ],
);
