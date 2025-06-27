import "core-js/features/promise/with-resolvers";
import { storesRepository } from "@/modules/repositories/storesRepository";
import { NewStore, Store, storesGroupedByCode } from "@/modules/domain/store";
import { Readable } from "stream";
import csvParser from "csv-parser";
import { productsRepository } from "@/modules/repositories/productsRepository";
import { CsvRecordSchema, csvRecordSchema } from "./schema/csvRecordSchema";

const NEW_LINE_SEPARATOR = "\n" as const;
const HEADER = "quantity,sku,description,store";

const execute = async (data: string) => {
  const content = data.startsWith(HEADER) ? data : `${HEADER}${NEW_LINE_SEPARATOR}${data}`;
  const entries = await parseCsv(content);
  const records = entries.map((entry) => csvRecordSchema.parse(entry));

  await updateStores(records).then((stores) => updateProducts(stores, records));
};

const parseCsv = async (csvString: string): Promise<Record<string, string>[]> => {
  const results: Record<string, string>[] = [];
  const { promise, resolve, reject } = Promise.withResolvers<Record<string, string>[]>();

  Readable.from([csvString])
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", () => resolve(results))
    .on("error", reject);

  return promise;
};

const updateStores = async (csvRecords: CsvRecordSchema[]) => {
  const codes = new Set(csvRecords.map((record) => record.store));
  const stores: NewStore[] = [...codes].map((code) => ({ code }));
  await storesRepository.saveAll(stores);

  return storesRepository.getAll();
};

const updateProducts = async (stores: Store[], csvRecords: CsvRecordSchema[]) => {
  const storesByCode = storesGroupedByCode(stores);
  const products = csvRecords.map((record) => toProduct(record, storesByCode));

  await productsRepository.saveAll(products);
};

const toProduct = (csvRecord: CsvRecordSchema, storesByCode: Record<string, number>) => ({
  quantity: csvRecord.quantity,
  sku: csvRecord.sku,
  description: csvRecord.description,
  storeId: storesByCode[csvRecord.store],
});

export const importCsv = { execute };
