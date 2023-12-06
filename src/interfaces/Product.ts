export interface Product {
  id?: string;
  skuNumber: string;
  description: string;
  amount: number;
  priceBuy: number;
  priceSale: number;
  CategoryId?: string;
  SupplierId?: string;
}

export interface ProductError {
  skuNumber: string;
  description: string;
  priceBuy: string;
  priceSale: string;
  CategoryId: string;
  SupplierId: string;
}

export interface ProductFilters {
  category: string;
  supplier: string;
}

export const initProduct = (): Product => ({
  skuNumber: "",
  description: "",
  priceBuy: 0,
  priceSale: 0,
  amount: 0,
});

export const intProductError = (): ProductError => ({
  skuNumber: "",
  description: "",
  priceBuy: "",
  priceSale: "",
  CategoryId: "",
  SupplierId: "",
});

export const initProductFilters = (): ProductFilters => ({
  category: "",
  supplier: "",
});
