import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/** Core user table backing auth flow. */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 32 }).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const acquisitionProfiles = mysqlTable("acquisition_profiles", {
  id: int("id").autoincrement().primaryKey(),
  objective: varchar("objective", { length: 80 }).notNull(),
  propertyType: varchar("propertyType", { length: 120 }).notNull(),
  regions: text("regions").notNull(),
  budget: varchar("budget", { length: 120 }).notNull(),
  paymentMethod: varchar("paymentMethod", { length: 120 }).notNull(),
  timeline: varchar("timeline", { length: 120 }).notNull(),
  mustHaves: text("mustHaves").notNull(),
  priorities: text("priorities").notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AcquisitionProfile = typeof acquisitionProfiles.$inferSelect;
export type InsertAcquisitionProfile = typeof acquisitionProfiles.$inferInsert;
