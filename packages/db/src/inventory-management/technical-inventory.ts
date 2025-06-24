import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import { equipment } from "./equipment";

export interface TechnicalDetails {
  specifications?: { title: string; value: string }[];
  components?: { name: string; value: string; quantity: number }[];
  calibration?: { lastCalibrated: number; intervalMonths: number };
}

export const technicalInventories = sqliteTable(
  "technical_inventories",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `tech_inv_${createId()}`),
    equipmentId: t
      .text("equipment_id")
      .notNull()
      .unique()
      .references(() => equipment.id, { onDelete: "cascade" }),
    voltage: t.text("voltage"),
    power: t.text("power"),
    frequency: t.text("frequency"),
    supplier: t.text("supplier"),
    patrimonialRegister: t.text("patrimonial_register"),
    technicalDetails: t
      .text("technical_details", { mode: "json" })
      .$type<TechnicalDetails>(),
  }),
  (t) => [index("technical_inventory_equipment_idx").on(t.equipmentId)],
);
