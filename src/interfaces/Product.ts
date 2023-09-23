export interface Product {
  id?: string;
  skuNumber: string;
  description: string;
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
});

export const intProductError = (): ProductError => ({
  skuNumber: "",
  description: "",
  CategoryId: "",
});
