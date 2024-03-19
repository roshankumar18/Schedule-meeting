import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id"),
  user_id: varchar("user_id", { length: 256 }).primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  availabilty: many(availability),
  prefrence: one(prefrence, {
    fields: [users.user_id],
    references: [prefrence.user_id],
  }),
}));

export const availability = pgTable("availability", {
  id: serial("id").primaryKey(),
  day: varchar("day", { length: 256 }).notNull(),
  startTime: varchar("startTime", { length: 256 }).notNull(),
  endTime: varchar("endTime", { length: 256 }).notNull(),
  user_id: varchar("user_id", { length: 256 })
    .notNull()
    .references(() => users.user_id),
});

export const availabilityRelations = relations(availability, ({ one }) => ({
  user: one(users, {
    fields: [availability.user_id],
    references: [users.user_id],
    relationName: "availability",
  }),
}));

export const prefrence = pgTable("prefrence", {
  id: serial("id").primaryKey(),
  before: varchar("before", { length: 256 }).notNull(),
  after: varchar("after", { length: 256 }).notNull(),
  maxMeetings: varchar("noOfMeetings", { length: 256 }).notNull(),
  user_id: varchar("user_id", { length: 256 })
    .notNull()
    .references(() => users.user_id),
});

export const meeting = pgTable("meeting", {
  id: serial("id").primaryKey(),
  user1: varchar("user1", { length: 256 })
    .notNull()
    .references(() => users.user_id),
  user2: varchar("user2", { length: 256 })
    .notNull()
    .references(() => users.user_id),
  day: varchar("day", { length: 256 }).notNull(),
  startTime: varchar("startTime", { length: 256 }).notNull(),
});

// export const userMeeting = pgTable('user_meeting',{
//   userId:varchar('user_id',{length:256}).notNull().references(()=>users.user_id),
//   meetingId:integer('meeting_id').notNull().references(()=>meeting.id)
// },
// (t) => ({
//   pk: primaryKey(t.userId, t.meetingId),
// }),)

// export const meetingRelations = relations(meeting,({many})=>({
//   user:many(userMeeting)
// }))

// export const userMeetingRelations = relations(userMeeting,({one})=>({
//   user:one(users,{
//     fields:[userMeeting.userId],
//     references:[users.user_id]
//   }),
//   meeting:one(meeting,{
//     fields:[userMeeting.meetingId],
//     references:[meeting.id]
//   })
// }))

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Availability = typeof availability.$inferInsert;
export type Prefrence = typeof prefrence.$inferInsert;
