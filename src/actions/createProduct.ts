"use server";

import { NewProduct } from "@/modules/domain/product";
import { productsRepository } from "@/modules/repositories/productsRepository";
import { webCache } from "@/lib/webCache";
import { newProductSchema } from "@/modules/domain/schema/productSchema";

export const createProduct = async (data: NewProduct) => {
  const product = newProductSchema.parse(data);
  await productsRepository.save(product);
  webCache.revalidatePath("/products");
};
