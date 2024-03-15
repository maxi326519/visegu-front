import { closeLoading, openLoading } from "../../../../redux/actions/loading";
import { useEffect, useState } from "react";
import { useProducts } from "../../../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usePDF } from "../../../../hooks/usePDF";
import { Cache } from "../../../../interfaces/Categories";
import {
  Product,
  ProductFilters,
  initProductFilters,
} from "../../../../interfaces/Product";
import swal from "sweetalert";

import ProductRow from "./ProductRow/ProductRow";
import ProductForm from "./ProductForm/ProductForm";
import Categories from "./Categories/Categories";
import Suppliers from "./Suppliers/Suppliers";
import Filters from "./Filters/Filters";

import styles from "./Products.module.css";
import searchSvg from "../../../../assets/icons/search.svg";
import categoriesSvg from "../../../../assets/icons/categories.svg";
import supplierSvg from "../../../../assets/icons/supplier.svg";
import printSvg from "../../../../assets/icons/printer.svg";

export default function Products() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const products = useProducts();
  const pdf = usePDF();
  const [form, setForm] = useState<boolean>(false);
  const [data, setData] = useState<Product | null>(null);
  const [rows, setRows] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<ProductFilters>(initProductFilters());
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
    dispatch(openLoading());
    setRows(
      products.data.filter((product) => {
        if (filters.category !== "" && product.CategoryId !== filters.category)
          return false;
        if (filters.supplier !== "" && product.SupplierId !== filters.supplier)
          return false;

        if (search === "") return true;
        if (
          product.description
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
          return true;
        if (
          product.skuNumber
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
          return true;
        return false;
      })
    );
    dispatch(closeLoading());
  }, [search, filters, products.data]);

  useEffect(() => {
    console.log(rows.length);
  }, [rows]);

  // Change search bar
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  // Edit a product
  function handleEdit(data: Product) {
    setData(data);
    handleForm();
  }

  // Delete a product
  function handleDelete(productId: string) {
    swal({
      icon: "warning",
      text: "Are you sure you want to delete this products?",
      buttons: {
        Accept: true,
        Cancel: true,
      },
    }).then((response) => (response = "Accept" && products.remove(productId)));
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
    if (data) {
      products.update(product);
    } else {
      products.set(product).then(() => {
        redirect(`/dashboard/stock/${product.skuNumber}`);
      });
    }
  }

  // Update categories list
  function handleUpdateCategories(cache: Cache) {
    products.categories.update(cache);
  }

  // Update suppliers list
  function handleUpdateSuppliers(cache: Cache) {
    products.suppliers.update(cache);
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
      }).then(async (response) => {
        if (response === "Yes") {
          await dispatch<any>(openLoading());
          await pdf
            .openProductPDF(
              rows,
              products.categories.data,
              products.suppliers.data
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
      {form && (
        <ProductForm
          data={data}
          handleClose={handleForm}
          handleSubmit={handleSubmit}
        />
      )}
      {categories && (
        <Categories
          data={products.categories.data}
          handleSubmit={handleUpdateCategories}
          handleClose={handleCategories}
        />
      )}
      {suppliers && (
        <Suppliers
          data={products.suppliers.data}
          handleSubmit={handleUpdateSuppliers}
          handleClose={handleSuppliers}
        />
      )}
      <div className={styles.controls}>
        <div className={styles.searchFilters}>
          <div className={styles.searchBar}>
            <input
              className="form-control"
              placeholder="Search product"
              value={search}
              onChange={handleSearch}
            />
            <button className="btn btn-outline-primary" type="button">
              <img src={searchSvg} alt="search" />
            </button>
          </div>
          <Filters
            handleSubmit={setFilters}
            filters={filters}
            categories={products.categories.data}
            suppliers={products.suppliers.data}
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
          <span>Supplier</span>
          <span>Buy Price</span>
          <span>Sale Price</span>
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
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
