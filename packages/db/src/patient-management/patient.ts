import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import type {
  Address,
  CommunicationPreference,
  ContactPoint,
  Meta,
  Period,
} from "./fhir-common";
import { organizations, users } from "../authentication";
import { practitioners } from "./practitioner";

export interface PatientIdentifier {
  system: string;
  value: string;
  period?: Period;
}

export interface HumanName {
  use?: "usual" | "official" | "temp" | "nickname" | "anonymous" | "old" | "maiden";
  family: string;
  given: string[];
}

export const patients = sqliteTable(
  "patients",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `patient_${createId()}`),
    identifier: t.text().unique(),
    organizationId: t.text("organization_id").references(() => organizations.id),
    userId: t.text("user_id").references(() => users.id),
    name: t.text("name", { mode: "json" }).$type<HumanName[]>().notNull(),
    gender: t.text("gender").$type<"male" | "female" | "other" | "unknown">(),
    birthDate: t.integer("birth_date", { mode: "timestamp" }),
    deceased: t.integer("deceased", { mode: "boolean" }).default(false),
    contactPoint: t.text("contact_point", { mode: "json" }).$type<ContactPoint[]>(),
    address: t.text("address", { mode: "json" }).$type<Address[]>(),
    maritalStatus: t.text("marital_status"),
    communication: t
      .text("communication", { mode: "json" })
      .$type<CommunicationPreference[]>(),
    generalPractitionerId: t
      .text("general_practitioner_id")
      .references(() => practitioners.id),
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
    index("patient_name_idx").on(t.name),
    index("patient_org_idx").on(t.organizationId),
    index("patient_user_idx").on(t.userId),
  ],
);

export const patientsToPractitioners = sqliteTable(
  "patients_to_practitioners",
  (t) => ({
    patientId: t
      .text("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    practitionerId: t
      .text("practitioner_id")
      .notNull()
      .references(() => practitioners.id, { onDelete: "cascade" }),
  }),
  (t) => [index("patients_to_practitioners_idx").on(t.patientId, t.practitionerId)],
);
