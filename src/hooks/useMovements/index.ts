import { Movement, MovementFilters, initMovementFilters } from "../../interfaces/Movements";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import { useState } from "react";
import swal from "sweetalert";

export interface UseMovements {
  data: Movement[];
  filters: {
    data: MovementFilters;
    set: (filters: MovementFilters) => void;
  };
  get: (filters: MovementFilters) => void;
  delete: (movementId: string) => void;
}

export function useMovements(): UseMovements {
  const dispatch = useDispatch();
  const movements = useSelector((state: RootState) => state.movements.data);
  const [filters, setFilters] = useState<MovementFilters>(initMovementFilters());
  const [loading, setLoading] = useState(false);

  async function getMovements() {
    /*     setLoading(true);
        await dispatch<any>(getMovements())
          .then(() => {
            setLoading(false);
          })
          .catch((error: Error) => {
            console.log(error);
            setLoading(false);
            swal(
              "Error",
              "Error to get the movements,try later",
              "error"
            );
          }); */
  }

  async function deleteMovements(movementId: string) {
    /*     setLoading(true);
        await dispatch<any>(deleteMovements(movementId))
          .then(() => {
            setLoading(false);
            swal("Deleted", "Movement deleted successfully", "success");
            getMovements(); // Actualiza los datos del movimiento después de eliminar uno existente
          })
          .catch((error: Error) => {
            console.log(error);
            setLoading(false);
            swal(
              "Error",
              "Error to delete the movement, try later",
              "error"
            );
          }); */
  }

  return {
    data: movements,
    filters: {
      data: filters,
      set: setFilters,
    },
    get: getMovements,
    delete: deleteMovements,
  };
}
