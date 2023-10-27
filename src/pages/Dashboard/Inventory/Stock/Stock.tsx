import { Stock, StockFilters, initStockFilters } from "../../../../interfaces/Stock";
import { useEffect, useState } from "react";
import { useProducts } from "../../../../hooks/useProduct";
import { useStorage } from "../../../../hooks/useStorage";
import { useStock } from "../../../../hooks/useStock";
import { useUsers } from "../../../../hooks/useUser";

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
  const product = useProducts();
  const storage = useStorage();
  const stocks = useStock();
  const users = useUsers();
  const [data, setData] = useState<Stock | null>(null);
  const [rows, setRows] = useState<Stock[]>([]);
  const [filters, setFilters] = useState<StockFilters>(initStockFilters());
  const [form, setForm] = useState({
    stock: false,
    ingress: false,
    egress: false,
    transfer: false,
  });

  // Get initial stock
  useEffect(() => {
    if (product.data.length <= 0) product.get();
    if (storage.data.length <= 0) storage.get();
    if (stocks.data.length <= 0) stocks.get();
    if (users.data.length <= 0) users.get();
  }, []);

  useEffect(() => {
    setRows(stocks.data.filter((stock) => {
      const currentProduct = product.data.find((p) => p.id === stock.ProductId);

      if (currentProduct?.description.toLocaleLowerCase().includes(filters.search.toLocaleLowerCase())) return true;
      if (currentProduct?.skuNumber.toLocaleLowerCase().includes(filters.search.toLocaleLowerCase())) return true;
      if (filters.category === currentProduct?.CategoryId) return true;
      if (filters.storage === stock.StorageId) return true;
      return false
    }));
  }, [filters, stocks.data]);

  function handleEdit(data: Stock) {
    setData(data);
    handleForm();
  }

  // Filter change
  function handleChangeFilter(event: React.ChangeEvent<HTMLInputElement>) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  // Show new stock form
  function handleForm() {
    setForm({ ...form, stock: !form.stock });
    if (!form.stock) setData(null);
  }

  // Show ingress stock form
  function handleIngressForm() {
    setForm({ ...form, ingress: !form.ingress });
  }

  // Show egress stock form
  function handleEgressForm() {
    setForm({ ...form, egress: !form.egress });
  }

  // Show transfer stock form
  function handleTransferForm() {
    setForm({ ...form, transfer: !form.transfer });
  }

  // Post new sotck or patch some sotck
  function handleSubmit(stock: Stock) {
    data ? stocks.update(stock) : stocks.set(stock);
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
                name="search"
                value={filters.search}
                onChange={handleChangeFilter}
              />
              <button className="btn btn-outline-primary" type="button">
                <img src={searchSvg} alt="search" />
              </button>
            </div>
            <Filters
              handleSubmit={setFilters}
              filters={filters}
              storages={storage.data}
              categories={product.categories.data}
            />
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
          <span>Storage</span>
        </div>
        <div className={styles.body}>
          {rows?.length <= 0 ? (
            <tr className={styles.emptyRows}>
              <th>No Stocks</th>
            </tr>
          ) : (
            rows?.map((stock: Stock) => (
              <StockRow
                key={stock.id}
                stock={stock}
                handleEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
