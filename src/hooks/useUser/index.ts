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
        swal("Created", "User created succesfully", "success");
      })
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
        swal(
          "Error",
          "Error to create the user, try later",
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
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
        swal(
          "Error",
          "Error to get the storages, try later",
          "error"
        );
      });
  }

  async function updateUserData(user: User) {
    setLoading(true);
    await dispatch<any>(updateUser(user))
      .then(() => {
        setLoading(false);
        swal("Updated", "User updated succesfully", "success");
      })
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
        swal(
          "Error",
          "Error to update the user, try later",
          "error"
        );
      });
  }

  async function removeUsers(userId: string) {
    swal({
      icon: "info",
      text: "Are you sure you want to delete this user?",
      buttons: {
        Accept: true,
        Cancel: true
      }
    })
      .then(async (response) => {
        if (response = "Accept") {
          setLoading(true);
          await dispatch<any>(deleteUser(userId))
            .then(() => {
              setLoading(false);
              swal("Deleted", "User deleted succesfully", "success");
            })
            .catch((error: Error) => {
              console.log(error);
              setLoading(false);
              swal(
                "Error",
                "Hubo un error al eliminar el almacenamiento, try later",
                "error"
              );
            });
        }
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
