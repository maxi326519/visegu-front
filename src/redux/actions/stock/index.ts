import { AnyAction, Dispatch } from "redux";
import { MyThunkAction } from "../../../interfaces/ReduxState";
import { Movement } from "../../../interfaces/Movements";
import { Stock } from "../../../interfaces/Stock";
import axios from "axios";

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
        payload: newStocks.data,
      });
    } catch (error: any) {
      throw new Error(error?.response?.data.error || error);
    }
  };
}

// Acción to get all stocks
export function getStock(): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const allProduct = await axios.get("/stock");

      dispatch({
        type: GET_STOCK,
        payload: allProduct.data,
      });
    } catch (error: any) {
      throw new Error(error?.response?.data.error || error);
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
    } catch (error: any) {
      throw new Error(error?.response?.data.error || error);
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
    } catch (error: any) {
      throw new Error(error?.response?.data.error || error);
    }
  };
}

// Acción to add a ingress of the stock
export function setIngressStock(movement: Movement): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Post data
      const response = await axios.patch("/stock/ingress", movement);

      // Format date
      const Movement = {
        ...response.data.Movement,
        date:
          response.data.Movement.date && new Date(response.data.Movement.date),
      };

      dispatch({
        type: SET_INGRESS_STOCK,
        payload: {
          Stock: response.data.Stock,
          Product: response.data.Product,
          Movement: Movement,
        },
      });
    } catch (error: any) {
      throw new Error(error?.response?.data.error || error);
    }
  };
}

// Acción to add a egress of the stock
export function setEgressStock(movement: Movement): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Post data
      const response = await axios.patch("/stock/egress", movement);

      // Format date
      const Movement = {
        ...response.data.Movement,
        date:
          response.data.Movement.date && new Date(response.data.Movement.date),
      };

      dispatch({
        type: SET_EGRESS_STOCK,
        payload: {
          Stock: response.data.Stock,
          Product: response.data.Product,
          Movement: Movement,
        },
      });
    } catch (error: any) {
      throw new Error(error?.response?.data.error || error);
    }
  };
}

// Acción to transfer a stock of the storages
export function setTransferStock(movement: Movement): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await axios.patch("/stock/transfer", movement);

      const egressMovements = response.data.Movements.egress;
      const ingressMovements = response.data.Movements.ingress;

      dispatch({
        type: SET_TRANSFER_STOCK,
        payload: {
          Stocks: {
            egress: response.data.Stocks.egress,
            ingress: response.data.Stocks.ingress,
          },
          Movements: {
            egress: {
              ...egressMovements,
              date: new Date(egressMovements.date) || null,
            },
            ingress: {
              ...ingressMovements,
              date: new Date(egressMovements.date) || null,
            },
          },
        },
      });
    } catch (error: any) {
      throw new Error(error?.response?.data.error || error);
    }
  };
}
