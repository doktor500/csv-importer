export type Product = {
  id: number;
  sku: string;
  description: string | null;
  quantity: number;
  storeId: number;
};

export type NewProduct = Omit<Product, "id">;
