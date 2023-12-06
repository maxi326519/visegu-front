import { Movement, MovementType } from "../../../interfaces/Movements";
import { DELETE_MOVEMENT } from "../../actions/movements";
import { Categories } from "../../../interfaces/Categories";
import { Suppliers } from "../../../interfaces/Suppliers";
import { LOG_OUT } from "../../actions/login";
import {
  GET_PRODUCT,
  POST_PRODUCT,
  GET_SUPPLIERS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_CATEGORIES,
  UPDATE_SUPPLIERS,
  UPDATE_CATEGORIES,
} from "../../actions/products";
import {
  POST_STOCK,
  SET_EGRESS_STOCK,
  SET_INGRESS_STOCK,
} from "../../actions/stock";
import {
  ProductsState,
  initProductsState,
} from "../../../interfaces/ReduxState";

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
        categories: [...state.categories, ...action.payload.new].filter(
          (supplier: Categories) =>
            !action.payload.remove.some(
              (item: Categories) => item.id === supplier.id
            )
        ),
      };

    case UPDATE_SUPPLIERS:
      return {
        ...state,
        suppliers: [...state.suppliers, ...action.payload.new].filter(
          (supplier: Suppliers) =>
            !action.payload.remove.some(
              (item: Suppliers) => item.id === supplier.id
            )
        ),
      };

    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload,
      };

    case POST_STOCK:
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === action.payload.Stock.ProductId
            ? { ...product, amount: Number(action.payload.Stock.quantity) }
            : product
        ),
      };

    case SET_INGRESS_STOCK:
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === action.payload.Stock.ProductId
            ? action.payload.Product
            : product
        ),
      };

    case SET_EGRESS_STOCK:
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === action.payload.Stock.ProductId
            ? action.payload.Product
            : product
        ),
      };

    case DELETE_MOVEMENT:
      const movement: Movement = action.payload as Movement;

      // Find product
      const currentProduct = state.data.find(
        (product) => product.id === movement.ProductId
      );
      if (!currentProduct) throw new Error("Product not found in redux");

      // Update quantity
      movement.type === MovementType.INGRESS
        ? (currentProduct.amount =
            Number(currentProduct.amount) - Number(movement.quantity))
        : (currentProduct.amount =
            Number(currentProduct.amount) + Number(movement.quantity));

      // Update product
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === movement.ProductId ? currentProduct : product
        ),
      };

    case LOG_OUT:
      return initProductsState();

    default:
      return state;
  }
};

export default productsReducer;
