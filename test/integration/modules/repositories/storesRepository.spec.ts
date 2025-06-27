import { beforeEach, describe, expect, it } from "vitest";
import { storesRepository } from "@/modules/repositories/storesRepository";
import { NewStore } from "@/modules/domain/store";
import { aStoreCode } from "../../../fixtures/store.fixture";
import { resetDb } from "../../../db/dbUtils";

describe("stores repository", () => {
  beforeEach(async () => await resetDb());

  it("can insert and query a list of stores", async () => {
    const store1 = { code: aStoreCode() };
    const store2 = { code: aStoreCode() };
    const stores: NewStore[] = [store1, store2];

    await storesRepository.saveAll(stores);
    const savedStores = await storesRepository.getAllByCodeIn(stores.map((store) => store.code));

    expect(savedStores).toHaveLength(2);
    expect(savedStores).toContainEqual(expect.objectContaining({ id: expect.any(Number), code: store1.code }));
    expect(savedStores).toContainEqual(expect.objectContaining({ id: expect.any(Number), code: store2.code }));
  });
});
