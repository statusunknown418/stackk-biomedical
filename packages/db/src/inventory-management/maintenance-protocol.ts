import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import { equipmentTypes } from "./equipment-type";

export const maintenanceProtocol = sqliteTable(
  "maintenance_protocol",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `protocol_${createId()}`),
    equipmentTypeId: t
      .text("equipment_type_id")
      .notNull()
      .references(() => equipmentTypes.id, { onDelete: "restrict" }),
    name: t.text("name").notNull(),
    procedure: t.text("procedure").notNull(),
    frequency: t.text("frequency").notNull(),
  }),
  (t) => [index("maintenance_protocol_type_idx").on(t.equipmentTypeId)],
);
