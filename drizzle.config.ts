import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "sqlite",
  out: "./db/drizzle",
  dbCredentials: {
    url: "./db/data.db",
  },
});
