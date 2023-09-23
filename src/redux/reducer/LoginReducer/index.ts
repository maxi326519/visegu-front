import { LoginState, initLoginState } from "../../../interfaces/ReduxState";
import { AnyAction } from "redux";

export const loginReducer = (
  state: LoginState = initLoginState(),
  action: AnyAction
) => {
  switch (action.type) {
    default:
      return state;
  }
};
