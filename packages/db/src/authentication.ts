import { createId } from "@paralleldrive/cuid2";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", (t) => ({
  id: t.text().primaryKey(),
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
    id: t.text().primaryKey(),
    expiresAt: t.integer({ mode: "timestamp" }).notNull(),
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

export const account = sqliteTable(
  "account",
  (t) => ({
    id: t.text().primaryKey(),
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

export const verification = sqliteTable(
  "verification",
  (t) => ({
    id: t.text().primaryKey(),
    identifier: t.text().notNull(),
    value: t.text().notNull(),
    expiresAt: t.integer({ mode: "timestamp" }).notNull(),
    createdAt: t.integer({ mode: "timestamp" }),
    updatedAt: t.integer({ mode: "timestamp" }),
  }),
  (t) => [index("identifier_idx").on(t.identifier)],
);

export const organizations = sqliteTable("organizations", (t) => ({
  id: t.text().primaryKey(),
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
    createdAt: t.integer("created_at", { mode: "timestamp" }).notNull(),
  }),
  (t) => [
    index("relation_org_id_idx").on(t.organizationId),
    index("relation_user_id_idx").on(t.userId),
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
    inviterId: text("inviter_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => [
    index("organization_id_idx").on(t.organizationId),
    index("email_idx").on(t.email),
  ],
);
