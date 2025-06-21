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
    contactPoint: t.blob("contact_point", { mode: "json" }).$type<ContactPoint[]>(),
    address: t.blob("address", { mode: "json" }).$type<Address[]>(),
    communication: t
      .blob("communication", { mode: "json" })
      .$type<CommunicationPreference[]>(),
    qualification: t
      .blob("qualification", { mode: "json" })
      .$type<PractitionerQualification[]>(),
    meta: t.blob("meta", { mode: "json" }).$type<Meta>().notNull(),
  }),
  (t) => [index("practitioner_user_idx").on(t.userId)],
);
