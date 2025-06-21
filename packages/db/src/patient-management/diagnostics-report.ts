import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import type { EncodableConcept, Meta, Performer } from "./fhir-common";
import { patients } from "./patient";

export interface ResultReference {
  reference: string;
}

export const diagnosticReportStatus = [
  "registered",
  "preliminary",
  "final",
  "amended",
  "corrected",
  "appended",
  "cancelled",
  "entered-in-error",
] as const;
export type DiagnosticReportStatus = (typeof diagnosticReportStatus)[number];

export const diagnosticReports = sqliteTable(
  "diagnostic_reports",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `report_${createId()}`),
    status: t.text("status", { enum: diagnosticReportStatus }).notNull(),
    code: t.text("code", { mode: "json" }).$type<EncodableConcept>().notNull(),
    patientId: t
      .text("patient_id")
      .notNull()
      .references(() => patients.id),
    effectiveDateTime: t.integer("effective_date_time", { mode: "timestamp" }).notNull(),
    issued: t.integer("issued", { mode: "timestamp" }).notNull(),
    performer: t.text("performer", { mode: "json" }).$type<Performer[]>(),
    result: t.text("result", { mode: "json" }).$type<ResultReference[]>(),
    meta: t.text("meta", { mode: "json" }).$type<Meta>(),
    createdAt: t
      .integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date()),
    updatedAt: t
      .integer("updated_at", { mode: "timestamp" })
      .$defaultFn(() => new Date()),
  }),
  (t) => [index("diagnostic_report_patient_idx").on(t.patientId)],
);
