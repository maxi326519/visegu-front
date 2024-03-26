import { initReportsState, ReportsState } from "../../../interfaces/ReduxState";
import { AnyAction } from "redux";
import { LOG_OUT } from "../../actions/login";
import { GET_REPORTS_ITEMS, SET_REPORTS_ITEM } from "../../actions/reports";

export const ReportsReducer = (
  state: ReportsState = initReportsState(),
  action: AnyAction
) => {
  switch (action.type) {
    case SET_REPORTS_ITEM:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.listName]: action.payload.newValues,
        },
      };

    case GET_REPORTS_ITEMS:
      return {
        ...state,
        lists: action.payload,
      };

    case LOG_OUT:
      return initReportsState();

    default:
      return state;
  }
};

export default ReportsReducer;
