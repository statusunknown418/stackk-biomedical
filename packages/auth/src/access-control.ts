import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  ownerAc,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  equipments: ["create", "update", "delete"],
} as const;

export const appAc = createAccessControl(statement);

const owner = appAc.newRole({
  equipments: ["create", "update", "delete"],
  ...ownerAc.statements,
});

const admin = appAc.newRole({
  equipments: ["create", "update"],
  ...adminAc.statements,
});

const member = appAc.newRole({
  equipments: ["update"],
  ...adminAc.statements,
});

export const appRoles = {
  admin,
  member,
  owner,
};
