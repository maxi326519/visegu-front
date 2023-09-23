import { StockState, initStockState } from "../../../interfaces/ReduxState";
import { Stock } from "../../../interfaces/Stock";
import {
  POST_STOCK,
  GET_STOCK,
  UPDATE_STOCK,
  DELETE_STOCK,
  SET_INGRESS_STOCK,
  SET_EGRESS_STOCK,
  SET_TRANSFER_STOCK,
} from "../../actions/stock";

const initialState: StockState = initStockState();

const stockReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case POST_STOCK:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case GET_STOCK:
      return action.payload;

    case UPDATE_STOCK:
      return {
        ...state,
        data: state.data.map((stockItem: Stock) =>
          stockItem.id === action.payload.id ? action.payload : stockItem
        ),
      };

    case DELETE_STOCK:
      return {
        ...state,
        data: state.data.filter(
          (stockItem: Stock) => stockItem.id !== action.payload
        ),
      };

    case SET_INGRESS_STOCK:
      return {
        ...state,
        data: state.data.map((stockItem: Stock) =>
          stockItem.id === action.payload.productId ? stockItem : stockItem
        ),
      };

    case SET_EGRESS_STOCK:
      return {
        ...state,
        data: state.data.map((stockItem: Stock) =>
          stockItem.id === action.payload.id
            ? {
                ...stockItem,
                quantity: stockItem.quantity - action.payload.quantity,
              }
            : stockItem
        ),
      };

    case SET_TRANSFER_STOCK:
      return {
        ...state,
        data: state.data.map((stockItem: Stock) => {
          if (stockItem.id === action.payload.id) {
            // Al stock de egreso le restamos
            return {
              ...stockItem,
              quantity: stockItem.quantity - action.payload.quantity,
            };
          } else if (stockItem.StorageId === action.payload.Storage.ingress) {
            // AL stock de ingreso le sumamos
            return {
              ...stockItem,
              quantity: stockItem.quantity + action.payload.quantity,
            };
          } else {
            // Si no es ninguno de los anteriores devolvemos igual
            return stockItem;
          }
        }),
      };

    default:
      return state;
  }
};

export default stockReducer;
