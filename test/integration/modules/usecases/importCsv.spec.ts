import { beforeEach, describe, expect, it } from "vitest";
import { importCsv } from "@/modules/usecases/importCsv";
import { productsRepository } from "@/modules/repositories/productsRepository";
import { storesRepository } from "@/modules/repositories/storesRepository";
import { aStoreCode } from "../../../fixtures/store.fixture";
import { aProductSku } from "../../../fixtures/product.fixture";
import { resetDb } from "../../../db/dbUtils";

describe("Import CSV Use Case", () => {
  beforeEach(async () => await resetDb());

  it("can import a CSV file with a header", async () => {
    const store1 = aStoreCode();
    const store2 = aStoreCode();

    const sku1 = aProductSku();
    const sku2 = aProductSku();
    const sku3 = aProductSku();

    const data = trim(`
        quantity,sku,description,store
        8,${sku1},Item 1,${store1}
        6,${sku2},,${store1}
        4,${sku3},Item 3,${store2}
    `);

    await importCsv.execute(data);
    const stores = await storesRepository.getAll();
    const products = await productsRepository.getAll();

    expect(stores.map((store) => store.code)).toEqual(expect.arrayContaining([store1, store2]));
    expect(products).toEqual([
      expect.objectContaining({
        quantity: 8,
        sku: sku1,
        description: "Item 1",
        store: expect.objectContaining({ id: expect.any(Number), code: store1 }),
      }),
      expect.objectContaining({
        quantity: 6,
        sku: sku2,
        description: "",
        store: expect.objectContaining({ id: expect.any(Number), code: store1 }),
      }),
      expect.objectContaining({
        quantity: 4,
        sku: sku3,
        description: "Item 3",
        store: expect.objectContaining({ id: expect.any(Number), code: store2 }),
      }),
    ]);
  });

  it("can import a CSV file without a header", async () => {
    const store1 = aStoreCode();
    const store2 = aStoreCode();

    const sku1 = aProductSku();
    const sku2 = aProductSku();
    const sku3 = aProductSku();

    const data = trim(`
        8,${sku1},Item 1,${store1}
        6,${sku2},,${store1}
        4,${sku3},Item 3,${store2}
    `);

    await importCsv.execute(data);
    const stores = await storesRepository.getAll();
    const products = await productsRepository.getAll();

    expect(stores.map((store) => store.code)).toEqual(expect.arrayContaining([store1, store2]));
    expect(products).toEqual([
      expect.objectContaining({
        quantity: 8,
        sku: sku1,
        description: "Item 1",
        store: expect.objectContaining({ id: expect.any(Number), code: store1 }),
      }),
      expect.objectContaining({
        quantity: 6,
        sku: sku2,
        description: "",
        store: expect.objectContaining({ id: expect.any(Number), code: store1 }),
      }),
      expect.objectContaining({
        quantity: 4,
        sku: sku3,
        description: "Item 3",
        store: expect.objectContaining({ id: expect.any(Number), code: store2 }),
      }),
    ]);
  });
});

export const trim = (input: string) => {
  return input
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
};
