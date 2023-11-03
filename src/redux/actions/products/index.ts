import { MyThunkAction } from "../../../interfaces/ReduxState";
import { Product } from "../../../interfaces/Product";
import { Cache, Categories } from "../../../interfaces/Categories";
import axios from "axios";
import { Suppliers } from "../../../interfaces/Suppliers";

// Product
export const POST_PRODUCT = "POST_PRODUCT";
export const GET_PRODUCT = "GET_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

// Categories
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const GET_CATEGORIES = "GET_CATEGORIES";

// Suppliers
export const UPDATE_SUPPLIERS = "UPDATE_SUPPLIERS";
export const GET_SUPPLIERS = "GET_SUPPLIERS";

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
      console.log(error);
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
      // Post new categories
      const postResponse = await Promise.all([...cache.new.map((cat) => axios.post("/categories", cat))]);

      // Delete categories
      await Promise.all([...cache.remove.map((cat) => axios.delete(`/categories/${cat.id}`))]);

      // New categories
      let categories: Categories[] = [];

      // Get new categories
      postResponse.forEach((response) => {
        categories.push(response.data as Suppliers);
      });

      dispatch({
        type: UPDATE_CATEGORIES,
        payload: {
          new: categories,
          remove: cache.remove
        },
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


// Acción para actualizar los proveedores
export function updateSuppliers(cache: Cache): MyThunkAction {
  return async (dispatch) => {
    try {
      // Post new suppliers
      const postResponse = await Promise.all([...cache.new.map((cat) => axios.post("/suppliers", cat))]);

      // Delete suppliers
      await Promise.all([...cache.remove.map((cat) => axios.delete(`/suppliers/${cat.id}`))]);

      // New suppliers
      let suppliers: Suppliers[] = [];

      // Get new suppliers
      postResponse.forEach((response) => {
        suppliers.push(response.data as Suppliers);
      });

      dispatch({
        type: UPDATE_SUPPLIERS,
        payload: {
          new: suppliers,
          remove: cache.remove
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

// Acción para obtener todas los proveedores
export function getSuppliers(): MyThunkAction {
  return async (dispatch) => {
    try {
      const allSuppliers = await axios.get("/suppliers");

      dispatch({
        type: GET_SUPPLIERS,
        payload: allSuppliers.data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
