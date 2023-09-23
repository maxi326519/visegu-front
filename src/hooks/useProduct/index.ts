import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../interfaces/ReduxState";
import { Product } from "../../interfaces/Product";
import {
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/actions/products";
import swal from "sweetalert";

export interface UseProducts {
  data: Product[];
  loading: boolean;
  set: (product: Product) => void;
  get: (productId: string) => void;
  update: (product: Product) => void;
  remove: (productId: string) => void;
}

export function useProducts(): UseProducts {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.data);
  const [loading, setLoading] = useState(false);

  async function setProduct(product: Product) {
    setLoading(true);
    try {
      await dispatch<any>(postProduct(product));
      setLoading(false);
      swal("Creado", "Producto creado con éxito", "success");
    } catch (error) {
      setLoading(false);
      swal(
        "Error",
        "Hubo un error al crear el producto, inténtelo más tarde",
        "error"
      );
    }
  }

  async function getProductById(productId: string) {
    setLoading(true);
    try {
      await dispatch<any>(getProduct(productId));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      swal(
        "Error",
        "Hubo un error al obtener los productos, inténtelo más tarde",
        "error"
      );
    }
  }

  async function updateProductById(product: Product) {
    setLoading(true);
    try {
      await dispatch<any>(updateProduct(product));
      setLoading(false);
      swal("Actualizado", "Producto actualizado con éxito", "success");
    } catch (error) {
      setLoading(false);
      swal(
        "Error",
        "Hubo un error al actualizar el producto, inténtelo más tarde",
        "error"
      );
    }
  }

  async function removeProductById(productId: string) {
    setLoading(true);
    try {
      await dispatch<any>(deleteProduct(productId));
      setLoading(false);
      swal("Eliminado", "Producto eliminado con éxito", "success");
    } catch (error) {
      setLoading(false);
      swal(
        "Error",
        "Hubo un error al eliminar el producto, inténtelo más tarde",
        "error"
      );
    }
  }

  return {
    data: products,
    loading,
    set: setProduct,
    get: getProductById,
    update: updateProductById,
    remove: removeProductById,
  };
}
