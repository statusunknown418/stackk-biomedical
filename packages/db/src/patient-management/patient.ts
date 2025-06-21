import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import type {
  Address,
  CommunicationPreference,
  ContactPoint,
  Period,
} from "./fhir-common";
import { organizations, users } from "../authentication";
import { baseFields } from "./fhir-common";
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
    identifier: t
      .blob("identifier", { mode: "json" })
      .$type<PatientIdentifier[]>()
      .notNull(),
    organizationId: t.text("organization_id").references(() => organizations.id),
    userId: t.text("user_id").references(() => users.id),
    name: t.blob("name", { mode: "json" }).$type<HumanName[]>().notNull(),
    gender: t.text("gender").$type<"male" | "female" | "other" | "unknown">(),
    birthDate: t.integer("birth_date", { mode: "timestamp" }),
    deceased: t.integer("deceased", { mode: "boolean" }).default(false),
    contactPoint: t.blob("contact_point", { mode: "json" }).$type<ContactPoint[]>(),
    address: t.blob("address", { mode: "json" }).$type<Address[]>(),
    maritalStatus: t.text("marital_status"),
    communication: t
      .blob("communication", { mode: "json" })
      .$type<CommunicationPreference[]>(),
    generalPractitionerId: t
      .text("general_practitioner_id")
      .references(() => practitioners.id),
    ...baseFields,
  }),
  (t) => [
    index("patient_identifier_idx").on(t.identifier),
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
