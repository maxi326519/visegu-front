import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/ReduxState";
import { Product } from "../../../../../interfaces/Product";
import { Storage } from "../../../../../interfaces/Storage";
import { Stock } from "../../../../../interfaces/Stock";

import style from "./StockRow.module.css";

interface Props {
  stock: Stock;
}

export default function StockRow({
  stock,
}: Props) {
  const storages = useSelector((state: RootState) => state.storage);
  const products = useSelector((state: RootState) => state.products);

  const [storage, setStorage] = useState<Storage | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    setStorage(storages.find((s) => s.id === stock.StorageId) || null);
    setProduct(products.data.find((p) => p.id === stock.ProductId) || null);
  }, [storages, products]);

  useEffect(() => {
    setCategory(products.categories.find((c) => c.id === product?.CategoryId)?.name || null);
  }, [product]);

  return (
    <tr className={style.row}>
      <span>{product?.skuNumber || "-"}</span>
      <span>{product?.description || "-"}</span>
      <span>{category || "-"}</span>
      <span>{stock.quantity}</span>
      <span>{storage?.name || "-"}</span>
    </tr>
  );
}
