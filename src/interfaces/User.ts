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
  ANY = "",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ANY = "",
}

export interface UserError {
  rol: string;
  status: string;
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
  rol: "",
  status: "",
  name: "",
  email: "",
  password: "",
});
