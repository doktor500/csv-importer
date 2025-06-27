"use server";

import { Product } from "@/modules/domain/product";
import { productsRepository } from "@/modules/repositories/productsRepository";
import { webCache } from "@/lib/webCache";
import { productSchema } from "@/modules/domain/schema/productSchema";

export const updateProduct = async (data: Product) => {
  const product = productSchema.parse(data);
  await productsRepository.update(product);
  webCache.revalidatePath("/products");
};
