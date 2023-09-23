import { Storage, StorageError, initStorage, initStorageError } from "../../../../../interfaces/Storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/ReduxState";

import Input from "../../../../../components/Inputs/Input";
import SelectInput from "../../../../../components/Inputs/SelectInput";

import styles from "./StorageForm.module.css";

export interface Props {
  data: Storage | null;
  handleClose: () => void;
  handleSubmit: (storage: Storage) => void;
}

export default function StorageForm({ data, handleClose, handleSubmit }: Props) {
  const users = useSelector((state: RootState) => state.users);
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

  // Set user change
  function handleSelectUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setStorage({ ...storage, UserId: [event.target.value] });
    setError({ ...error, UserId: "" });
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

    if (storage.UserId.length <= 0) {
      errors.UserId = "You must select a user";
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
            handleChange={handleChange}
          />
          <SelectInput
            name="users"
            label="Users"
            value={""}
            list={users.map((users) => ({ id: users.id!, label: users.name }))}
            handleChange={handleSelectUser}
          />
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
