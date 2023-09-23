import { AnyAction, Dispatch } from "redux";
import { MyThunkAction } from "../../../interfaces/ReduxState";
import { Movement } from "../../../interfaces/Movements";

// Constantes de acciones
export const POST_STOCK = "POST_STOCK";
export const GET_STOCK = "GET_STOCK";
export const UPDATE_STOCK = "UPDATE_STOCK";
export const DELETE_STOCK = "DELETE_STOCK";
export const SET_INGRESS_STOCK = "SET_INGRESS_STOCK";
export const SET_EGRESS_STOCK = "SET_EGRESS_STOCK";
export const SET_TRANSFER_STOCK = "SET_TRANSFER_STOCK";

// Acción para agregar stock
export function postStock(stockData: any): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Lógica para agregar stock aquí
      dispatch({
        type: POST_STOCK,
        payload: stockData, // Puedes ajustar esto según lo necesites
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción para obtener stock
export function getStock(): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Lógica para obtener stock aquí
      dispatch({
        type: GET_STOCK,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción para actualizar stock
export function updateStock(stockData: any): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Lógica para actualizar stock aquí
      dispatch({
        type: UPDATE_STOCK,
        payload: stockData, // Puedes ajustar esto según lo necesites
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción para eliminar stock
export function deleteStock(stockId: string): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Lógica para eliminar stock aquí
      dispatch({
        type: DELETE_STOCK,
        payload: stockId, // Puedes ajustar esto según lo necesites
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción para establecer ingreso de stock
export function setIngressStock(movement: Movement): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Lógica para establecer ingreso de stock aquí
      dispatch({
        type: SET_INGRESS_STOCK,
        payload: movement,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción para establecer egreso de stock
export function setEgressStock(movement: Movement): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Lógica para establecer egreso de stock aquí
      dispatch({
        type: SET_EGRESS_STOCK,
        payload: movement,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción para establecer transferencia de stock
export function setTransferStock(movement: Movement): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Lógica para establecer transferencia de stock aquí
      dispatch({
        type: SET_TRANSFER_STOCK,
        payload: movement, // Puedes ajustar esto según lo necesites
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
