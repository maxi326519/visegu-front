import { useDispatch, useSelector } from "react-redux";
import { postStorage, getStorage, updateStorage, deleteStorage } from "../../redux/actions/storage";
import { RootState } from "../../interfaces/ReduxState";
import { useState } from "react";
import { Storage } from "../../interfaces/Storage";
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

  async function getStorageData() {
    setLoading(true);
    await dispatch<any>(getStorage())
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

  async function updateStorageItem(storage: Storage) {
    setLoading(true);
    await dispatch<any>(updateStorage(storage))
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

  async function removeStorageItem(id: number) {
    setLoading(true);
    await dispatch<any>(deleteStorage(id))
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
    data: storageData,
    loading,
    set: setStorageItem,
    get: getStorageData,
    update: updateStorageItem,
    remove: removeStorageItem,
  };
}
