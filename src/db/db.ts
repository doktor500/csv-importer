import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

export const dbClient = new Database("drizzle/sqlite.db");
export let db = drizzle(dbClient, { schema, logger: false });

export const setDbInstance = (client: Database.Database) => {
  db = drizzle(client, { schema, logger: false });
};
