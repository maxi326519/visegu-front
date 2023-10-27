import { Dispatch, AnyAction } from "redux";
import { MyThunkAction } from "../../../interfaces/ReduxState";
import axios from "axios";

// Action constants
export const POST_STORAGE = "POST_STORAGE";
export const GET_STORAGE = "GET_STORAGE";
export const UPDATE_STORAGE = "UPDATE_STORAGE";
export const DELETE_STORAGE = "DELETE_STORAGE";

// Action to post a storage
export function postStorage(data: any): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const newStorage = await axios.post("/storages", data);

      dispatch({
        type: POST_STORAGE,
        payload: newStorage.data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Action to get all storages
export function getStorage(): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const allStorages = await axios.get("/storages");

      dispatch({
        type: GET_STORAGE,
        payload: allStorages.data,
      });
    } catch (e: any) {
    console.log(e);
    throw new Error(e);
    }
  };
}

// Action to update a storage
export function updateStorage(data: any): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/storages", data);

      dispatch({
        type: UPDATE_STORAGE,
        payload: data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

// Action to delete a storage
export function deleteStorage(id: string): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.delete(`/storages/${id}`);

      dispatch({
        type: DELETE_STORAGE,
        payload: id,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
