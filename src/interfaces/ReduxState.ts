import { Movement, MovementFilters, initMovementFilters } from "./Movements";
import { Stock, StockFilters, initStockFilters } from "./Stock";
import { User, UserRol, UserStatus } from "./User";
import { ThunkAction } from "redux-thunk";
import { Categories } from "./Categories";
import { AnyAction } from "redux";
import { Product } from "./Product";
import { Storage } from "./Storage";
import { Suppliers } from "./Suppliers";

export interface LoginState {
  id: string;
  rol: UserRol;
  status: UserStatus;
  name: string;
  email: string;
  token: string;
}

export interface ProductsState {
  data: Product[];
  categories: Categories[];
  suppliers: Suppliers[];
}

export interface StockState {
  data: Stock[];
  filters: StockFilters;
}

export type UserState = User[];

export interface MovementState {
  data: Movement[];
  filters: MovementFilters;
}

export interface RootState {
  loading: boolean;
  login: LoginState;
  users: User[];
  products: ProductsState;
  stock: StockState;
  storage: Storage[];
  movements: MovementState;
}

export type MyThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
>;

export const initLoginState = (): LoginState => ({
  id: "",
  rol: UserRol.ANY,
  status: UserStatus.ANY,
  name: "",
  email: "",
  token: "",
});

export const initProductsState = (): ProductsState => ({
  data: [],
  categories: [],
  suppliers: [],
});

export const initStockState = (): StockState => ({
  data: [],
  filters: initStockFilters(),
});

export const initUserState = (): User[] => [];

export const initStorageState = (): Storage[] => [];

export const initMovementState = (): MovementState => ({
  data: [],
  filters: initMovementFilters(),
});
