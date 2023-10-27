export interface Product {
  id?: string;
  skuNumber: string;
  description: string;
  amount: number;
  CategoryId?: string;
}

export interface ProductError {
  skuNumber: string;
  description: string;
  CategoryId: string;
}

export const initProduct = (): Product => ({
  skuNumber: "",
  description: "",
  amount: 0,
});

export const intProductError = (): ProductError => ({
  skuNumber: "",
  description: "",
  CategoryId: "",
});
