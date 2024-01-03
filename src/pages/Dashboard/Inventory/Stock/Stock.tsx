import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useProducts } from "../../../../hooks/useProduct";
import { useStorage } from "../../../../hooks/useStorage";
import { useStock } from "../../../../hooks/useStock";
import { useUsers } from "../../../../hooks/useUser";
import { usePDF } from "../../../../hooks/usePDF";
import {
  Stock,
  StockFilters,
  initStockFilters,
} from "../../../../interfaces/Stock";
import swal from "sweetalert";

import StockRow from "./StockRow/StockRow";
import Filters from "./Filters/Filters";
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
  const dispatch = useDispatch();
  const product = useProducts();
  const storage = useStorage();
  const stocks = useStock();
  const users = useUsers();
  const pdf = usePDF();
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
    setRows(
      stocks.data.filter((stock) => {
        const currentProduct = product.data.find(
          (p) => p.id === stock.ProductId
        );

        if (
          currentProduct &&
          filters.category !== "" &&
          currentProduct?.CategoryId !== filters.category
        )
          return false;
        if (filters.storage !== "" && stock.StorageId !== filters.storage)
          return false;

        if (
          currentProduct?.description
            .toLocaleLowerCase()
            .includes(filters.search.toLocaleLowerCase())
        )
          return true;
        if (
          currentProduct?.skuNumber
            .toLocaleLowerCase()
            .includes(filters.search.toLocaleLowerCase())
        )
          return true;
        if (filters.category === currentProduct?.CategoryId) return true;
        if (filters.storage === stock.StorageId) return true;
        return false;
      })
    );
  }, [filters, stocks.data]);

  // Filter change
  function handleChangeFilter(event: React.ChangeEvent<HTMLInputElement>) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
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

  // Print stock list
  async function handlePrint() {
    if (rows.length >= 1) {
      swal({
        text: `Are you sure you want to dowload the list of ${rows.length} product?`,
        icon: "info",
        buttons: {
          Yes: true,
          No: true,
        },
      }).then((response) => {
        if (response === "Yes") {
          dispatch(openLoading());
          pdf
            .openStockPDF(
              rows,
              storage.data,
              product.data,
              product.categories.data
            )
            .then(() => dispatch(closeLoading()))
            .catch((error: Error) => {
              dispatch(closeLoading());
              swal("Error", "The pdf could not be generated", "error");
            });
        }
      });
    } else swal("", "You don't have products to download", "warning");
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form.ingress && (
        <IngressForm
          handleClose={handleIngressForm}
          handleSubmit={stocks.setIngress}
        />
      )}
      {form.egress && (
        <EgressForm
          handleClose={handleEgressForm}
          handleSubmit={stocks.setEgress}
        />
      )}
      {form.transfer && (
        <TransferForm
          handleClose={handleTransferForm}
          handleSubmit={stocks.setTransfer}
        />
      )}
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
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handlePrint}
            >
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
              <StockRow key={stock.id} stock={stock} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
