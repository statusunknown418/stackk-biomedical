import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import { equipment } from "./equipment";
import { maintenanceRecord } from "./maintenance-record";

export const safetyTest = sqliteTable(
  "safety_test",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `safety_${createId()}`),
    equipmentId: t
      .text("equipment_id")
      .notNull()
      .references(() => equipment.id, { onDelete: "cascade" }),
    maintenanceRecordId: t
      .text("maintenance_record_id")
      .references(() => maintenanceRecord.id, { onDelete: "cascade" }),
    date: t.integer("date", { mode: "timestamp" }).notNull(),
    groundResistance: t.real("ground_resistance"),
    chassisLeakage: t.real("chassis_leakage"),
    patientLeakage: t.real("patient_leakage"),
    insulationTest: t.real("insulation_test"),
    result: t.text("result").notNull(),
  }),
  (t) => [
    index("safety_test_equipment_idx").on(t.equipmentId),
    index("safety_test_maintenance_idx").on(t.maintenanceRecordId),
  ],
);
