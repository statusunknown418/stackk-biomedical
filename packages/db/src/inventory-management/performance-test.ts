import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import { equipment } from "./equipment";
import { maintenanceRecord } from "./maintenance-record";

export const performanceTest = sqliteTable(
  "performance_test",
  (t) => ({
    id: t
      .text()
      .primaryKey()
      .$defaultFn(() => `perf_${createId()}`),
    equipmentId: t
      .text()
      .notNull()
      .references(() => equipment.id, { onDelete: "cascade" }),
    maintenanceRecordId: t
      .text()
      .references(() => maintenanceRecord.id, { onDelete: "cascade" }),
    date: t.integer("date", { mode: "timestamp" }).notNull(),
    parameters: t.text("parameters", { mode: "json" }),
    result: t.text().notNull(),
  }),
  (t) => [
    index("performance_test_equipment_idx").on(t.equipmentId),
    index("performance_test_maintenance_idx").on(t.maintenanceRecordId),
  ],
);
