import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import type { EncodableConcept, Meta } from "./fhir-common";
import { encounters } from "./encounter";
import { patients } from "./patient";

export interface Performer {
  reference: string;
}

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
    code: t.blob("code", { mode: "json" }).$type<EncodableConcept>().notNull(),
    subject: t
      .text("subject")
      .notNull()
      .references(() => patients.id),
    performed: t.integer("performed", { mode: "timestamp" }).notNull(),
    performer: t.blob("performer", { mode: "json" }).$type<Performer[]>().notNull(),
    encounterId: t.text("encounter_id").references(() => encounters.id),
    meta: t.blob("meta", { mode: "json" }).$type<Meta>().notNull(),
  }),
  (t) => [
    index("procedure_subject_idx").on(t.subject),
    index("procedure_code_idx").on(t.code),
  ],
);
