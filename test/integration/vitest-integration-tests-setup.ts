import { resetDb } from "../db/dbUtils";
import { dbClient } from "@/db/db";

import { setDbInstance } from "@/db/db";
import Database from "better-sqlite3";

export const setup = async () => {
  const db = new Database(":memory:");
  setDbInstance(db);
};

export const teardown = async () => {
  await resetDb();
  dbClient.close();
};
