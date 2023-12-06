import { UserState, initUserState } from "../../../interfaces/ReduxState";
import { AnyAction } from "redux";
import { LOG_OUT } from "../../actions/login";
import {
  SET_USER,
  GET_USERS,
  UPDATE_USER,
  DELETE_USER,
} from "../../actions/users";

const initialState: UserState = initUserState();

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return [...state, action.payload];

    case GET_USERS:
      return action.payload;

    case UPDATE_USER:
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );

    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);

    case LOG_OUT:
      return initUserState();

    default:
      return state;
  }
};

export default userReducer;
