import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import type { EncodableConcept, Meta } from "./fhir-common";
import { patients } from "./patient";

export interface Performer {
  reference: string;
  display?: string;
}

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
    code: t.blob("code", { mode: "json" }).$type<EncodableConcept>().notNull(),
    patientId: t
      .text("patient_id")
      .notNull()
      .references(() => patients.id),
    effectiveDateTime: t.integer("effective_date_time", { mode: "timestamp" }).notNull(),
    issued: t.integer("issued", { mode: "timestamp" }).notNull(),
    performer: t.blob("performer", { mode: "json" }).$type<Performer[]>().notNull(),
    result: t.blob("result", { mode: "json" }).$type<ResultReference[]>().notNull(),
    meta: t.blob("meta", { mode: "json" }).$type<Meta>(),
    createdAt: t
      .integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date()),
  }),
  (t) => [index("diagnostic_report_patient_idx").on(t.patientId)],
);
