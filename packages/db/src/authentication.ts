import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { equipment, equipmentTypes } from "./inventory-management";

export const users = sqliteTable("users", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => `user_${createId()}`),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  username: t.text().notNull().unique(),
  emailVerified: t.integer({ mode: "boolean" }).notNull(),
  image: t.text(),
  createdAt: t.integer({ mode: "timestamp" }).notNull(),
  updatedAt: t.integer({ mode: "timestamp" }).notNull(),
}));

export const sessions = sqliteTable(
  "sessions",
  (t) => ({
    id: t
      .text()
      .primaryKey()
      .$defaultFn(() => `session_${createId()}`),
    expiresAt: t.integer({ mode: "timestamp" }).notNull(),
    activeOrganizationId: t.text(),
    activeTeamId: t.text(),
    token: t.text().notNull().unique(),
    createdAt: t.integer({ mode: "timestamp" }).notNull(),
    updatedAt: t.integer({ mode: "timestamp" }).notNull(),
    ipAddress: t.text(),
    userAgent: t.text(),
    userId: t
      .text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  }),
  (t) => [index("token_idx").on(t.token), index("user_id_idx").on(t.userId)],
);

export const accounts = sqliteTable(
  "accounts",
  (t) => ({
    id: t
      .text()
      .primaryKey()
      .$defaultFn(() => `account_${createId()}`),
    accountId: t.text().notNull(),
    providerId: t.text().notNull(),
    userId: t
      .text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: t.text(),
    refreshToken: t.text(),
    idToken: t.text(),
    accessTokenExpiresAt: t.integer({ mode: "timestamp" }),
    refreshTokenExpiresAt: t.integer({ mode: "timestamp" }),
    scope: t.text(),
    password: t.text(),
    createdAt: t.integer({ mode: "timestamp" }).notNull(),
    updatedAt: t.integer({ mode: "timestamp" }).notNull(),
  }),
  (t) => [index("accountId_idx").on(t.accountId), index("userId_idx").on(t.userId)],
);

export const verifications = sqliteTable(
  "verifications",
  (t) => ({
    id: t
      .text()
      .primaryKey()
      .$defaultFn(() => `verification_${createId()}`),
    identifier: t.text().notNull(),
    value: t.text().notNull(),
    expiresAt: t.integer({ mode: "timestamp" }).notNull(),
    createdAt: t.integer({ mode: "timestamp" }),
    updatedAt: t.integer({ mode: "timestamp" }),
  }),
  (t) => [index("verification_identifier_idx").on(t.identifier)],
);

export const organizations = sqliteTable("organizations", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => `org_${createId()}`),
  name: t.text().notNull(),
  slug: t.text().unique(),
  logo: t.text(),
  createdAt: t.integer({ mode: "timestamp" }).notNull(),
  metadata: t.text("metadata"),
}));

export const members = sqliteTable(
  "members",
  (t) => ({
    id: t
      .text()
      .primaryKey()
      .$defaultFn(() => `member_${createId()}`),
    organizationId: t
      .text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: t
      .text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: t.text("role").default("member").notNull(),
    teamId: t.text("team_id").references(() => teams.id, { onDelete: "set null" }),
    createdAt: t.integer("created_at", { mode: "timestamp" }).notNull(),
  }),
  (t) => [
    index("relation_org_id_idx").on(t.organizationId),
    index("relation_user_id_idx").on(t.userId),
    index("relation_team_id_idx").on(t.teamId),
  ],
);

export const membersRelations = relations(members, ({ one }) => ({
  organization: one(organizations, {
    fields: [members.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [members.userId],
    references: [users.id],
  }),
}));

export const teams = sqliteTable(
  "teams",
  (t) => ({
    id: t
      .text()
      .primaryKey()
      .$defaultFn(() => `team_${createId()}`),
    name: t.text().notNull(),
    code: t.text().unique(),
    description: t.text(),
    location: t.text(),
    organizationId: t
      .text()
      .notNull()
      .references(() => organizations.id, { onDelete: "restrict" }),
    createdAt: t
      .integer({ mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: t
      .integer({ mode: "timestamp" })
      .notNull()
      .$onUpdateFn(() => new Date()),
  }),
  (t) => [index("team_organization_id_idx").on(t.organizationId)],
);

export const teamMembers = sqliteTable(
  "team_members",
  (t) => ({
    id: t
      .text()
      .primaryKey()
      .$defaultFn(() => `team_member_${createId()}`),
    teamId: t
      .text()
      .notNull()
      .references(() => teams.id, { onDelete: "set null" }),
    userId: t
      .text()
      .notNull()
      .references(() => users.id, { onDelete: "set null" }),
    createdAt: t
      .integer({ mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  }),
  (t) => [
    index("team_member_team_id_idx").on(t.teamId),
    index("team_member_user_id_idx").on(t.userId),
  ],
);

export const invitations = sqliteTable(
  "invitations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => `invite_${createId()}`),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: text("role"),
    status: text("status").default("pending").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    teamId: text("team_id"),
    inviterId: text("inviter_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => [
    index("organization_id_idx").on(t.organizationId),
    index("invite_email_idx").on(t.email),
  ],
);

export const passKeys = sqliteTable(
  "passkeys",
  (t) => ({
    id: t
      .text()
      .primaryKey()
      .$defaultFn(() => `passkey_${createId()}`),
    name: t.text("name"),
    publicKey: t.text("public_key").notNull(),
    userId: t
      .text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    credentialId: t.text("credential_id").notNull().unique(),
    counter: t.integer("counter").notNull(),
    deviceType: t.text(),
    backedUp: t.integer("backed_up", { mode: "boolean" }).notNull(),
    transports: t.text("transports").notNull(),
    createdAt: t
      .integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    aaguid: t.text("aaguid").notNull(),
  }),
  (t) => [index("passkey_user_id_idx").on(t.userId)],
);

export const teamsRelations = relations(teams, ({ many }) => ({
  equipments: many(equipment),
  equipmentTypes: many(equipmentTypes),
}));
