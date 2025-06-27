"use server";

import { productsRepository } from "@/modules/repositories/productsRepository";
import { webCache } from "@/lib/webCache";

export const deleteProduct = async (id: number) => {
  await productsRepository.deleteById(id);
  webCache.revalidatePath("/products");
};
