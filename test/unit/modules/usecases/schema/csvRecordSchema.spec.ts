import { describe, it, expect } from "vitest";
import { csvRecordSchema } from "@/modules/usecases/schema/csvRecordSchema";

describe("csv record", () => {
  it("can parse a valid CSV record", () => {
    const validRecord = { quantity: "8", sku: "UK-1011", description: "Item 1", store: "KEN" };
    expect(() => csvRecordSchema.parse(validRecord)).not.toThrow();
  });

  it("returns an error if the CSV record contains an invalid store", () => {
    const invalidRecord = { quantity: "8", sku: "UK-1011", description: "Item 1", store: "INVALID" };
    expect(() => csvRecordSchema.parse(invalidRecord)).toThrow();
  });

  it("returns an error if the CSV record contains an invalid quantity", () => {
    const invalidRecord = { quantity: "INVALID", sku: "UK-1011", description: "Item 1", store: "KEN" };
    expect(() => csvRecordSchema.parse(invalidRecord)).toThrow();
  });
});
