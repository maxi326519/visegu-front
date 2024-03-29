import { combineReducers } from "redux";
import { loadingReducer } from "./LoadingReducer";
import { movementReducer } from "./MovementReducer";
import productsReducer from "./ProductReducer";
import stockReducer from "./StockReducer";
import StorageReducer from "./StorageReducer";
import userReducer from "./UsersReducer";
import { loginReducer } from "./LoginReducer";
import ReportsReducer from "./ReducerReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  login: loginReducer,
  users: userReducer,
  products: productsReducer,
  stock: stockReducer,
  storage: StorageReducer,
  movements: movementReducer,
  reports: ReportsReducer,
});

export default rootReducer;
