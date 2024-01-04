import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/ReduxState";
import { Movement, MovementType } from "../../../../interfaces/Movements";
import { Storage } from "../../../../interfaces/Storage";
import { Product } from "../../../../interfaces/Product";
import { Stock } from "../../../../interfaces/Stock";
import { User } from "../../../../interfaces/User";

import style from "./MovementsRow.module.css";
import deleteSvg from "../../../../assets/icons/remove.svg";
import dateFormat from "../../../../scripts/dateFormat";

interface Props {
  movement: Movement;
  handleDelete: (movement: Movement) => void;
}

export default function MovementsRow({ movement, handleDelete }: Props) {
  const stocks = useSelector((state: RootState) => state.stock.data);
  const products = useSelector((state: RootState) => state.products.data);
  const storages = useSelector((state: RootState) => state.storage);
  const users = useSelector((state: RootState) => state.users);
  const [data, setData] = useState({
    itemName: "",
    quantity: 0,
    userName: "",
    storageName: "",
  });

  useEffect(() => {
    let currentData = {
      itemName: "",
      quantity: 0,
      userName: "",
      storageName: "",
    };
    const currentStock = stocks.find(
      (stock: Stock) =>
        stock.id === movement.Stocks.egress ||
        stock.id === movement.Stocks.ingress
    );

    // Item Name
    currentData.itemName =
      products.find(
        (product: Product) => product.id === currentStock?.ProductId
      )?.description || "";

    // Quantity
    currentData.quantity = currentStock?.quantity || 0;

    // User Name
    currentData.userName =
      users.find((user: User) => user.id === movement.UserId)?.name || "";

    // Storage Name
    if (movement.type === MovementType.EGRESS) {
      currentData.storageName =
        storages.find(
          (storage: Storage) => storage.id === movement.Storage.egress
        )?.name || "";
    } else if (movement.type === MovementType.INGRESS) {
      currentData.storageName =
        storages.find(
          (storage: Storage) => storage.id === movement.Storage.ingress
        )?.name || "";
    } else {
      const ingressStorage = storages.find(
        (storage: Storage) => storage.id === movement.Storage.ingress
      );

      const egressStorage = storages.find(
        (storage: Storage) => storage.id === movement.Storage.egress
      );

      currentData.storageName =
        ingressStorage && egressStorage
          ? `${ingressStorage.name} -> ${egressStorage.name}`
          : "";
    }

    setData(currentData);
  }, [movement]);

  return (
    <tr className={style.row}>
      <span>{movement.date ? dateFormat(movement.date) : ""}</span>
      <span>{movement.type}</span>
      <span>{movement.quantity}</span>
      <span>{data.itemName}</span>
      <span>{data.storageName}</span>
      <span>{data.userName}</span>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleDelete(movement)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
    </tr>
  );
}
