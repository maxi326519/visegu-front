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
        data: [...state.data, action.payload.Stock],
      };

    case GET_STOCK:
      return {
        ...state,
        data: action.payload,
      };

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
      console.log(action.payload);
      const egressStock = action.payload.Stocks.egress;
      const ingressStock = action.payload.Stocks.ingress;

      // Update egress stock
      let stock = state.data.map((item: Stock) =>
        item.id === egressStock.id ? egressStock : item
      );

      // Get ingress stock to state
      const ingressStockFromState = state.data.find(
        (stock) => stock.id === ingressStock.id
      );

      // If exist
      if (ingressStockFromState) {
        // Rempalce it
        stock = stock.map((item: Stock) =>
          item.id === ingressStock.id ? ingressStock : item
        );
      } else {
        // Else add it
        stock = [...stock, ingressStock];
      }

      return {
        ...state,
        data: stock,
      };

    default:
      return state;
  }
};

export default stockReducer;
