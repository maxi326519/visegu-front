import { MyThunkAction } from "../../../interfaces/ReduxState";
import { Product } from "../../../interfaces/Product";

// Definir constantes para las acciones
export const POST_PRODUCT = "POST_PRODUCT";
export const GET_PRODUCT = "GET_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

// Acción para agregar un producto
export function postProduct(product: Product): MyThunkAction {
  return async (dispatch) => {
    try {
      // Realizar la lógica para agregar un producto aquí

      dispatch({
        type: POST_PRODUCT,
        payload: product,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

// Acción para obtener un producto
export function getProduct(productId: string): MyThunkAction {
  return async (dispatch) => {
    try {
      // Realizar la lógica para obtener un producto aquí

      dispatch({
        type: GET_PRODUCT,
        payload: productId,
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
      // Realizar la lógica para actualizar un producto aquí

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
      // Realizar la lógica para eliminar un producto aquí

      dispatch({
        type: DELETE_PRODUCT,
        payload: productId,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
