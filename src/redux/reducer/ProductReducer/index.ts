import {
  POST_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../../actions/products";
import {
  ProductsState,
  initProductsState,
} from "../../../interfaces/ReduxState";

const initialState: ProductsState = initProductsState();

const productsReducer = (
  state = initialState,
  action: any
): ProductsState => {
  switch (action.type) {
    case POST_PRODUCT:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case GET_PRODUCT:
      return state;

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

    default:
      return state;
  }
}

export default productsReducer;