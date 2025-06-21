import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import type { EncodableConcept, Meta } from "./fhir-common";
import { users } from "../authentication";

export interface AuditEventType {
  system: string;
  code: string;
  display: string;
}

export interface AuditEventAgent {
  who: { reference: string; display?: string };
  requestor: boolean;
  role?: { coding: EncodableConcept[] }[];
}

export interface AuditEventSource {
  observer: string;
  type?: EncodableConcept[];
}

export interface AuditEventEntity {
  what: { reference: string; type?: string };
  type?: EncodableConcept;
  description?: string;
}

export const auditEvents = sqliteTable(
  "audit_events",
  (t) => ({
    id: t
      .text("id")
      .primaryKey()
      .$defaultFn(() => `audit_event_${createId()}`),
    recordedAt: t
      .integer("recorded", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    type: t.text("type", { mode: "json" }).$type<AuditEventType>().notNull(),
    action: t.text("action").notNull(),
    agentUserId: t.text("agent_user_id").references(() => users.id),
    agent: t.text("agent", { mode: "json" }).$type<AuditEventAgent[]>().notNull(),
    source: t.text("source", { mode: "json" }).$type<AuditEventSource>().notNull(),
    entity: t.text("entity", { mode: "json" }).$type<AuditEventEntity[]>(),
    meta: t.text("meta", { mode: "json" }).$type<Meta>(),
  }),
  (t) => [
    index("audit_recorded_idx").on(t.recordedAt),
    index("audit_type_idx").on(t.type),
    index("audit_agent_user_idx").on(t.agentUserId),
  ],
);
