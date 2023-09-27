import { AnyAction, Dispatch } from "redux";
import { MyThunkAction } from "../../../interfaces/ReduxState";
import { Movement } from "../../../interfaces/Movements";
import axios from "axios";
import { Stock } from "../../../interfaces/Stock";

// Constantes de acciones
export const POST_STOCK = "POST_STOCK";
export const GET_STOCK = "GET_STOCK";
export const UPDATE_STOCK = "UPDATE_STOCK";
export const DELETE_STOCK = "DELETE_STOCK";
export const SET_INGRESS_STOCK = "SET_INGRESS_STOCK";
export const SET_EGRESS_STOCK = "SET_EGRESS_STOCK";
export const SET_TRANSFER_STOCK = "SET_TRANSFER_STOCK";

// Acción to add a stock
export function postStock(stockData: Stock): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const newStocks = await axios.post("/stock", stockData);

      dispatch({
        type: POST_STOCK,
        payload: newStocks,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción to get all stocks
export function getStock(): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const allProduct = await axios.post("/stock");

      dispatch({
        type: GET_STOCK,
        payload: allProduct,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción to update a stock
export function updateStock(stockData: Stock): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/stock", stockData);

      dispatch({
        type: UPDATE_STOCK,
        payload: stockData,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción to delete a stock
export function deleteStock(stockId: string): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch(`/stock/${stockId}`);

      dispatch({
        type: DELETE_STOCK,
        payload: stockId,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción to add a ingress of the stock
export function setIngressStock(movement: Movement): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.post("/stock/ingress", movement);

      dispatch({
        type: SET_INGRESS_STOCK,
        payload: {
          Stock: response.data.Stock,
          Movement: response.data.Movement,
        },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción to add a egress of the stock
export function setEgressStock(movement: Movement): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.post("/stock/egress", movement);

      dispatch({
        type: SET_EGRESS_STOCK,
        payload: {
          Stock: response.data.Stock,
          Movement: response.data.Movement,
        },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Acción to transfer a stock of the storages
export function setTransferStock(movement: Movement): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.post("/stock/transfer", movement);

      dispatch({
        type: SET_TRANSFER_STOCK,
        payload: {
          Stocks: {
            egress: response.data.Stock.egress,
            ingress: response.data.tock.ingress,
          },
          Movements: {
            egress: response.data.Movements.egress,
            ingress: response.data.Movements.ingress,
          },
        },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
