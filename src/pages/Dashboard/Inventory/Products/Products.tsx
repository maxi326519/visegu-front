import { useProducts } from "../../../../hooks/useProduct";
import { useEffect, useState } from "react";
import { Product } from "../../../../interfaces/Product";
import { Cache } from "../../../../interfaces/Categories";

import ProductRow from "./ProductRow/ProductRow";
import ProductForm from "./ProductForm/ProductForm";
import Categories from "./Categories/Categories";

import styles from "./Products.module.css";
import categoriesSvg from "../../../../assets/icons/categories.svg";
import searchSvg from "../../../../assets/icons/search.svg";

export default function Products() {
  const products = useProducts();
  const [form, setForm] = useState<boolean>(false);
  const [categories, setCategories] = useState<boolean>(false);
  const [data, setData] = useState<Product | null>(null);
  const [search, setSearch] = useState<string>("");

  // Get initial product
  useEffect(() => {
    if (products.data.length <= 0) {
      products.get();
      products.categories.get();
    }
  }, []);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.name);
  }

  function handleEdit(data: Product) {
    setData(data);
    handleForm();
  }

  function handleForm() {
    setForm(!form);
    if (form) setData(null);
  }

  function handleCategories() {
    setCategories(!categories);
  }

  function handleSubmit(product: Product) {
    data ? products.update(product) : products.set(product)
  }

  function handleUpdateCategories(cache: Cache) {
    products.categories.update(cache);
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form && <ProductForm data={data} handleClose={handleForm} handleSubmit={handleSubmit} />}
      {categories && <Categories data={products.categories.data} handleSubmit={handleUpdateCategories} handleClose={handleCategories} />}
      <div className={styles.controls}>
        <div className={styles.searchFilters}>
          <div className={styles.searchBar}>
            <input
              className="form-control"
              placeholder="Search stock"
              value={search}
              onChange={handleSearch}
            />
            <button className="btn btn-outline-primary" type="button">
              <img src={searchSvg} alt="search" />
            </button>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleCategories}
          >
            <img src={categoriesSvg} alt="categories" />
            <span>Categories</span>
          </button>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleForm}
          >
            + New Product
          </button>
        </div>
      </div>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.firstRow}`}>
          <span>SKU number</span>
          <span>Description</span>
          <span>Category</span>
          <span>Actions</span>
        </div>
        <div className={styles.body}>
          {products.data?.length <= 0 ? (
            <tr className={styles.emptyRows}>
              <th>No hay propiedades</th>
            </tr>
          ) : (
            products.data?.map((product: Product) => (
              <ProductRow
                key={product.id}
                product={product}
                handleEdit={handleEdit}
                handleDelete={products.remove}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
