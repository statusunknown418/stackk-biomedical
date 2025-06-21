import { createId } from "@paralleldrive/cuid2";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import type { DiagnosisComponent, EncounterLocation, Meta, Period } from "./fhir-common";
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
    period: text("period", { mode: "json" }).$type<Period>().notNull(),
    diagnosis: text("diagnosis", { mode: "json" }).$type<DiagnosisComponent[]>(),
    location: text("location", { mode: "json" }).$type<EncounterLocation[]>(),
    meta: text("meta", { mode: "json" }).$type<Meta>(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("encounter_patient_idx").on(table.patientId),
    index("encounter_practitioner_idx").on(table.practitionerId),
  ],
);
