import { combineReducers } from "redux";
import { loadingReducer } from "./LoadingReducer";
import { movementReducer } from "./MovementReducer";
import productsReducer from "./ProductReducer";
import stockReducer from "./StockReducer";
import StorageReducer from "./StorageReducer";
import userReducer from "./UsersReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  login: loadingReducer,
  users: userReducer,
  products: productsReducer,
  stock: stockReducer,
  storage: StorageReducer,
  movements: movementReducer,
});

export default rootReducer;
