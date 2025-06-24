import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "./schema.js";

// Load environment variables first
dotenv.config();

// Database connection
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create postgres client
const client = postgres(connectionString);

// Create drizzle database instance
export const db = drizzle(client, { schema });

// Export schema for migrations
export * from "./schema.js";
