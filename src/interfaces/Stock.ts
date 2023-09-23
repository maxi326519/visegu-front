export interface Stock {
  id?: string;
  quantity: number;
  ProductId?: string;
  StorageId?: string;
}

export interface StockFilters {
  search: string;
  storage: string;
  category: string;
}

export interface StockError {
  quantity: string;
  ProductId: string;
  StorageId: string;
}

export const initStockFilters = (): StockFilters => ({
  search: "",
  storage: "",
  category: "",
});

export const initStock = (): Stock => ({
  quantity: 0,
});

export const initStockError = (): StockError => ({
  quantity: "",
  ProductId: "",
  StorageId: "",
});
