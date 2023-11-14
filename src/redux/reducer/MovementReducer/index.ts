import { DELETE_MOVEMENT, GET_MOVEMENT } from "../../actions/movements";
import { SET_EGRESS_STOCK, SET_INGRESS_STOCK } from "../../actions/stock";
import { AnyAction } from "redux";
import {
  MovementState,
  initMovementState,
} from "../../../interfaces/ReduxState";

export const movementReducer = (
  state: MovementState = initMovementState(),
  action: AnyAction
) => {
  switch (action.type) {
    case GET_MOVEMENT:
      return {
        ...state,
        data: action.payload,
      };

    case DELETE_MOVEMENT:
      return {
        ...state,
        data: state.data.filter(
          (movement) => movement.id !== action.payload.id
        ),
      };

    case SET_INGRESS_STOCK:
      return {
        ...state,
        data: [...state.data, action.payload.Movement],
      };

    case SET_EGRESS_STOCK:
      return {
        ...state,
        data: [...state.data, action.payload.Movement],
      };

    default:
      return state;
  }
};

export default movementReducer;
