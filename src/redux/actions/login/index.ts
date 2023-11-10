import { AnyAction, Dispatch } from "redux";
import { MyThunkAction } from "../../../interfaces/ReduxState";
import { LoginData } from "../../../interfaces/Login";
import axios from "axios";

export const LOGIN = "LOGIN";
export const PERSISTENCE = "PERSISTENCE";
export const TOKEN = "TOKEN";

export function login(login: LoginData): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Login
      const response = await axios.post("/login", login);

      // Get TOKEN and user
      let user = response.data.user;
      const token = response.data.token;
      user.token = response.data.token;

      if (!user) throw new Error("User not found");
      if (!token) throw new Error("Token error");

      // Save tocken in local storage
      localStorage.setItem(TOKEN, token);

      dispatch({
        type: LOGIN,
        payload: user,
      });
    } catch (error: any) {
      throw new Error(error?.response?.data.error|| error);
    }
  };
}

export function reLogin(): MyThunkAction {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Save tocken in local storage
      const token = localStorage.getItem(TOKEN);

      // Check token
      if (!token) throw new Error("Token don't exist");

      // Add token to axios config
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      // Login with token
      const response = await axios.post("/login/token");

      dispatch({
        type: PERSISTENCE,
        payload: response.data,
      });
    } catch (error: any) {
      throw new Error(error?.response?.data?.error|| error);
    }
  };
}
