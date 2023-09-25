import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import { useState } from "react";
import { User } from "../../interfaces/User";
import {
  deleteUser,
  getUsers,
  postUser,
  updateUser,
} from "../../redux/actions/users";
import swal from "sweetalert";

export interface UseUsers {
  data: User[];
  loading: boolean;
  set: (user: User) => void;
  get: () => void;
  update: (user: User) => void;
  delete: (userId: string) => void;
}

export function useUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const [loading, setLoading] = useState(false);

  async function setUser(user: User) {
    setLoading(true);
    await dispatch<any>(postUser(user))
      .then(() => {
        setLoading(false);
        swal("Creado", "Almacenamiento creado con éxito", "success");
      })
      .catch(() => {
        setLoading(false);
        swal(
          "Error",
          "Hubo un error al crear el almacenamiento, inténtelo más tarde",
          "error"
        );
      });
  }

  async function getUsersData() {
    setLoading(true);
    await dispatch<any>(getUsers())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        swal(
          "Error",
          "Hubo un error al obtener los datos de almacenamiento, inténtelo más tarde",
          "error"
        );
      });
  }

  async function updateUserData(user: User) {
    setLoading(true);
    await dispatch<any>(updateUser(user))
      .then(() => {
        setLoading(false);
        swal("Actualizado", "Almacenamiento actualizado con éxito", "success");
      })
      .catch(() => {
        setLoading(false);
        swal(
          "Error",
          "Hubo un error al actualizar el almacenamiento, inténtelo más tarde",
          "error"
        );
      });
  }

  async function removeUsers(userId: string) {
    setLoading(true);
    await dispatch<any>(deleteUser(userId))
      .then(() => {
        setLoading(false);
        swal("Eliminado", "Almacenamiento eliminado con éxito", "success");
      })
      .catch(() => {
        setLoading(false);
        swal(
          "Error",
          "Hubo un error al eliminar el almacenamiento, inténtelo más tarde",
          "error"
        );
      });
  }

  return {
    data: users,
    set: setUser,
    get: getUsersData,
    update: updateUserData,
    delete: removeUsers,
    loading,
  };
}
