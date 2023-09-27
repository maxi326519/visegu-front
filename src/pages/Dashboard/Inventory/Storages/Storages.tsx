import { useStorage } from "../../../../hooks/useStorage";
import { useEffect, useState } from "react";
import { Storage } from "../../../../interfaces/Storage";

import styles from "./Storages.module.css";
import StorageRow from "./StorageRow/StorageRow";
import StorageForm from "./StorageForm/StorageForm";

export default function Storages() {
  const storage = useStorage();
  const [data, setData] = useState<Storage | null>(null);
  const [form, setForm] = useState<boolean>(false);

  // Get initail Storage
  useEffect(() => {
    if (storage.data.length <= 0) storage.get();
  }, []);

  // Set data to edit, and show form
  function handleEdit(data: Storage) {
    setData(data);
    handleForm();
  }

  // Show new storage form
  function handleForm() {
    setForm(!form);
    if (form) setData(null);
  }

  // Post new storage or patch some storage
  function handleSubmit(newStorage: Storage) {
    data ? storage.update(newStorage) : storage.set(newStorage);
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form && <StorageForm data={data} handleClose={handleForm} handleSubmit={handleSubmit} />}
      <header>
        <div className={styles.controls}>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleForm}
          >
            + New Storage
          </button>
        </div>
      </header>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.firstRow}`}>
          <span>Storage</span>
          <span>User</span>
          <span>Actions</span>
        </div>
        <div className={styles.body}>
          {storage.data.length <= 0 ? (
            <tr className={styles.emptyRows}>
              <th>No hay propiedades</th>
            </tr>
          ) : (
            storage.data?.map((property: Storage) => (
              <StorageRow
                storage={property}
                handleEdit={handleEdit}
                handleDelete={storage.remove}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
