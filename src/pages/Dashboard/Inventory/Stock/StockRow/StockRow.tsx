import { Stock } from "../../../../../interfaces/Stock";

import style from "./StockRow.module.css";
import deleteSvg from "../../../../../assets/icons/remove.svg";

interface Props {
  stock: Stock;
  handleEdit: (stock: Stock) => void;
  handleDelete: (stockId: string) => void;
}

export default function StockRow({
  stock,
  handleDelete,
}: Props) {
  return (
    <tr className={style.row}>
      <span>SKU Number</span>
      <span>Description</span>
      <span>Category</span>
      <span>Quantity</span>
      <span>Stock</span>
      <span>{stock.quantity}</span>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleDelete(stock.id!)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
    </tr>
  );
}
