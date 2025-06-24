import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import { db } from "./db/index.js";
import { todos, insertTodoSchema, updateTodoSchema } from "./db/schema.js";

const app = new Hono();

const route = app
  .use(
    "/*",
    cors({
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowHeaders: ["Content-Type"],
    })
  )
  .get("/api/todos", async (c) => {
    try {
      const allTodos = await db
        .select()
        .from(todos)
        .orderBy(todos.isCompleted, todos.dueDate);
      return c.json(allTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      return c.json({ error: "Failed to fetch todos" }, 500);
    }
  })
  .post("/api/todos", zValidator("json", insertTodoSchema), async (c) => {
    try {
      const validatedData = c.req.valid("json");

      const [newTodo] = await db
        .insert(todos)
        .values({
          title: validatedData.title,
          isCompleted: validatedData.isCompleted ?? false,
          dueDate: new Date(validatedData.dueDate),
        })
        .returning();

      return c.json(newTodo, 201);
    } catch (error) {
      console.error("Error creating todo:", error);
      return c.json({ error: "Failed to create todo" }, 500);
    }
  })
  .put("/api/todos/:id", zValidator("json", updateTodoSchema), async (c) => {
    const id = c.req.param("id");

    try {
      const validatedData = c.req.valid("json");

      const [updatedTodo] = await db
        .update(todos)
        .set({
          ...validatedData,
          dueDate: validatedData.dueDate
            ? new Date(validatedData.dueDate)
            : undefined,
          updatedAt: new Date(),
        })
        .where(eq(todos.id, id))
        .returning();

      if (!updatedTodo) {
        return c.json({ error: "Todo not found" }, 404);
      }

      return c.json(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
      return c.json({ error: "Failed to update todo" }, 500);
    }
  })
  .delete("/api/todos/:id", async (c) => {
    const id = c.req.param("id");

    try {
      const [deletedTodo] = await db
        .delete(todos)
        .where(eq(todos.id, id))
        .returning();

      if (!deletedTodo) {
        return c.json({ error: "Todo not found" }, 404);
      }

      return c.json(deletedTodo);
    } catch (error) {
      console.error("Error deleting todo:", error);
      return c.json({ error: "Failed to delete todo" }, 500);
    }
  });

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

console.log(`🚀 Server is running on http://localhost:${port}`);
console.log(
  `📊 Database: ${process.env.DATABASE_URL ? "Connected" : "Not configured"}`
);

serve({
  fetch: app.fetch,
  port,
});

// Export the app type for client usage
export type AppType = typeof route;
