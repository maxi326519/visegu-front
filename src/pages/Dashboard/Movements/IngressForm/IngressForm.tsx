import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/ReduxState";
import {
  Movement,
  MovementError,
  initMovement,
  initMovementError,
} from "../../../../interfaces/Movements";
import fetDateYYYYMMDD from "../../../../scripts/fetDateYYYYMMDD";

import Input from "../../../../components/Inputs/Input";
import SelectInput from "../../../../components/Inputs/SelectInput";
import DataSelector from "../../../../components/DataSelector/DataSelector";

import styles from "./IngressForm.module.css";
import { match } from "assert";

export interface Props {
  skuNumber?: string;
  handleClose: () => void;
  handleSubmit: (movement: Movement) => void;
}

export default function IngressForm({
  skuNumber,
  handleClose,
  handleSubmit,
}: Props) {
  const products = useSelector((state: RootState) => state.products.data);
  const storage = useSelector((state: RootState) => state.storage);
  const users = useSelector((state: RootState) => state.users);
  const user = useSelector((state: RootState) => state.login);
  const [movement, setMovement] = useState<Movement>(initMovement(user.id));
  const [error, setError] = useState<MovementError>(initMovementError());

  useEffect(() => {
    const product = products.find((product) => product.skuNumber === skuNumber);

    if (product) {
      setMovement({
        ...movement,
        ProductId: product.id!,
      });
    }
  }, [skuNumber]);

  // Movement Change
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (event.target.name === "ingress") {
      setMovement({
        ...movement,
        Storage: {
          egress: "",
          ingress: event.target.value,
        },
      });
    } else {
      setMovement({ ...movement, [event.target.name]: event.target.value });
    }
  }

  // Movement date change
  function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
    if (new Date(event.target.value).getTime()) {
      setMovement({
        ...movement,
        [event.target.name]: new Date(event.target.value),
      });
    }
  }

  // Submit data
  function handleLocalSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (validations()) {
      handleSubmit(movement);
      handleClose();
    }
  }

  // Toggle stock selection
  function handleSelectProduct(productId: string) {
    setMovement({
      ...movement,
      ProductId: productId,
    });
  }

  // Return "skuNumber - description" of product
  function handleGetProductData(productId: string) {
    const product = products.find((product) => product.id === productId);
    return product ? `${product.skuNumber} - ${product.description}` : "";
  }

  // Errors validations
  function validations() {
    let errors: MovementError = initMovementError();
    let value = true;

    // QUANTITY
    if (movement.quantity === 0) {
      errors.quantity = "You must add a quantity";
      value = false;
    }

    // QUANTITY
    if (movement.date === null) {
      errors.date = "You must add a date";
      value = false;
    }

    // STOCK
    if (movement.ProductId === "") {
      errors.StockId = "You must select a product";
      value = false;
    }

    // STORAGE
    if (movement.Storage.ingress === "") {
      errors.StorageId.egress = "You must select a storage";
      value = false;
    }

    setError(errors);
    return value;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.headerTitle}>Ingress</h3>
          <button
            className={styles.headerClose}
            type="button"
            onClick={handleClose}
          >
            X
          </button>
        </header>
        <form className={styles.form} onSubmit={handleLocalSubmit}>
          <SelectInput
            name="UserId"
            label="User"
            value={movement.UserId}
            list={users.map((user) => ({ id: user.id!, label: user.name }))}
            error={error.UserId}
            handleChange={handleChange}
          />
          <Input
            name="date"
            label="Date"
            type="date"
            value={fetDateYYYYMMDD(movement.date)}
            error={error.date}
            handleChange={handleChangeDate}
          />
          <SelectInput
            name="ingress"
            label="Storage"
            value={movement.Storage.ingress}
            list={storage.map((storage) => ({
              id: storage.id!,
              label: storage.name,
            }))}
            error={error.StorageId.ingress}
            handleChange={handleChange}
          />
          <Input
            name="quantity"
            label="Quantity"
            value={movement.quantity}
            error={error.quantity}
            handleChange={handleChange}
          />
          <DataSelector
            data={products.map((product) => ({
              id: product.id!,
              label: handleGetProductData(product.id!),
            }))}
            selected={[movement.ProductId || ""]}
            placeHolder="Select a product"
            defaultSearch={skuNumber || ""}
            onSelect={handleSelectProduct}
            onRemove={() => handleSelectProduct("")}
          />
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
