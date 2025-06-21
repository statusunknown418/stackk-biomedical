import { createId } from "@paralleldrive/cuid2";
import { sqliteTable } from "drizzle-orm/sqlite-core";

import { equipment } from "./equipment";

export const riskAssessment = sqliteTable("risk_assessment", (t) => ({
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => `risk_${createId()}`),
  equipmentId: t
    .text("equipment_id")
    .notNull()
    .unique()
    .references(() => equipment.id, { onDelete: "cascade" }),
  clinicalFunctionScore: t.integer("clinical_function_score").notNull().default(0),
  physicalRiskScore: t.integer("physical_risk_score").notNull().default(0),
  problemPreventionScore: t.integer("problem_prevention_score").notNull().default(0),
  incidentHistoryScore: t.integer("incident_history_score").notNull().default(0),
  regulatoryRequirementScore: t
    .integer("regulatory_requirement_score")
    .notNull()
    .default(0),
  yearsOfUseScore: t.integer("years_of_use_score").notNull().default(0),
  totalScore: t.integer("total_score").notNull().default(0),
  inspectionFrequency: t.text("inspection_frequency").notNull(),
}));
