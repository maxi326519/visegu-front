export interface Storage {
  id?: string;
  name: string;
  UserId: string[];
}

export interface StorageError {
  name: string;
  UserId: string;
}

export const initStorage = (): Storage => ({
  name: "",
  UserId: [],
});

export const initStorageError = (): StorageError => ({
  name: "",
  UserId: "",
});
