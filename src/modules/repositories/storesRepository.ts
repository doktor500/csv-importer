import { NewStore } from "@/modules/domain/store";
import { stores } from "@/db/schema";
import { db } from "@/db/db";
import { inArray } from "drizzle-orm";

const getAll = async () => {
  return db.select().from(stores).execute();
};

const getAllByCodeIn = async (codes: string[]) => {
  return db.select().from(stores).where(inArray(stores.code, codes)).execute();
};

const saveAll = async (values: NewStore[]) => {
  return db.insert(stores).values(values).onConflictDoNothing().returning();
};

export const storesRepository = { getAll, getAllByCodeIn, saveAll };
