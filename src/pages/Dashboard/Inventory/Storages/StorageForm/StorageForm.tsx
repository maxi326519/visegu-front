import { Storage, StorageError, initStorage, initStorageError } from "../../../../../interfaces/Storage";
import { useEffect, useState } from "react";

import Input from "../../../../../components/Inputs/Input";

import styles from "./StorageForm.module.css";

export interface Props {
  data: Storage | null;
  handleClose: () => void;
  handleSubmit: (storage: Storage) => void;
}

export default function StorageForm({ data, handleClose, handleSubmit }: Props) {
  const [storage, setStorage] = useState<Storage>(initStorage());
  const [error, setError] = useState<StorageError>(initStorageError());

  // If data is selected for editing, update product local data
  useEffect(() => {
    if (data) setStorage(data);
  }, [data]);

  // Change product
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStorage({ ...storage, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  // Sbubmit data
  function handleLocalSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (validations()) {
      handleSubmit(storage);
      handleClose();
    }
  }

  // Errors validations
  function validations() {
    let errors: StorageError = initStorageError();
    let value = true;

    if (storage.name === "") {
      errors.name = "This field can not be blank";
      value = false;
    }

    setError(errors);
    return value;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.headerTitle}>New storage</h3>
          <button className={styles.headerClose} type="button" onClick={handleClose}>X</button>
        </header>
        <form className={styles.form} onSubmit={handleLocalSubmit}>
          <Input
            name="name"
            label="Name"
            value={storage.name}
            error={error.name}
            handleChange={handleChange}
          />
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
