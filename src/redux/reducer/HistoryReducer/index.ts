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
    default:
      return state;
  }
};
