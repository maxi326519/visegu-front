import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/ReduxState";
import { useState } from "react";
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
  const categories = useSelector((state: RootState) => state.products.categories);
  const [error, setError] = useState(false);

  /*   useEffect(() => {
      if (!product.registerType) {
        setError(true);
      } else {
        setError(false);
      }
    }, [product]); */

  return (
    <tr className={`${style.row} ${error ? style.error : ""}`}>
      <span>{product.skuNumber}</span>
      <span>{product.description}</span>
      <span>{categories.find((cat) => cat.id === product.CategoryId)?.name || "-"}</span>
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
