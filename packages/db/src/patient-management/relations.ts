import { relations } from "drizzle-orm";

import { users } from "../authentication";
import { auditEvents } from "./audit-event";
import { conditions } from "./condition";
import { encounters } from "./encounter";
import { observations } from "./observation";
import { patients, patientsToPractitioners } from "./patient";
import { practitioners } from "./practitioner";

export const patientsRelations = relations(patients, ({ one, many }) => ({
  encounters: many(encounters),
  observations: many(observations),
  conditions: many(conditions),
  generalPractitioner: many(patientsToPractitioners),
  user: one(users, {
    fields: [patients.memberId],
    references: [users.id],
  }),
}));

export const patientsToPractitionersRelations = relations(
  patientsToPractitioners,
  ({ one }) => ({
    patient: one(patients, {
      fields: [patientsToPractitioners.patientId],
      references: [patients.id],
    }),
    practitioner: one(practitioners, {
      fields: [patientsToPractitioners.practitionerId],
      references: [practitioners.id],
    }),
  }),
);

export const practitionersRelations = relations(practitioners, ({ one, many }) => ({
  encounters: many(encounters),
  observationsPerformed: many(observations),
  patients: many(patientsToPractitioners),
  user: one(users, {
    fields: [practitioners.memberId],
    references: [users.id],
  }),
}));

export const encountersRelations = relations(encounters, ({ one, many }) => ({
  patient: one(patients, {
    fields: [encounters.patientId],
    references: [patients.id],
  }),
  practitioner: one(practitioners, {
    fields: [encounters.practitionerId],
    references: [practitioners.id],
  }),
  observations: many(observations),
  conditions: many(conditions),
}));

export const observationsRelations = relations(observations, ({ one }) => ({
  patient: one(patients, {
    fields: [observations.patientId],
    references: [patients.id],
  }),
  encounter: one(encounters, {
    fields: [observations.encounterId],
    references: [encounters.id],
  }),
  performer: one(practitioners, {
    fields: [observations.performerId],
    references: [practitioners.id],
  }),
}));

export const conditionsRelations = relations(conditions, ({ one }) => ({
  patient: one(patients, {
    fields: [conditions.patientId],
    references: [patients.id],
  }),
  encounter: one(encounters, {
    fields: [conditions.encounterId],
    references: [encounters.id],
  }),
}));

export const auditEventsRelations = relations(auditEvents, ({ one }) => ({
  agentUser: one(users, {
    fields: [auditEvents.agentUserId],
    references: [users.id],
  }),
  patient: one(patients, {
    fields: [auditEvents.entity],
    references: [patients.id],
  }),
}));
