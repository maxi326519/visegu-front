import { MyThunkAction } from "../../../interfaces/ReduxState";
import { Product } from "../../../interfaces/Product";
import axios from "axios";
import { Cache } from "../../../interfaces/Categories";

// Definir constantes para las acciones
export const POST_PRODUCT = "POST_PRODUCT";
export const GET_PRODUCT = "GET_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const GET_CATEGORIES = "GET_CATEGORIES";

// Acción para agregar un producto
export function postProduct(product: Product): MyThunkAction {
  return async (dispatch) => {
    try {
      const newProduct = await axios.post("/products", product);

      dispatch({
        type: POST_PRODUCT,
        payload: newProduct.data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

// Acción para obtener todos lod producto
export function getProduct(): MyThunkAction {
  return async (dispatch) => {
    try {
      const allProduct = await axios.get("/products");

      dispatch({
        type: GET_PRODUCT,
        payload: allProduct.data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

// Acción para actualizar un producto
export function updateProduct(product: Product): MyThunkAction {
  return async (dispatch) => {
    try {
      await axios.patch("/products", product);

      dispatch({
        type: UPDATE_PRODUCT,
        payload: product,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

// Acción para eliminar un producto
export function deleteProduct(productId: string): MyThunkAction {
  return async (dispatch) => {
    try {
      await axios.delete(`/products/${productId}`);

      dispatch({
        type: DELETE_PRODUCT,
        payload: productId,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

// Acción para actualizar las categorias
export function updateCategories(cache: Cache): MyThunkAction {
  return async (dispatch) => {
    try {
      await Promise.all([
        cache.new.map((cat) => axios.post("/categories", cat)),
        cache.remove.map((cat) => axios.delete(`/categories/${cat.id}`)),
      ]);

      const response = await axios.get("/categories");

      dispatch({
        type: UPDATE_CATEGORIES,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

// Acción para obtener todas las categorieas
export function getCategories(): MyThunkAction {
  return async (dispatch) => {
    try {
      const allCategories = await axios.get("/categories");

      dispatch({
        type: GET_CATEGORIES,
        payload: allCategories.data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
