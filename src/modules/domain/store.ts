export type Store = {
  id: number;
  code: string;
};

export type NewStore = Omit<Store, "id">;

export const storesGroupedByCode = (stores: Store[]) => {
  return stores.reduce<Record<string, number>>((stores, store) => {
    stores[store.code] = store.id;
    return stores;
  }, {});
};
