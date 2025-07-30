import { sqliteTable } from "drizzle-orm/sqlite-core";

import { equipment } from "./equipment";

export const equipmentDocuments = sqliteTable("equipment_documents", (t) => ({
  id: t.integer().primaryKey({ autoIncrement: true }),
  name: t.text(),
  url: t.text().notNull(),
  equipmentId: t.text().references(() => equipment.id),
  createdAt: t.integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: t.integer({ mode: "timestamp" }).$onUpdateFn(() => new Date()),
}));
