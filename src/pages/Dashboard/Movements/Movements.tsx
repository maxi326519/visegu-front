import { useEffect, useState } from "react";
import { useMovements } from "../../../hooks/useMovements";
import { useProducts } from "../../../hooks/useProduct";
import { useStorage } from "../../../hooks/useStorage";
import { useStock } from "../../../hooks/useStock";
import { useUsers } from "../../../hooks/useUser";
import {
  Movement,
  MovementFilters,
  MovementType,
  initMovementFilters,
} from "../../../interfaces/Movements";

import MovementsRow from "./MovementsRow/MovementsRow";
import Filters from "./Filters/Filters";
import IngressForm from "./IngressForm/IngressForm";
import EgressForm from "./EgressForm/EgressForm";
import TransferForm from "./TransferForm/TransferForm";

import styles from "./Movements.module.css";
import ingressSvg from "../../../assets/icons/ingress.svg";
import egressSvg from "../../../assets/icons/egress.svg";
import transferSvg from "../../../assets/icons/transfer.svg";
import searchSvg from "../../../assets/icons/search.svg";

export default function Movements() {
  const movements = useMovements();
  const products = useProducts();
  const storage = useStorage();
  const stock = useStock();
  const user = useUsers();
  const [rows, setRows] = useState<Movement[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<MovementFilters>(
    initMovementFilters()
  );
  const [form, setForm] = useState({
    ingress: false,
    egress: false,
    transfer: false,
  });

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    if (movements.data.length <= 0) movements.get(filters);
    if (products.data.length <= 0) products.get();
    if (storage.data.length <= 0) storage.get();
    if (stock.data.length <= 0) stock.get();
    if (user.data.length <= 0) user.get();
  }, [
    filters,
    movements.data,
    products.data,
    storage.data,
    stock.data,
    user.data,
  ]);

  useEffect(() => {
    setRows(
      movements.data.filter((movement) => {
        const currentProduct = products.data.find(
          (p) => p.id === movement.ProductId
        );

        /* TYPE */
        if (filters.type !== "" && movement.type !== filters.type) return false;

        /* USER */
        if (filters.user !== "" && movement.UserId !== filters.user)
          return false;

        /* STORAGE */
        if (
          filters.storage &&
          movement.Storage.ingress !== filters.storage &&
          movement.Storage.egress !== filters.storage
        )
          return false;

        /* SUPPLIER */
        if (filters.supplier && currentProduct?.SupplierId === filters.supplier)
          return false;

        /* PRODUCT */
        /*         if (
          currentProduct &&
          (filters.search
            .toLocaleLowerCase()
            .includes(currentProduct.description.toLocaleLowerCase()) ||
            filters.search
              .toLocaleLowerCase()
              .includes(currentProduct.skuNumber.toLocaleLowerCase()))
        )
          return false; */

        return true;
      })
    );
  }, [
    filters,
    products.data,
    products.suppliers.data,
    storage.data,
    user.data,
    movements.data,
  ]);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.name);
  }

  function handleIngressForm() {
    setForm({ ...form, ingress: !form.ingress });
  }

  function handleEgressForm() {
    setForm({ ...form, egress: !form.egress });
  }

  function handleTransferForm() {
    setForm({ ...form, transfer: !form.transfer });
  }

  return (
    <div className={styles.dashboard}>
      {form.ingress && (
        <IngressForm
          handleClose={handleIngressForm}
          handleSubmit={stock.setIngress}
        />
      )}
      {form.egress && (
        <EgressForm
          handleClose={handleEgressForm}
          handleSubmit={stock.setEgress}
        />
      )}
      {form.transfer && (
        <TransferForm
          handleClose={handleTransferForm}
          handleSubmit={stock.setTransfer}
        />
      )}
      <header>
        <div className={styles.controls}>
          <div className={styles.searchFilters}>
            <div className={styles.searchBar}>
              <input
                className="form-control"
                placeholder="Search movement"
                value={search}
                onChange={handleSearch}
              />
              <button className="btn btn-outline-primary" type="button">
                <img src={searchSvg} alt="search" />
              </button>
            </div>
            <Filters
              handleSubmit={setFilters}
              filters={filters}
              storages={storage.data}
              suppliers={products.suppliers.data}
            />
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
          </div>
        </div>
      </header>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.firstRow}`}>
          <span>Date</span>
          <span>Type</span>
          <span>Quantity</span>
          <span>Product</span>
          <span>Storage</span>
          <span>User</span>
          <span>Actions</span>
        </div>
        <div className={styles.body}>
          {movements.data?.length <= 0 ? (
            <tr className={styles.emptyRows}>
              <th>No Movements</th>
            </tr>
          ) : (
            rows
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((movement: Movement) => (
                <MovementsRow
                  key={movement.id}
                  movement={movement}
                  handleDelete={movements.delete}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}
