import { beforeEach, describe, expect, it } from "vitest";
import { productsRepository } from "@/modules/repositories/productsRepository";
import { NewProduct } from "@/modules/domain/product";
import { storesRepository } from "@/modules/repositories/storesRepository";
import { aProductSku } from "../../../fixtures/product.fixture";
import { aStoreCode } from "../../../fixtures/store.fixture";
import { resetDb } from "../../../db/dbUtils";

describe("products repository", () => {
  beforeEach(async () => await resetDb());

  it("can save a list of products and retrieve them by store", async () => {
    const aStore = { code: aStoreCode() };
    const [store] = await storesRepository.saveAll([aStore]);
    const product1 = { sku: aProductSku(), description: "Item 1", quantity: 8, storeId: store.id };
    const product2 = { sku: aProductSku(), description: "", quantity: 6, storeId: store.id };
    const products: NewProduct[] = [product1, product2];

    await productsRepository.saveAll(products);

    const savedProducts = await productsRepository.getAllByStore(store);
    expect(savedProducts).toHaveLength(2);
    expect(savedProducts[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        sku: product1.sku,
        description: product1.description,
        quantity: product1.quantity,
        storeId: store.id,
      }),
    );

    expect(savedProducts[1]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        sku: product2.sku,
        description: product2.description,
        quantity: product2.quantity,
        storeId: store.id,
      }),
    );
  });

  it("can save a list of products and fetch all products from the db", async () => {
    const aStore = { code: aStoreCode() };
    const [store] = await storesRepository.saveAll([aStore]);
    const product1 = { sku: aProductSku(), description: "Item 1", quantity: 8, storeId: store.id };
    const product2 = { sku: aProductSku(), description: "", quantity: 6, storeId: store.id };
    const products: NewProduct[] = [product1, product2];

    await productsRepository.saveAll(products);

    const savedProducts = await productsRepository.getAll();
    expect(savedProducts).toHaveLength(2);
    expect(savedProducts[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        sku: product1.sku,
        description: product1.description,
        quantity: product1.quantity,
        store,
      }),
    );

    expect(savedProducts[1]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        sku: product2.sku,
        description: product2.description,
        quantity: product2.quantity,
        store,
      }),
    );
  });

  it("can update an existing product", async () => {
    const aStore = { code: aStoreCode() };
    const [store] = await storesRepository.saveAll([aStore]);
    const product = { sku: aProductSku(), description: "Item 1", quantity: 8, storeId: store.id };

    const [savedProduct] = await productsRepository.save(product);
    const updatedProduct = {
      id: savedProduct.id,
      sku: aProductSku(),
      description: "Updated Item",
      quantity: 10,
      storeId: store.id,
    };

    const [result] = await productsRepository.update(updatedProduct);

    expect(result).toEqual({
      id: savedProduct.id,
      sku: updatedProduct.sku,
      description: updatedProduct.description,
      quantity: updatedProduct.quantity,
      storeId: store.id,
    });

    const [fetchedProduct] = await productsRepository.getAll();
    expect(fetchedProduct).toEqual({
      id: savedProduct.id,
      sku: updatedProduct.sku,
      description: updatedProduct.description,
      quantity: updatedProduct.quantity,
      store,
    });
  });
});
