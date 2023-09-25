import { Stock, StockFilters, initStockFilters } from "./Stock";
import { User, UserRol, UserStatus } from "./User";
import { ThunkAction } from "redux-thunk";
import { Categories } from "./Categories";
import { AnyAction } from "redux";
import { Product } from "./Product";
import { Storage } from "./Storage";
import {
  Movement,
  MovementFilters,
  MovementType,
  initMovementFilters,
} from "./Movements";

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
  id: "ua",
  rol: UserRol.ADMIN,
  status: UserStatus.ACTIVE,
  name: "Maxi",
  email: "maxi@gmail.com",
  token: "oljikghersigbnergmrlkjndkfawdkj",
});

export const initProductsState = (): ProductsState => ({
  data: [
    {
      id: "p1",
      skuNumber: "asdasd",
      description: "Description",
      CategoryId: "c1",
    },
  ],
  categories: [
    {
      id: "c1",
      name: "Category 1",
    },
  ],
});

export const initStockState = (): StockState => ({
  data: [
    {
      id: "s1",
      quantity: 1,
      ProductId: "p1",
      StorageId: "s1",
    },
  ],
  filters: initStockFilters(),
});

export const initUserState = (): User[] => [];

export const initStorageState = (): Storage[] => [
  {
    id: "st1",
    name: "Storage 1",
    UserId: ["u1"],
  },
  {
    id: "st2",
    name: "Storage 2",
    UserId: ["u1"],
  },
];

export const initMovementState = (): MovementState => ({
  data: [
    {
      id: "h1",
      date: new Date(),
      type: MovementType.INGRESS,
      quantity: 0,
      StorageId: {
        egress: "s1",
        ingress: "s2",
      },
      UserId: "u1",
      StockId: "st1",
    },
  ],
  filters: initMovementFilters(),
});
