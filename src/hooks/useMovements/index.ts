import { deleteMovement, getMovements } from "../../redux/actions/movements";
import { closeLoading, openLoading } from "../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import { useState } from "react";
import {
  Movement,
  MovementFilters,
  initMovementFilters,
} from "../../interfaces/Movements";
import swal from "sweetalert";

export interface UseMovements {
  data: Movement[];
  filters: {
    data: MovementFilters;
    set: (filters: MovementFilters) => void;
  };
  get: (filters: MovementFilters) => void;
  delete: (movement: Movement) => void;
}

export function useMovements(): UseMovements {
  const dispatch = useDispatch();
  const movements = useSelector((state: RootState) => state.movements.data);
  const [filters, setFilters] = useState<MovementFilters>(
    initMovementFilters()
  );

  async function getAllMovements() {
    console.log("Get");
    dispatch<any>(openLoading());
    await dispatch<any>(getMovements())
      .then(() => {
        dispatch<any>(closeLoading());
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal("Error", "Error to get the movements,try later", "error");
      });
  }

  async function removeMovements(movement: Movement) {
    dispatch<any>(openLoading());
    await dispatch<any>(deleteMovement(movement))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Deleted", "Movement deleted successfully", "success");
        getMovements(); // Actualiza los datos del movimiento después de eliminar uno existente
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal("Error", "Error to delete the movement, try later", "error");
      });
  }

  return {
    data: movements,
    filters: {
      data: filters,
      set: setFilters,
    },
    get: getAllMovements,
    delete: removeMovements,
  };
}
