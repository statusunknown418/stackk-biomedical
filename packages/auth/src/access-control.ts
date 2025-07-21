import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  memberAc,
  ownerAc,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  equipmentTypes: ["create", "update", "delete"],
  equipments: ["create", "update", "delete", "parent:update", "parent:validate"],
  clinicalHistory: ["create", "update", "delete"],
} as const;

export const appAc = createAccessControl(statement);

/**
 * ========================= INVENTORY module roles ==============================
 */

/**
 * @borrows **INVENTORY** module
 * @description The owner role has full access to all modules in the application.
 * @description Supposed to be assigned to *managers*, *owners*, *CEOs*
 * @description **LEVEL 1 - OWNER**
 */
const owner = appAc.newRole({
  equipmentTypes: ["create", "update", "delete"],
  equipments: ["create", "update", "delete", "parent:update", "parent:validate"],
  clinicalHistory: ["create", "update", "delete"],
  ...ownerAc.statements,
});

/**
 * @borrows **INVENTORY** module
 * @description The admin role has full access to the inventory module, but limited
 * access to other modules. It can create and update equipment types and equipments,
 * but cannot delete them.
 * @description Supposed to be assigned to *managers*, *supervisors*, *admins*
 * @description **LEVEL 2 - ADMIN**
 */
const admin = appAc.newRole({
  equipmentTypes: ["create", "update"],
  equipments: ["create", "update", "parent:update", "parent:validate"],
  clinicalHistory: ["create", "update"],
  ...adminAc.statements,
});

/**
 * @borrows **INVENTORY** module
 * @description The member role has limited access to the inventory module only
 * @description Supposed to be assigned to *technicians*, *engineers*, *interns*
 * @description **LEVEL 3 - MEMBER**
 */
const member = appAc.newRole({
  equipmentTypes: ["update"],
  equipments: ["update", "parent:update"],
  clinicalHistory: [],
  ...memberAc.statements,
});

/**
 * ========================= FHIR/HL7 module roles ===============================
 */

/**
 * @borrows **FHIR/HL7** module
 * @description The practitioner role has access to clinical history
 * @description Supposed to be assigned to *doctors*, *nurses*, *healthcare
 * professionals*
 */
const practitioner = appAc.newRole({
  clinicalHistory: ["create", "update"],
});

/**
 * @borrows **FHIR/HL7** module
 * @description The patient role has access to their own clinical history
 * @description Supposed to be assigned to *patients*, *users*
 */
const patient = appAc.newRole({
  clinicalHistory: [],
});

export const appRoles = {
  admin,
  member,
  owner,
  practitioner,
  patient,
};
