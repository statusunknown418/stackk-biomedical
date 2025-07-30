import { relations } from "drizzle-orm";

import { teams, users } from "../authentication";
import {
  equipment,
  equipmentChangesHistory,
  equipmentMaker,
  equipmentProviders,
} from "./equipment";
import { equipmentLifeSheets } from "./equipment-life-sheet";
import { equipmentTypes } from "./equipment-type";
import { maintenanceProtocol } from "./maintenance-protocol";
import { maintenanceRecord } from "./maintenance-record";
import { performanceTest } from "./performance-test";
import { riskAssessment } from "./risk-assessment";
import { safetyTest } from "./safety-test";
import { technicalInventories } from "./technical-inventory";

export const equipmentTypeRelations = relations(equipmentTypes, ({ many, one }) => ({
  equipment: many(equipment),
  maintenanceProtocols: many(maintenanceProtocol),
  upss: one(teams, {
    fields: [equipmentTypes.upssId],
    references: [teams.id],
  }),
}));

export const equipmentRelations = relations(equipment, ({ one, many }) => ({
  upss: one(teams, {
    fields: [equipment.upssId],
    references: [teams.id],
  }),
  equipmentType: one(equipmentTypes, {
    fields: [equipment.equipmentTypeId],
    references: [equipmentTypes.id],
  }),
  technicalInventory: one(technicalInventories),
  equipmentLifeSheet: one(equipmentLifeSheets),
  maintenanceRecords: many(maintenanceRecord),
  safetyTests: many(safetyTest),
  performanceTests: many(performanceTest),
  riskAssessment: one(riskAssessment),
  changesHistory: many(equipmentChangesHistory),
  maker: one(equipmentMaker, {
    fields: [equipment.makerId],
    references: [equipmentMaker.id],
  }),
  provider: one(equipmentProviders, {
    fields: [equipment.providerId],
    references: [equipmentProviders.id],
  }),
}));

export const technicalInventoryRelations = relations(technicalInventories, ({ one }) => ({
  equipment: one(equipment, {
    fields: [technicalInventories.equipmentId],
    references: [equipment.id],
  }),
}));

export const equipmentLifeSheetRelations = relations(equipmentLifeSheets, ({ one }) => ({
  equipment: one(equipment, {
    fields: [equipmentLifeSheets.equipmentId],
    references: [equipment.id],
  }),
}));

export const equipmentChangesHistoryRelations = relations(
  equipmentChangesHistory,
  ({ one }) => ({
    equipment: one(equipment, {
      fields: [equipmentChangesHistory.equipmentId],
      references: [equipment.id],
    }),
  }),
);

export const maintenanceProtocolRelations = relations(
  maintenanceProtocol,
  ({ one, many }) => ({
    equipmentType: one(equipmentTypes, {
      fields: [maintenanceProtocol.equipmentTypeId],
      references: [equipmentTypes.id],
    }),
    maintenanceRecords: many(maintenanceRecord),
  }),
);

export const maintenanceRecordRelations = relations(
  maintenanceRecord,
  ({ one, many }) => ({
    equipment: one(equipment, {
      fields: [maintenanceRecord.equipmentId],
      references: [equipment.id],
    }),
    protocol: one(maintenanceProtocol, {
      fields: [maintenanceRecord.protocolId],
      references: [maintenanceProtocol.id],
    }),
    user: one(users, {
      fields: [maintenanceRecord.userId],
      references: [users.id],
    }),
    safetyTests: many(safetyTest),
    performanceTests: many(performanceTest),
  }),
);

export const safetyTestRelations = relations(safetyTest, ({ one }) => ({
  equipment: one(equipment, {
    fields: [safetyTest.equipmentId],
    references: [equipment.id],
  }),
  maintenanceRecord: one(maintenanceRecord, {
    fields: [safetyTest.maintenanceRecordId],
    references: [maintenanceRecord.id],
  }),
}));

export const performanceTestRelations = relations(performanceTest, ({ one }) => ({
  equipment: one(equipment, {
    fields: [performanceTest.equipmentId],
    references: [equipment.id],
  }),
  maintenanceRecord: one(maintenanceRecord, {
    fields: [performanceTest.maintenanceRecordId],
    references: [maintenanceRecord.id],
  }),
}));

export const riskAssessmentRelations = relations(riskAssessment, ({ one }) => ({
  equipment: one(equipment, {
    fields: [riskAssessment.equipmentId],
    references: [equipment.id],
  }),
}));
