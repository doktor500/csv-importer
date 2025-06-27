import { describe, it, expect } from "vitest";
import { createProduct } from "@/actions/createProduct";

describe("create product", () => {
  it("returns error if the product quantity is negative", async () => {
    const product = { quantity: -1, sku: "test-sku", description: "description", storeId: 1 };
    await expect(createProduct(product)).rejects.toThrow();
  });

  it("returns error if the store id is invalid", async () => {
    const product = { quantity: 1, sku: "test-sku", description: "description", storeId: -1 };
    await expect(createProduct(product)).rejects.toThrow();
  });
});
