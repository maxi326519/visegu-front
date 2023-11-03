import { useEffect, useState } from "react";
import { useProducts } from "../../../../hooks/useProduct";
import { Product } from "../../../../interfaces/Product";
import { Cache } from "../../../../interfaces/Categories";

import ProductRow from "./ProductRow/ProductRow";
import ProductForm from "./ProductForm/ProductForm";
import Categories from "./Categories/Categories";
import Suppliers from "./Suppliers/Suppliers";

import styles from "./Products.module.css";
import searchSvg from "../../../../assets/icons/search.svg";
import categoriesSvg from "../../../../assets/icons/categories.svg";
import supplierSvg from "../../../../assets/icons/supplier.svg";

export default function Products() {
  const products = useProducts();
  const [form, setForm] = useState<boolean>(false);
  const [data, setData] = useState<Product | null>(null);
  const [rows, setRows] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<boolean>(false);

  // Get initial product
  useEffect(() => {
    if (products.data.length <= 0) products.get();
    if (products.categories.data.length <= 0) products.categories.get();
    if (products.suppliers.data.length <= 0) products.suppliers.get();
  }, []);

  // Filters products rows 
  useEffect(() => {
    setRows(products.data.filter((product) => {
      if (search === "") return true
      if (product.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return true
      if (product.skuNumber.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return true
      return false
    }));
  }, [search, products.data]);

  // Change search bar
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  // Edit a product
  function handleEdit(data: Product) {
    setData(data);
    handleForm();
  }

  // Toggle product form
  function handleForm() {
    setForm(!form);
    if (form) setData(null);
  }

  // Toggle categories modal
  function handleCategories() {
    setCategories(!categories);
  }

  // Toggle suppliers modal
  function handleSuppliers() {
    setSuppliers(!suppliers);
  }

  // Submit for the form
  function handleSubmit(product: Product) {
    data ? products.update(product) : products.set(product)
  }

  // Update categories list
  function handleUpdateCategories(cache: Cache) {
    products.categories.update(cache);
  }

  // Update suppliers list
  function handleUpdateSuppliers(cache: Cache) {
    products.suppliers.update(cache);
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form && <ProductForm data={data} handleClose={handleForm} handleSubmit={handleSubmit} />}
      {categories && <Categories data={products.categories.data} handleSubmit={handleUpdateCategories} handleClose={handleCategories} />}
      {suppliers && <Suppliers data={products.suppliers.data} handleSubmit={handleUpdateSuppliers} handleClose={handleSuppliers} />}
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
            onClick={handleSuppliers}
          >
            <img src={supplierSvg} alt="suppliers" />
            <span>Suppliers</span>
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
          <span>Quantity</span>
          <span>Category</span>
          <span>Actions</span>
        </div>
        <div className={styles.body}>
          {rows?.length <= 0 ? (
            <tr className={styles.emptyRows}>
              <th>No Products</th>
            </tr>
          ) : (
            rows?.map((product: Product) => (
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
