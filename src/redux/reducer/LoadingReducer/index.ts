import { CLOSE_LOADING, LOADING } from "../../actions/loading";
import { AnyAction } from "redux";
import { LOG_OUT } from "../../actions/login";

export const loadingReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case LOADING:
      return true;

    case CLOSE_LOADING:
      return false;

    case LOG_OUT:
      return false;

    default:
      return state;
  }
};
