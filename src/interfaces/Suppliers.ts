export interface Suppliers {
  id?: string;
  name: string;
}

export interface Cache {
  new: Suppliers[];
  remove: Suppliers[];
}

export const initSuppliers = (): Suppliers => ({
  id: "",
  name: "",
});

export const initCache = (): Cache => ({
  new: [],
  remove: [],
});