import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import type { EncodableConcept, Meta } from "./fhir-common";
import { encounters } from "./encounter";
import { patients } from "./patient";
import { practitioners } from "./practitioner";

export interface Interpretation {
  coding: EncodableConcept[];
}

export interface ObservationValue {
  valueType: string;
  value: string | number;
  unit?: string;
  system?: string;
}

export const observationStatus = ["registered", "preliminary", "final"] as const;
export type ObservationStatus = (typeof observationStatus)[number];

export const observations = sqliteTable(
  "observations",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `observation_${createId()}`),
    status: t.text("status", { enum: observationStatus }).notNull(),
    category: t.text("category", { mode: "json" }).$type<EncodableConcept[]>(),
    issued: t.integer("issued", { mode: "timestamp" }).notNull(),
    patientId: t
      .text("patient_id")
      .notNull()
      .references(() => patients.id),
    encounterId: t.text("encounter_id").references(() => encounters.id),
    code: t.text("code", { mode: "json" }).$type<EncodableConcept>().notNull(),
    value: t.text("value", { mode: "json" }).$type<ObservationValue>(),
    effectiveDateTime: t.integer("effective_date_time", { mode: "timestamp" }).notNull(),
    performerId: t.text("performer_id").references(() => practitioners.id),
    interpretation: t.text("interpretation", { mode: "json" }).$type<Interpretation[]>(),
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
    index("observation_patient_idx").on(t.patientId),
    index("observation_code_idx").on(t.code),
    index("observation_date_idx").on(t.effectiveDateTime),
  ],
);
