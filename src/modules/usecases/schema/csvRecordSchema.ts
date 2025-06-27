import z from "zod";

export type CsvRecordSchema = z.infer<typeof csvRecordSchema>;

export const csvRecordSchema = z.object({
  quantity: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => Number.isFinite(value), { message: "Invalid quantity" }),
  sku: z.string(),
  description: z.string(),
  store: z.string().length(3),
});
