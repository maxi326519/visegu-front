export interface Storage {
  id?: string;
  name: string;
}

export interface StorageError {
  name: string;
}

export const initStorage = (): Storage => ({
  name: "",
});

export const initStorageError = (): StorageError => ({
  name: "",
});
