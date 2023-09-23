import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import { useState } from "react";
import { Movement, MovementFilters } from "../../interfaces/Movements";

export interface UseMovements {
  data: Movement[];
  filters: {
    data: MovementFilters;
    set: (filters: MovementFilters) => void;
  };
  set: (movement: Movement) => void;
  get: (filters: MovementFilters) => void;
  update: (movement: Movement) => void;
  delete: (movementId: string) => void;
}

export function useMovements() {
  const movements = useSelector((state: RootState) => state.movements.data);
  const [filters, setFilters] = useState();

  function getMovements(filters: MovementFilters) {}

  function deleteMovements(movementId: string) {}

  function setIngressMovements(movements: Movement) {}

  function setEgressMovements(movements: Movement) {}

  function setTransferMovements(movements: Movement) {}

  return {
    data: movements,
    filters: {
      data: filters,
      set: setFilters,
    },
    get: getMovements,
    delete: deleteMovements,
    setIngress: setIngressMovements,
    setEgress: setEgressMovements,
    setTransfer: setTransferMovements,
  };
}
