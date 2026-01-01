import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const snippets = pgTable("snippets", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  code: text("code").notNull(),
  description: text("description").notNull(),
  language: text("language").default("c").notNull(),
});

export const insertSnippetSchema = createInsertSchema(snippets).omit({ id: true });

export type Snippet = typeof snippets.$inferSelect;
export type InsertSnippet = z.infer<typeof insertSnippetSchema>;

export type SnippetResponse = Snippet;

export interface DemoResponse {
  output: string;
  error?: string;
  success: boolean;
}
