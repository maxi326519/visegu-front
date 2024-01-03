import { Movement, MovementType } from "../../../interfaces/Movements";
import { Dispatch, AnyAction } from "redux";
import { MyThunkAction } from "../../../interfaces/ReduxState";
import axios from "axios";

// Action constants
export const POST_MOVEMENT = "POST_MOVEMENT";
export const GET_MOVEMENT = "GET_MOVEMENT";
export const UPDATE_MOVEMENT = "UPDATE_MOVEMENT";
export const DELETE_INGRESS_MOVEMENT = "DELETE_INGRESS_MOVEMENT";
export const DELETE_EGRESS_MOVEMENT = "DELETE_EGRESS_MOVEMENT";
export const DELETE_TRANSFER_MOVEMENT = "DELETE_TRANSFER_MOVEMENT";

// Action to get all movements
export function getMovements(): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Get data
      const response = await axios.get("/movements");

      // Format date
      let allMovements = response.data.map((data: any) => ({
        ...data,
        date: data.date && new Date(data.date),
        Stocks: {
          egress: data.StockEgressId,
          ingress: data.StockIngressId,
        },
        Storage: {
          egress: data.StorageEgressId,
          ingress: data.StorageIngressId,
        },
      }));

      dispatch({
        type: GET_MOVEMENT,
        payload: allMovements,
      });
    } catch (error: any) {
      throw new Error(error?.response?.data.error || error);
    }
  };
}

// Action to delete a movement
export function deleteMovement(movement: Movement): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.delete(`/movements/${movement.id}`);

      let type = "";

      if (movement.type === MovementType.INGRESS)
        type = DELETE_INGRESS_MOVEMENT;
      if (movement.type === MovementType.EGRESS)
        type = DELETE_EGRESS_MOVEMENT;
      if (movement.type === MovementType.TRANFER)
        type = DELETE_TRANSFER_MOVEMENT;

      console.log("Tipo", type);
      console.log("Movimientos", movement);

      dispatch({
        type: type,
        payload: movement,
      });
    } catch (error: any) {
      throw new Error(error?.response?.data.error || error);
    }
  };
}
