import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import type { EncodableConcept, Meta, Performer } from "./fhir-common";
import { encounters } from "./encounter";
import { patients } from "./patient";

export const procedureStatus = ["preparation", "in-progress", "completed"] as const;
export type ProcedureStatus = (typeof procedureStatus)[number];

export const procedures = sqliteTable(
  "procedures",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `procedure_${createId()}`),
    status: t.text("status", { enum: procedureStatus }).notNull(),
    code: t.text("code", { mode: "json" }).$type<EncodableConcept>(),
    subject: t
      .text("subject")
      .notNull()
      .references(() => patients.id),
    performed: t.integer("performed", { mode: "timestamp" }).notNull(),
    performers: t.text("performer", { mode: "json" }).$type<Performer[]>(),
    encounterId: t.text("encounter_id").references(() => encounters.id),
    meta: t.text("meta", { mode: "json" }).$type<Meta>(),
    createdAt: t
      .integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: t
      .integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  }),
  (t) => [
    index("procedure_subject_idx").on(t.subject),
    index("procedure_code_idx").on(t.code),
  ],
);
