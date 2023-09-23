import { useEffect, useState } from "react";

import { Product, ProductError, initProduct, intProductError } from "../../../../../interfaces/Product";

import Input from "../../../../../components/Inputs/Input";

import styles from "./ProductForm.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/ReduxState";
import SelectInput from "../../../../../components/Inputs/SelectInput";

export interface Props {
  data: Product | null;
  handleClose: () => void;
  handleSubmit: (product: Product) => void;
}

export default function ProductForm({ data, handleClose, handleSubmit }: Props) {
  const categories = useSelector((state: RootState) => state.products.categories);
  const [product, setProduct] = useState<Product>(initProduct());
  const [error, setError] = useState(intProductError());

  // If data is selected for editing, update product local data
  useEffect(() => {
    if (data) setProduct(data);
  }, [data]);

  // Change product
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setProduct({ ...product, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  // Set category change
  function handleSelectCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    setProduct({ ...product, CategoryId: event.target.value });
    setError({ ...error, CategoryId: "" });
  }

  // Sbubmit data
  function handleLocalSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (validations()) {
      handleSubmit(product);
      handleClose();
    }
  }

  // Errors validations
  function validations() {
    let errors: ProductError = intProductError();
    let value = true;

    if (product.skuNumber === "") {
      errors.skuNumber = "This field can not be blank";
      value = false;
    }

    if (product.description === "") {
      errors.description = "This field can not be blank";
      value = false;
    }

    if (product.CategoryId === "") {
      errors.CategoryId = "You must select a category";
      value = false;
    }

    setError(errors);
    return value;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.headerTitle}>New product</h3>
          <button className={styles.headerClose} type="button" onClick={handleClose}>X</button>
        </header>
        <form className={styles.form} onSubmit={handleLocalSubmit}>
          <Input
            name="skuNumber"
            label="SKU Number"
            value={product.skuNumber}
            error={error.skuNumber}
            handleChange={handleChange}
          />
          <Input
            name="description"
            label="Description"
            value={product.description}
            error={error.description}
            handleChange={handleChange}
          />
          <SelectInput
            name="categories"
            label="Category"
            value={product.CategoryId}
            list={categories.map((cat) => ({ id: cat.id!, label: cat.name }))}
            error={error.CategoryId}
            handleChange={handleSelectCategory}
          />
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
