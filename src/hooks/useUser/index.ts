import { closeLoading, openLoading } from "../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
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
  set: (user: User) => void;
  get: () => void;
  update: (user: User) => void;
  delete: (userId: string) => void;
}

export function useUsers(): UseUsers{
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  async function setUser(user: User) {
    dispatch<any>(openLoading());
    return dispatch<any>(postUser(user))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Created", "User created succesfully", "success");
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal(
          "Error",
          "Error to create the user, try later",
          "error"
        );
      });
  }

  async function getUsersData() {
    dispatch<any>(openLoading());
    return dispatch<any>(getUsers())
      .then(() => {
        dispatch<any>(closeLoading());
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal(
          "Error",
          "Error to get the storages, try later",
          "error"
        );
      });
  }

  async function updateUserData(user: User) {
    dispatch<any>(openLoading());
    return dispatch<any>(updateUser(user))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Updated", "User updated succesfully", "success");
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
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
        if (response === "Accept") {
          dispatch<any>(openLoading());
          return dispatch<any>(deleteUser(userId))
            .then(() => {
              dispatch<any>(closeLoading());
              swal("Deleted", "User deleted succesfully", "success");
            })
            .catch((error: Error) => {
              console.log(error);
              dispatch<any>(closeLoading());
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
  };
}
