import type { z } from "zod/v4";
import { createId } from "@paralleldrive/cuid2";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

import { equipment } from "./equipment";

export interface EquipmentHistory {
  events: {
    type: string; // TODO: Maybe standardize these types later - https://linear.app/stackkstudios/issue/STK-115
    timestamp: Date;
    description: string;
    userId?: string;
  }[];
}

export const equipmentLifeSheets = sqliteTable("equipment_life_sheets", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => `life_sheet_${createId()}`),
  equipmentId: t
    .text()
    .notNull()
    .unique()
    .references(() => equipment.id, { onDelete: "cascade" }),
  history: t
    .text({ mode: "json" })
    .$type<EquipmentHistory>()
    .notNull()
    .default({ events: [] }),
  createdAt: t
    .integer({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: t.integer({ mode: "timestamp" }).$onUpdateFn(() => new Date()),
}));

export const EquipmentLifeSheetSchema = createInsertSchema(equipmentLifeSheets);
export type EquipmentLifeSheet = z.infer<typeof EquipmentLifeSheetSchema>;
