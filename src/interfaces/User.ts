export interface User {
  id?: string;
  rol: UserRol;
  status: UserStatus;
  name: string;
  email: string;
  password?: string;
}

export enum UserRol {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface UserError {
  name: string;
  email: string;
  password: string;
}

export const initUser = (): User => ({
  rol: UserRol.USER,
  status: UserStatus.ACTIVE,
  name: "",
  email: "",
});

export const initUserError = (): UserError => ({
  name: "",
  email: "",
  password: "",
});
