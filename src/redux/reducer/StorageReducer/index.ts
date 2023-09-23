import { initStorageState } from "../../../interfaces/ReduxState";
import { AnyAction } from "redux";
import { Storage } from "../../../interfaces/Storage";
import {
  POST_STORAGE,
  GET_STORAGE,
  UPDATE_STORAGE,
  DELETE_STORAGE,
} from "../../actions/storage";

// Define el estado inicial de storage (puede variar según tus necesidades)
const initialState: Storage[] = initStorageState();

// Define el StorageReducer
const StorageReducer = (state = initialState, action: AnyAction): Storage[] => {
  switch (action.type) {
    case POST_STORAGE:
      return [...state, action.payload];

    case GET_STORAGE:
      return action.payload;

    case UPDATE_STORAGE:
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );

    case DELETE_STORAGE:
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
};

export default StorageReducer;
