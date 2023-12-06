import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/ReduxState";
import { Product } from "../../../../../interfaces/Product";

import style from "./ProductRow.module.css";
import editSvg from "../../../../../assets/icons/edit.svg";
import deleteSvg from "../../../../../assets/icons/remove.svg";

interface Props {
  product: Product;
  handleEdit: (product: Product) => void;
  handleDelete: (productId: string) => void;
}

export default function ProductRow({
  product,
  handleEdit,
  handleDelete,
}: Props) {
  const categories = useSelector(
    (state: RootState) => state.products.categories
  );
  const suppliers = useSelector((state: RootState) => state.products.suppliers);

  return (
    <tr className={style.row}>
      <span>{product.skuNumber}</span>
      <span>{product.description}</span>
      <span>{product.amount}</span>
      <span>
        {categories.find((cat) => cat.id === product.CategoryId)?.name || "-"}
      </span>
      <span>
        {suppliers.find((cat) => cat.id === product.SupplierId)?.name || "-"}
      </span>
      <span>{product.priceBuy ? `$${product.priceBuy}` : "-"}</span>
      <span>{product.priceSale ? `$${product.priceSale}` : "-"}</span>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(product)}
      >
        <img src={editSvg} alt="edit" />
      </button>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleDelete(product.id!)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
    </tr>
  );
}
