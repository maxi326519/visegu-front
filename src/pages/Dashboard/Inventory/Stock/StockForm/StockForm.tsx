import { Stock, StockError, initStock, initStockError } from "../../../../../interfaces/Stock";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/ReduxState";

import styles from "./StockForm.module.css";
import Input from "../../../../../components/Inputs/Input";
import SelectInput from "../../../../../components/Inputs/SelectInput";

export interface Props {
  data: Stock | null;
  handleClose: () => void;
  handleSubmit: (stock: Stock) => void;
}

export default function StockForm({ data, handleClose, handleSubmit }: Props) {
  const products = useSelector((state: RootState) => state.products.data);
  const storages = useSelector((state: RootState) => state.storage);
  const [stock, setStock] = useState<Stock>(initStock());
  const [error, setError] = useState<StockError>(initStockError());

  // If data is selected for editing, update product local data
  useEffect(() => {
    if (data) setStock(data);
  }, [data]);

  // Change stock
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setStock({ ...stock, [event.target.name]: event.target.value });
  }

  // Sbubmit data
  function handleLocalSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (validations()) {
      handleSubmit(stock);
      handleClose();
    }
  }

  // Errors validations
  function validations() {
    let errors: StockError = initStockError();
    let value = true;

    if (stock.quantity === 0) {
      errors.quantity = "This field can not be blank";
      value = false;
    }

    if (stock.ProductId === "") {
      errors.ProductId = "You must select a Product";
      value = false;
    }

    if (stock.StorageId === "") {
      errors.StorageId = "You must select a Storage";
      value = false;
    }

    setError(errors);
    return value;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.headerTitle}>New stock</h3>
          <button className={styles.headerClose} type="button" onClick={handleClose}>X</button>
        </header>
        <form className={styles.form} onSubmit={handleLocalSubmit}>
          <Input
            name="quantity"
            label="Quantity"
            value={stock.quantity}
            error={error.quantity}
            handleChange={handleChange}
          />
          <SelectInput
            name="ProductId"
            label="Product"
            list={products.map((product) => ({ id: product.id!, label: product.skuNumber }))}
            value={stock.ProductId}
            error={error.ProductId}
            handleChange={handleChange}
          />
          <SelectInput
            name="StorageId"
            label="Storage"
            list={storages.map((storage) => ({ id: storage.id!, label: storage.name }))}
            value={stock.StorageId}
            error={error.StorageId}
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
