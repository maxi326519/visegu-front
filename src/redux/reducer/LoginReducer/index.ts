import { LOGIN, LOG_OUT, PERSISTENCE } from "../../actions/login";
import { LoginState, initLoginState } from "../../../interfaces/ReduxState";
import { AnyAction } from "redux";

export const loginReducer = (
  state: LoginState = initLoginState(),
  action: AnyAction
) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;

    case PERSISTENCE:
      return action.payload;

    case LOG_OUT:
      return initLoginState();

    default:
      return state;
  }
};
