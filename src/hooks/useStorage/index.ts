import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import { useState } from "react";
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
  remove: (id: number) => void;
}

export function useStorage() {
  const dispatch = useDispatch();
  const storageData = useSelector((state: RootState) => state.storage);
  const [loading, setLoading] = useState(false);

  async function setStorageItem(storage: Storage) {
    setLoading(true);
    await dispatch<any>(postStorage(storage))
      .then(() => {
        setLoading(false);
        swal("Created", "Storage created succesfully", "success");
      })
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
        swal(
          "Error",
          "Error to create the storage, try later",
          "error"
        );
      });
  }

  async function getStorageData() {
    setLoading(true);
    await dispatch<any>(getStorage())
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

  async function updateStorageItem(storage: Storage) {
    setLoading(true);
    await dispatch<any>(updateStorage(storage))
      .then(() => {
        setLoading(false);
        swal("Updated", "Storage updated succesfully", "success");
      })
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
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
          setLoading(true);
          await dispatch<any>(deleteStorage(id))
            .then(() => {
              setLoading(false);
              swal("Deleted", "Storage deleted succesfully", "success");
            })
            .catch((error: Error) => {
              console.log(error);
              setLoading(false);
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
    loading,
    set: setStorageItem,
    get: getStorageData,
    update: updateStorageItem,
    remove: removeStorageItem,
  };
}
