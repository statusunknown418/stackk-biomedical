import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import type {
  Address,
  CommunicationPreference,
  ContactPoint,
  Meta,
  Period,
} from "./fhir-common";
import { members } from "../authentication";

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
    memberId: t.text("user_id").references(() => members.userId),
    organizationId: t
      .text("organization_id")
      .references(() => members.organizationId, { onDelete: "cascade" }),
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
  (t) => [
    index("practitioner_user_idx").on(t.memberId),
    index("practitioner_org_idx").on(t.organizationId),
  ],
);
