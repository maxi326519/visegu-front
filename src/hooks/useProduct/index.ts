import { useDispatch, useSelector } from "react-redux";
import { Cache, Categories } from "../../interfaces/Categories";
import { RootState } from "../../interfaces/ReduxState";
import { useState } from "react";
import { Product } from "../../interfaces/Product";
import {
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  updateCategories,
  getSuppliers,
  updateSuppliers,
} from "../../redux/actions/products";
import swal from "sweetalert";
import { Suppliers } from "../../interfaces/Suppliers";

export interface UseProducts {
  data: Product[];
  loading: boolean;
  set: (product: Product) => Promise<any>;
  get: () => Promise<any>;
  update: (product: Product) => Promise<any>;
  remove: (productId: string) => Promise<any>;
  categories: {
    data: Categories[];
    get: () => Promise<any>;
    update: (cache: Cache) => Promise<any>;
  };
  suppliers: {
    data: Suppliers[];
    get: () => Promise<any>;
    update: (cache: Cache) => Promise<any>;
  };
}

export function useProducts(): UseProducts {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.data);
  const categories = useSelector(
    (state: RootState) => state.products.categories
  );
  const suppliers = useSelector(
    (state: RootState) => state.products.suppliers
  );
  const [loading, setLoading] = useState(false);

  async function setProduct(product: Product): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(postProduct(product));
      setLoading(false);
      swal("Created", "Successfully created product", "success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Error to create the product, try later",
        "error"
      );
    }
  }

  async function getAllProduct(): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(getProduct());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Error to get the products, inténtelo más tarde",
        "error"
      );
    }
  }

  async function updateProductById(product: Product): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(updateProduct(product));
      setLoading(false);
      swal("Updated", "Successfully updated product", "success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Error to update the product, try later",
        "error"
      );
    }
  }

  async function removeProductById(productId: string): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(deleteProduct(productId));
      setLoading(false);
      swal("Deleted", "Successfully deleted product", "success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Error to delete the product, try later",
        "error"
      );
    }
  }

  async function updateCategoriesItems(cache: Cache): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(updateCategories(cache));
      setLoading(false);
      swal("Updated", "Successfully updated categories", "success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Error to update the categories, try later",
        "error"
      );
    }
  }

  async function getAllCategories(): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(getCategories());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Error to get the categories, try later",
        "error"
      );
    }
  }

  async function updateSupplierItems(cache: Cache): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(updateSuppliers(cache));
      setLoading(false);
      swal("Updated", "Successfully updated suppliers", "success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Error to update the suppliers, try later",
        "error"
      );
    }
  }

  async function getAllSuppliers(): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(getSuppliers());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Error to get the suppliers, try later",
        "error"
      );
    }
  }

  return {
    data: products,
    loading,
    set: setProduct,
    get: getAllProduct,
    update: updateProductById,
    remove: removeProductById,
    categories: {
      data: categories,
      get: getAllCategories,
      update: updateCategoriesItems,
    },
    suppliers: {
      data: suppliers,
      get: getAllSuppliers,
      update: updateSupplierItems,
    }
  };
}
