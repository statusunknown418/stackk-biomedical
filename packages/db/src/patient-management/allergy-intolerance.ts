import { createId } from "@paralleldrive/cuid2";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import type { EncodableConcept, Meta } from "./fhir-common";
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
  clinicalStatus: text("clinical_status", { mode: "json" }).$type<EncodableConcept>(),
  verificationStatus: text("verification_status", {
    mode: "json",
  }).$type<EncodableConcept>(),
  code: text("code", { mode: "json" }).$type<EncodableConcept>().notNull(),
  reaction: text("reaction", { mode: "json" }).$type<AllergyReaction[]>(),
  meta: text("meta", { mode: "json" }).$type<Meta>(),
  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at")
    .notNull()
    .$defaultFn(() => Date.now()),
});
