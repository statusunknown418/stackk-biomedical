import { createId } from "@paralleldrive/cuid2";
import { blob, sqliteTable, text } from "drizzle-orm/sqlite-core";

import type { EncodableConcept } from "./fhir-common";
import { baseFields } from "./fhir-common";
import { patients } from "./patient";

export interface AllergyReaction {
  manifestation: EncodableConcept[];
  severity?: "mild" | "moderate" | "severe";
}

export const allergyIntolerance = sqliteTable("allergy_intolerance", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => `allergy_${createId()}`),
  patientId: text("patient_id")
    .notNull()
    .references(() => patients.id),
  clinicalStatus: blob("clinical_status", { mode: "json" }).$type<EncodableConcept>(),
  verificationStatus: blob("verification_status", {
    mode: "json",
  }).$type<EncodableConcept>(),
  code: blob("code", { mode: "json" }).$type<EncodableConcept>().notNull(),
  reaction: blob("reaction", { mode: "json" }).$type<AllergyReaction[]>(),
  ...baseFields,
});
