import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import type {
  Address,
  CommunicationPreference,
  ContactPoint,
  Meta,
  Period,
} from "./fhir-common";
import { users } from "../authentication";

export interface PractitionerQualification {
  code: string;
  issuer?: string;
  period?: Period;
}

export const practitioners = sqliteTable(
  "practitioners",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `practitioner_${createId()}`),
    identifier: t.text("identifier").notNull(),
    userId: t.text("user_id").references(() => users.id),
    name: t.text("name").notNull(),
    gender: t.text("gender"),
    birthDate: t.integer("birth_date", { mode: "timestamp" }),
    contactPoint: t.text("contact_point", { mode: "json" }).$type<ContactPoint[]>(),
    address: t.text("address", { mode: "json" }).$type<Address[]>(),
    communication: t
      .text("communication", { mode: "json" })
      .$type<CommunicationPreference[]>(),
    qualification: t
      .text("qualification", { mode: "json" })
      .$type<PractitionerQualification[]>(),
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
  (t) => [index("practitioner_user_idx").on(t.userId)],
);
