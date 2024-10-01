import { timestamp } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable, serial } from "drizzle-orm/pg-core";

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export const studyCycles = pgTable("study_cycles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  completed: integer("completed"),
  totalHours: integer("total_hours"),
  userId: integer("user_id").references(() => users.id),
});

export const studyCycleSubjects = pgTable("study_cycle_subjects", {
  id: serial("id").primaryKey(),
  studyCycleId: integer("study_cycle_id").references(() => studyCycles.id),
  subjectId: integer("subject_id").references(() => subjects.id),
  subjectWeight: integer("subject_weight").notNull(),
});
