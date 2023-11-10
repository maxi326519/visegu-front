import { LoginState, initLoginState } from "../../../interfaces/ReduxState";
import { AnyAction } from "redux";
import { LOGIN, PERSISTENCE } from "../../actions/login";

export const loginReducer = (
  state: LoginState = initLoginState(),
  action: AnyAction
) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;

    case PERSISTENCE:
      return action.payload;

    default:
      return state;
  }
};
