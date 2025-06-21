import { createId } from "@paralleldrive/cuid2";
import { blob, index, sqliteTable, text } from "drizzle-orm/sqlite-core";

import type { DiagnosisComponent, EncounterLocation, Period } from "./fhir-common";
import { baseFields } from "./fhir-common";
import { patients } from "./patient";
import { practitioners } from "./practitioner";

export const encounterStatus = [
  "planned",
  "arrived",
  "triaged",
  "in-progress",
  "on-leave",
  "finished",
  "cancelled",
] as const;

export type EncounterStatus = (typeof encounterStatus)[number];

// Update encounters table (already has encounterStatus enum)
export const encounters = sqliteTable(
  "encounters",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => `encounter_${createId()}`),
    status: text("status", { enum: encounterStatus }),
    class: text("class").$type<"inpatient" | "outpatient" | "emergency">().notNull(),
    patientId: text("patient_id")
      .notNull()
      .references(() => patients.id),
    practitionerId: text("practitioner_id")
      .notNull()
      .references(() => practitioners.id),
    type: text("type").notNull(),
    serviceType: text("service_type"),
    priority: text("priority"),
    period: blob("period", { mode: "json" }).$type<Period>().notNull(),
    diagnosis: blob("diagnosis", { mode: "json" }).$type<DiagnosisComponent[]>(),
    location: blob("location", { mode: "json" }).$type<EncounterLocation[]>(),
    ...baseFields,
  },
  (table) => [
    index("encounter_patient_idx").on(table.patientId),
    index("encounter_practitioner_idx").on(table.practitionerId),
  ],
);
