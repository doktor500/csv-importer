import z from "zod";

const baseProductSchema = z.object({
  quantity: z.number().positive(),
  sku: z.string(),
  description: z.string(),
  storeId: z.number().positive(),
});

export const newProductSchema = baseProductSchema;
export const productSchema = baseProductSchema.extend({ id: z.number().positive() });
