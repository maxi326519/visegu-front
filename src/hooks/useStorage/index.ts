import { closeLoading, openLoading } from "../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import { Storage } from "../../interfaces/Storage";
import {
  postStorage,
  getStorage,
  updateStorage,
  deleteStorage,
} from "../../redux/actions/storage";
import swal from "sweetalert";

export interface UseStorage {
  data: Storage[];
  set: (storage: Storage) => void;
  get: () => void;
  update: (storage: Storage) => void;
  remove: (id: string) => void;
}

export function useStorage(): UseStorage {
  const dispatch = useDispatch();
  const storageData = useSelector((state: RootState) => state.storage);

  async function setStorageItem(storage: Storage) {
    dispatch<any>(openLoading());
    return dispatch<any>(postStorage(storage))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Created", "Storage created succesfully", "success");
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal(
          "Error",
          "Error to create the storage, try later",
          "error"
        );
      });
  }

  async function getStorageData() {
    dispatch<any>(openLoading());
    return dispatch<any>(getStorage())
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

  async function updateStorageItem(storage: Storage) {
    dispatch<any>(openLoading());
    return dispatch<any>(updateStorage(storage))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Updated", "Storage updated succesfully", "success");
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal(
          "Error",
          "Error to update the storage, try later",
          "error"
        );
      });
  }

  async function removeStorageItem(id: string) {
    swal({
      icon: "info",
      text: "Are you sure you want to delete this storage?",
      buttons: {
        Accept: true,
        Cancel: true
      }
    })
      .then(async (response) => {
        if (response === "Accept") {
          dispatch<any>(openLoading());
          return dispatch<any>(deleteStorage(id))
            .then(() => {
              dispatch<any>(closeLoading());
              swal("Deleted", "Storage deleted succesfully", "success");
            })
            .catch((error: Error) => {
              console.log(error);
              dispatch<any>(closeLoading());
              swal(
                "Error",
                "Error to delete the storage, try later",
                "error"
              );
            });
        }
      });
  }

  return {
    data: storageData,
    set: setStorageItem,
    get: getStorageData,
    update: updateStorageItem,
    remove: removeStorageItem,
  };
}
