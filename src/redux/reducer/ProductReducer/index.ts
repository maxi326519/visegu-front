import {
  POST_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_CATEGORIES,
  UPDATE_CATEGORIES,
} from "../../actions/products";
import {
  POST_STOCK,
  SET_EGRESS_STOCK,
  SET_INGRESS_STOCK,
  SET_TRANSFER_STOCK
} from "../../actions/stock";
import {
  ProductsState,
  initProductsState,
} from "../../../interfaces/ReduxState";
import { Product } from "../../../interfaces/Product";

const initialState: ProductsState = initProductsState();

const productsReducer = (state = initialState, action: any): ProductsState => {
  switch (action.type) {
    case POST_PRODUCT:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case GET_PRODUCT:
      return {
        ...state,
        data: action.payload,
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        data: state.data.filter((product) => product.id !== action.payload),
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case POST_STOCK:
      console.log(action.payload);
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === action.payload.Stock.ProductId
            ? { ...product, amount: Number(action.payload.Stock.quantity) }
            : product
        )
      }

    case SET_INGRESS_STOCK:
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === action.payload.Stock.ProductId
            ? action.payload.Product
            : product
        )
      }

    case SET_EGRESS_STOCK:
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === action.payload.Stock.ProductId
            ? action.payload.Product
            : product
        )
      }
      
    default:
      return state;
  }
};

export default productsReducer;
