import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  ownerAc,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  equipmentTypes: ["create", "update", "delete"],
  equipments: ["create", "update", "delete", "parent:update", "parent:validate"],
} as const;

export const appAc = createAccessControl(statement);

const owner = appAc.newRole({
  equipmentTypes: ["create", "update", "delete"],
  equipments: ["create", "update", "delete", "parent:update", "parent:validate"],
  ...ownerAc.statements,
});

const admin = appAc.newRole({
  equipmentTypes: ["create", "update"],
  equipments: ["create", "update", "parent:update", "parent:validate"],
  ...adminAc.statements,
});

const member = appAc.newRole({
  equipmentTypes: ["update"],
  equipments: ["update", "parent:update"],
  ...adminAc.statements,
});

export const appRoles = {
  admin,
  member,
  owner,
};
