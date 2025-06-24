import { pgTable, text, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

export const todos = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  isCompleted: boolean("is_completed").notNull().default(false),
  dueDate: timestamp("due_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isCompleted: z.boolean().optional().default(false),
  dueDate: z.string().datetime("Invalid date format"),
});

export type InsertTodo = z.infer<typeof insertTodoSchema>;

export const updateTodoSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  isCompleted: z.boolean().optional(),
  dueDate: z.string().datetime("Invalid date format").optional(),
});

export type UpdateTodo = z.infer<typeof updateTodoSchema>;

// Type definitions
export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type NewTodo = z.infer<typeof insertTodoSchema>;
