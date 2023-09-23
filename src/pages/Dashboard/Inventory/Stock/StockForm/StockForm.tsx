import { Stock, initStock } from "../../../../../interfaces/Stock";
import { useEffect, useState } from "react";

import styles from "./StockForm.module.css";
import Input from "../../../../../components/Inputs/Input";

export interface Props {
  data: Stock | null;
  handleClose: () => void;
  handleSubmit: (stock: Stock) => void;
}

export default function StockForm({ data, handleClose, handleSubmit }: Props) {
  const [stock, setStock] = useState<Stock>(initStock());

  useEffect(() => {
    if (data) setStock(data);
  }, [data]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setStock({ ...stock, [event.target.name]: event.target.value });
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.headerTitle}>New stock</h3>
          <button className={styles.headerClose} type="button" onClick={handleClose}>X</button>
        </header>
        <form className={styles.form} onSubmit={() => handleSubmit(stock)}>
          <Input
            name="name"
            label="Name"
            value={stock.quantity}
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
