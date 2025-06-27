import { describe, expect, it } from "vitest";
import { updateProduct } from "@/actions/updateProduct";

describe("update product", () => {
  it("returns error if the product id is invalid", async () => {
    const product = { id: -1, quantity: 1, sku: "test-sku", description: "description", storeId: 1 };
    await expect(updateProduct(product)).rejects.toThrow();
  });

  it("returns error if the product quantity is negative", async () => {
    const product = { id: 1, quantity: -1, sku: "test-sku", description: "description", storeId: 1 };
    await expect(updateProduct(product)).rejects.toThrow();
  });

  it("returns error if the store id is invalid", async () => {
    const product = { id: 1, quantity: 1, sku: "test-sku", description: "description", storeId: -1 };
    await expect(updateProduct(product)).rejects.toThrow();
  });
});
