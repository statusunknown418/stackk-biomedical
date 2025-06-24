import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

import type { EncodableConcept, Meta } from "./fhir-common";
import { users } from "../authentication";

/**
 * @description A concept that may be defined by a terminology service
 **/
export type AuditEventType = Required<EncodableConcept>;

/**
 * @description An actor taking an action on or about a FHIR resource
 * (and in this case also Inventory resources)
 * @param who - The actor
 * @param requestor - Whether the actor is the requestor
 * @param role - The role of the actor
 */
export interface AuditEventAgent {
  who: { reference: string; display?: string };
  requestor: boolean;
  role?: { coding: EncodableConcept[] };
}

export interface AuditEventSource {
  observer: string;
  type?: EncodableConcept;
}

export interface AuditEventEntity {
  what: { reference: string; type?: string };
  type?: EncodableConcept;
  description?: string;
}

export const auditEventSeverities = [
  "emergency",
  "alert",
  "critical",
  "error",
  "notice",
  "information",
  "debug",
] as const;
export type AuditEventSeverity = (typeof auditEventSeverities)[number];

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
    severity: t.text({ enum: auditEventSeverities }).notNull(),
    action: t.text("action").notNull(),
    agentUserId: t.text("agent_user_id").references(() => users.id),
    agent: t.text("agent", { mode: "json" }).$type<AuditEventAgent[]>(),
    source: t.text("source", { mode: "json" }).$type<AuditEventSource>(),
    entity: t.text("entity", { mode: "json" }).$type<AuditEventEntity[]>(),
    meta: t.text("meta", { mode: "json" }).$type<Meta>(),
    target: t.text("target").notNull(),
  }),
  (t) => [
    index("audit_target_idx").on(t.target),
    index("audit_agent_user_idx").on(t.agentUserId),
    index("audit_recorded_idx").on(t.recordedAt),
  ],
);
