import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

import type { EncodableConcept } from "./fhir-common";
import { encounters } from "./encounter";
import { baseFields } from "./fhir-common";
import { patients } from "./patient";

export interface ConditionSeverity {
  coding: EncodableConcept[];
}

export interface ConditionEvidence {
  code?: { coding: EncodableConcept[] }[];
  detail?: string[];
}

export const conditions = sqliteTable(
  "conditions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => `condition_${createId()}`),
    patientId: text("patient_id")
      .notNull()
      .references(() => patients.id),
    encounterId: text("encounter_id").references(() => encounters.id),
    severity: text("severity", { mode: "json" }).$type<ConditionSeverity>(),
    evidence: text("evidence", { mode: "json" }).$type<ConditionEvidence[]>(),
    code: text("code", { mode: "json" }).$type<EncodableConcept>().notNull(),
    ...baseFields,
  },
  (table) => [
    index("condition_code_idx").on(table.code),
    index("condition_patient_idx").on(table.patientId),
  ],
);
