import { useStock } from "../../../../hooks/useStock";
import { useState } from "react";
import { Stock } from "../../../../interfaces/Stock";

import StockRow from "./StockRow/StockRow";
import Filters from "./Filters/Filters";
import StockForm from "./StockForm/StockForm";
import IngressForm from "../../Movements/IngressForm/IngressForm";
import EgressForm from "../../Movements/EgressForm/EgressForm";
import TransferForm from "../../Movements/TransferForm/TransferForm";

import styles from "./Stock.module.css";
import ingressSvg from "../../../../assets/icons/ingress.svg";
import egressSvg from "../../../../assets/icons/egress.svg";
import transferSvg from "../../../../assets/icons/transfer.svg";
import searchSvg from "../../../../assets/icons/search.svg";
import printSvg from "../../../../assets/icons/printer.svg";

export default function Stocks() {
  const stocks = useStock();
  const [data, setData] = useState<Stock | null>(null);
  const [search, setSearch] = useState<string>("");
  const [form, setForm] = useState({
    stock: false,
    ingress: false,
    egress: false,
    transfer: false,
  });

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.name);
  }

  function handleEdit(data: Stock) {
    setData(data);
    handleForm();
  }

  function handleForm() {
    setForm({ ...form, stock: !form.stock });
    if (!form.stock) setData(null);
  }

  function handleIngressForm() {
    setForm({ ...form, stock: !form.ingress });
  }

  function handleEgressForm() {
    setForm({ ...form, stock: !form.egress });
  }

  function handleTransferForm() {
    setForm({ ...form, stock: !form.transfer });
  }

  function handleSubmit(stock: Stock) {
    data ? stocks.update(stock) : stocks.set(stock)
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form.stock && <StockForm data={data} handleClose={handleForm} handleSubmit={handleSubmit} />}
      {form.ingress && <IngressForm handleClose={handleIngressForm} handleSubmit={stocks.setIngress} />}
      {form.egress && <EgressForm handleClose={handleEgressForm} handleSubmit={stocks.setEgress} />}
      {form.transfer && <TransferForm handleClose={handleTransferForm} handleSubmit={stocks.setTransfer} />}
      <header>
        <div className={styles.controls}>
          <div className={styles.searchFilters}>
            <div className={styles.searchBar}>
              <input
                className="form-control"
                placeholder="Search stock"
                value={search}
                onChange={handleSearch}
              />
              <button className="btn btn-outline-primary" type="button">
                <img src={searchSvg} alt="search" />
              </button>
            </div>
            <Filters handleSubmit={() => { }} />
            <button className="btn btn-outline-primary" type="button">
              <img src={printSvg} alt="print" />
            </button>
          </div>
          <div className={styles.btnContainer}>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleIngressForm}
            >
              <img src={ingressSvg} alt="ingress" />
              <span>Ingress</span>
            </button>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleEgressForm}
            >
              <img src={egressSvg} alt="egress" />
              <span>Egress</span>
            </button>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleTransferForm}
            >
              <img src={transferSvg} alt="transfer" />
              <span>Transfer</span>
            </button>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleForm}
            >
              + New Stock
            </button>
          </div>
        </div>
      </header>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.firstRow}`}>
          <span>SKU Number</span>
          <span>Description</span>
          <span>Category</span>
          <span>Quantity</span>
          <span>Stock</span>
          <span>Actions</span>
        </div>
        <div className={styles.body}>
          {stocks.data?.length <= 0 ? (
            <tr className={styles.emptyRows}>
              <th>No hay propiedades</th>
            </tr>
          ) : (
            stocks.data?.map((stock: Stock) => (
              <StockRow
                key={stock.id}
                stock={stock}
                handleEdit={handleEdit}
                handleDelete={stocks.remove}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
