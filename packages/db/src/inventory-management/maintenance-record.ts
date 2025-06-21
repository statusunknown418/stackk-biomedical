import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import { users } from "../authentication";
import { equipment } from "./equipment";
import { maintenanceProtocol } from "./maintenance-protocol";

export const maintenanceRecord = sqliteTable(
  "maintenance_record",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `maint_${createId()}`),
    equipmentId: t
      .text("equipment_id")
      .notNull()
      .references(() => equipment.id, { onDelete: "cascade" }),
    protocolId: t
      .text("protocol_id")
      .references(() => maintenanceProtocol.id, { onDelete: "restrict" }),
    userId: t
      .text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    date: t.integer("date", { mode: "timestamp" }).notNull(),
    type: t.text("type").notNull(),
    outcome: t.text("outcome"),
    cost: t.real("cost"),
    duration: t.integer("duration"),
  }),
  (t) => [
    index("maintenance_record_equipment_idx").on(t.equipmentId),
    index("maintenance_record_protocol_idx").on(t.protocolId),
    index("maintenance_record_users_idx").on(t.userId),
  ],
);
