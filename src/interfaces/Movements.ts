export interface Movement {
  id?: string;
  date: Date;
  type: MovementType;
  quantity: number;
  ProductId?: string;
  UserId?: string;
  Stocks: {
    egress: string;
    ingress: string;
  };
  Storage: {
    egress: string;
    ingress: string;
  };
}

export enum MovementType {
  EGRESS = "Egress",
  INGRESS = "Ingress",
  TRANFER = "Transfer",
}

export interface MovementFilters {
  type: string;
  user: string;
  storage: string;
}

export interface MovementError {
  date: string;
  type: string;
  quantity: string;
  UserId: string;
  StockId: string;
  StorageId: {
    egress: string;
    ingress: string;
  };
}

export const initMovementError = (): MovementError => ({
  date: "",
  type: "",
  quantity: "",
  UserId: "",
  StockId: "",
  StorageId: {
    egress: "",
    ingress: "",
  },
});

export const initMovement = (UserId: string): Movement => ({
  date: new Date(),
  type: MovementType.INGRESS,
  quantity: 0,
  UserId,
  Stocks: {
    egress: "",
    ingress: "",
  },
  Storage: {
    egress: "",
    ingress: "",
  },
});

export const initMovementFilters = (): MovementFilters => ({
  type: "",
  user: "",
  storage: "",
});
