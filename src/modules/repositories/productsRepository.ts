import { db } from "@/db/db";
import { products } from "@/db/schema";
import { NewProduct, Product } from "@/modules/domain/product";
import { Store } from "@/modules/domain/store";
import { eq } from "drizzle-orm";

const deleteById = async (id: number) => {
  await db.delete(products).where(eq(products.id, id)).execute();
};

const getAll = async () => {
  return db.query.products.findMany({
    columns: {
      id: true,
      sku: true,
      description: true,
      quantity: true,
    },
    with: {
      store: true,
    },
    limit: 1000,
  });
};

const getAllByStore = async (store: Store) => {
  return db.select().from(products).where(eq(products.storeId, store.id)).execute();
};

const update = async (product: Product) => {
  return db
    .update(products)
    .set({
      sku: product.sku,
      description: product.description,
      quantity: product.quantity,
      storeId: product.storeId,
    })
    .where(eq(products.id, product.id))
    .returning();
};

const save = async (newProduct: NewProduct) => {
  return db.insert(products).values(newProduct).onConflictDoNothing().returning();
};

const saveAll = async (newProducts: NewProduct[]) => {
  return db.insert(products).values(newProducts).onConflictDoNothing().returning();
};

export const productsRepository = { deleteById, getAll, getAllByStore, update, save, saveAll };
