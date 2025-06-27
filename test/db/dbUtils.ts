import { db } from "@/db/db";
import { products, stores } from "@/db/schema";

const database = db;

export async function resetDb() {
  database.run("BEGIN");
  try {
    await database.delete(products);
    await database.delete(stores);
    database.run("COMMIT");
  } catch (error) {
    database.run("ROLLBACK");
    console.error("Reset DB failed");
    console.error(error);
    throw error;
  }
}
