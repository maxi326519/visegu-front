import { AnyAction, Dispatch } from "redux";
import { MyThunkAction } from "../../../interfaces/ReduxState";
import { User } from "../../../interfaces/User";
import axios from "axios";

export const SET_USER = "SET_USER";
export const GET_USERS = "GET_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export function postUser(user: User): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const newUser = await axios.post("/users", user);

      dispatch({
        type: SET_USER,
        payload: newUser.data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getUsers(): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const allUser = await axios.get("/users");

      dispatch({
        type: GET_USERS,
        payload: allUser.data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateUser(user: User): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.patch("/users", user);

      dispatch({
        type: UPDATE_USER,
        payload: user,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteUser(id: string): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await axios.delete(`/users/${id}`);

      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
