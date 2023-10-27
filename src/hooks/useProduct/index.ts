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
} from "../../redux/actions/products";
import swal from "sweetalert";

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
}

export function useProducts(): UseProducts {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.data);
  const categories = useSelector(
    (state: RootState) => state.products.categories
  );
  const [loading, setLoading] = useState(false);

  async function setProduct(product: Product): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(postProduct(product));
      setLoading(false);
      swal("Creado", "Producto creado con éxito", "success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Hubo un error al crear el producto, inténtelo más tarde",
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
        "Hubo un error al obtener los productos, inténtelo más tarde",
        "error"
      );
    }
  }

  async function updateProductById(product: Product): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(updateProduct(product));
      setLoading(false);
      swal("Actualizado", "Producto actualizado con éxito", "success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Hubo un error al actualizar el producto, inténtelo más tarde",
        "error"
      );
    }
  }

  async function removeProductById(productId: string): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(deleteProduct(productId));
      setLoading(false);
      swal("Eliminado", "Producto eliminado con éxito", "success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Hubo un error al eliminar el producto, inténtelo más tarde",
        "error"
      );
    }
  }

  async function updateCategoriesItems(cache: Cache): Promise<any> {
    setLoading(true);
    try {
      await dispatch<any>(updateCategories(cache));
      setLoading(false);
      swal("Creado", "Categorias actualizadas con éxito", "success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal(
        "Error",
        "Hubo un error al actualizar las categorias, inténtelo más tarde",
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
        "Hubo un error al actualizar las categorias, inténtelo más tarde",
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
  };
}
