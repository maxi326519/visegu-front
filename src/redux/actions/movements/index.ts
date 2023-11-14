import { Dispatch, AnyAction } from "redux";
import { MyThunkAction } from "../../../interfaces/ReduxState";
import axios from "axios";
import { Movement } from "../../../interfaces/Movements";

// Action constants
export const POST_MOVEMENT = "POST_MOVEMENT";
export const GET_MOVEMENT = "GET_MOVEMENT";
export const UPDATE_MOVEMENT = "UPDATE_MOVEMENT";
export const DELETE_MOVEMENT = "DELETE_MOVEMENT";

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

      dispatch({
        type: DELETE_MOVEMENT,
        payload: movement,
      });
    } catch (error: any) {
      throw new Error(error?.response?.data.error || error);
    }
  };
}
