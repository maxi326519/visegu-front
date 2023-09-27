export interface Categories {
  id?: string;
  name: string;
}

export interface Cache {
  new: Categories[];
  remove: Categories[];
}

export const initCategories = (): Categories => ({
  id: "",
  name: "",
});

export const initCache = (): Cache => ({
  new: [],
  remove: [],
});