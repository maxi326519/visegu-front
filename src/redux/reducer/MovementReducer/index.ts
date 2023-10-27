import { AnyAction } from "redux";
import {
  MovementState,
  initMovementState,
} from "../../../interfaces/ReduxState";
import {
  POST_STOCK,
  SET_EGRESS_STOCK,
  SET_INGRESS_STOCK,
  SET_TRANSFER_STOCK,
} from "../../actions/stock";
import { Movement } from "../../../interfaces/Movements";

export const movementReducer = (
  state: MovementState = initMovementState(),
  action: AnyAction
) => {
  switch (action.type) {
    case POST_STOCK:
      return {
        ...state,
        data: [...state.data, action.payload.Movement],
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

    case SET_TRANSFER_STOCK:
      return {
        ...state,
        data: [
          ...state.data,
          action.payload.Movements.egress,
          action.payload.Movements.ingress,
        ],
      };

    default:
      return state;
  }
};

export default movementReducer;
