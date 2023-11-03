import { Cache, Suppliers as SuppliersTS, initCache, initSuppliers } from "../../../../../interfaces/Suppliers";
import { useState, useEffect } from "react";

import styles from "./Suppliers.module.css";

interface Props {
  data: SuppliersTS[];
  handleSubmit: (cache: Cache) => void;
  handleClose: () => void;
}

export default function Suppliers({ data, handleSubmit, handleClose }: Props) {
  const [newSupplier, setNewSupplier] = useState<SuppliersTS>(initSuppliers());
  const [suppliers, setSuppliers] = useState<SuppliersTS[]>([]);
  const [cache, setCache] = useState<Cache>(initCache());

  // Add list to suppliers
  useEffect(() => {
    setSuppliers(data);
  }, [data]);

  // Change new supplier
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewSupplier({ ...newSupplier, name: event.target.value });
  }

  // Add new supplier
  function handleAddSupplier() {
    if (newSupplier.name !== "" && !data.some((supplier) => supplier.name === newSupplier.name)) {
      setSuppliers([...suppliers, newSupplier]);
      setNewSupplier(initSuppliers());

      // Add supplier to create in cache
      setCache({
        ...cache,
        new: [...cache.new, newSupplier],
      });
    }
  }

  // Remove supplier
  function handleRemove(supplier: SuppliersTS) {
    setSuppliers(suppliers.filter((c) => c.name !== supplier.name));

    // Check if the supplier to delete is new
    if (cache.new.some((data) => data.name === newSupplier.name)) {
      // If exist in cache, filter it to 'new'
      setCache({
        ...cache,
        remove: cache.remove.filter((data) => data.name !== supplier.name)
      });
    } else {
      // If don't exist add to cache to delete
      setCache({
        ...cache,
        remove: [...cache.remove, supplier],
      });
    }
  }

  // Submit data
  function handleLocalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit(cache);
    handleClose();
  }

  return (
    <div className={styles.background}>
      <form className={styles.container} onSubmit={handleLocalSubmit}>
        <div className={styles.close}>
          <h4>Suppliers</h4>
          <div
            className="btn btn-close"
            onClick={handleClose}
          />
        </div>
        <div className={styles.list}>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <div key={supplier.id} className={styles.row}>
                <span>{supplier.name}</span>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleRemove(supplier)}
                >
                  -
                </button>
              </div>
            ))
          ) : (
            <span className={styles.empty}>Empty</span>
          )}
        </div>
        <div>
          <div className={styles.formContainer}>
            <label htmlFor="add">.</label>
            <input
              className="form-control"
              id="add"
              type="text"
              value={newSupplier.name}
              onChange={handleChange}
            />
            <button
              className="btn btn-success"
              type="button"
              onClick={handleAddSupplier}
            >
              +
            </button>
          </div>
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
