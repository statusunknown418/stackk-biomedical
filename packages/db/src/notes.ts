import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import { users } from "./authentication";

export const notes = sqliteTable(
  "notes",
  (t) => ({
    id: t
      .text()
      .primaryKey()
      .$defaultFn(() => `note_${createId()}`),
    text: t.text("text").notNull(),
    authorId: t
      .text("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    parentFieldId: t.text(),
    createdAt: t
      .integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: t
      .integer("updated_at", { mode: "timestamp" })
      .$onUpdateFn(() => new Date()),
  }),
  (t) => [
    index("notes_author_idx").on(t.authorId),
    index("notes_parent_idx").on(t.parentFieldId),
  ],
);
