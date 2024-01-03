import { StockState, initStockState } from "../../../interfaces/ReduxState";
import { Movement } from "../../../interfaces/Movements";
import { LOG_OUT } from "../../actions/login";
import { Stock } from "../../../interfaces/Stock";
import {
  GET_STOCK,
  POST_STOCK,
  UPDATE_STOCK,
  DELETE_STOCK,
  SET_EGRESS_STOCK,
  SET_INGRESS_STOCK,
  SET_TRANSFER_STOCK,
  DELETE_TRANSFER_MOVEMENT,
  DELETE_EGRESS_MOVEMENT,
  DELETE_INGRESS_MOVEMENT,
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

    case DELETE_INGRESS_MOVEMENT:
      const ingressMovement: Movement = action.payload as Movement;

      // Find product
      const currentIngressStock = state.data.find(
        (stock) => stock.id === ingressMovement.Stocks.ingress
      );
      if (!currentIngressStock) throw new Error("Stock not found in redux");

      // Update quantity
      currentIngressStock.quantity =
        Number(currentIngressStock.quantity) - Number(ingressMovement.quantity);

      // Update product
      return {
        ...state,
        data: state.data.map((stock) =>
          stock.id === egressMovement.Stocks.ingress
            ? currentIngressStock
            : stock
        ),
      };

    case DELETE_EGRESS_MOVEMENT:
      const egressMovement: Movement = action.payload as Movement;

      // Find product
      const currentEgressStock = state.data.find(
        (stock) => stock.id === egressMovement.Stocks.egress
      );
      if (!currentEgressStock) throw new Error("Stock not found in redux");

      // Update quantity
      currentEgressStock.quantity =
        Number(currentEgressStock.quantity) + Number(egressMovement.quantity);

      // Update product
      return {
        ...state,
        data: state.data.map((stock) =>
          stock.id === egressMovement.Stocks.egress ? currentEgressStock : stock
        ),
      };

    case DELETE_TRANSFER_MOVEMENT:
      const transferMovement: Movement = action.payload as Movement;

      // Find ingress product
      const transferIngressStock = state.data.find(
        (stock) => stock.id === transferMovement.Stocks.ingress
      );
      if (!transferIngressStock) throw new Error("Stock not found in redux");

      // Find egress product
      const transferEgressStock = state.data.find(
        (stock) => stock.id === transferMovement.Stocks.egress
      );
      if (!transferEgressStock) throw new Error("Stock not found in redux");

      // Update ingress quantity
      transferIngressStock.quantity =
        Number(transferIngressStock.quantity) -
        Number(transferMovement.quantity);

      // Update egress quantity
      transferEgressStock.quantity =
        Number(transferEgressStock.quantity) +
        Number(transferMovement.quantity);

      // Update product
      return {
        ...state,
        data: state.data
          .map((stock) =>
            stock.id === transferMovement.Stocks.ingress
              ? transferIngressStock
              : stock
          )
          .map((stock) =>
            stock.id === transferMovement.Stocks.egress
              ? transferEgressStock
              : stock
          ),
      };

    case LOG_OUT:
      return initStockState();

    default:
      return state;
  }
};

export default stockReducer;
