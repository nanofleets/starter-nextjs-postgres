import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const status = pgTable("status", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
