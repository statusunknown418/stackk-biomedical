import { createId } from "@paralleldrive/cuid2";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const upss = sqliteTable("upss", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => `upss_${createId()}`),
  name: t.text().notNull(),
  code: t.text().notNull(),
  description: t.text(),
  location: t.text(),
}));
