import { combineReducers } from "redux";
import { movementReducer } from "./HistoryReducer";
import { loadingReducer } from "./LoadingReducer";
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
