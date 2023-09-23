import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../../interfaces/ReduxState";
import { Movement } from "../../interfaces/Movements";
import { Stock } from "../../interfaces/Stock";
import {
  postStock,
  getStock,
  updateStock,
  deleteStock,
  setIngressStock,
  setEgressStock,
  setTransferStock,
} from "../../redux/actions/stock";
import swal from "sweetalert";

export interface UseStock {
  data: Stock[];
  set: (stock: Stock) => void;
  get: () => void;
  update: (stock: Stock) => void;
  remove: (stockId: number) => void;
  setIngress: (stock: Stock) => void;
  setEgress: (stock: Stock) => void;
  setTransfer: (movement: Movement) => void;
  loading: boolean;
}

export function useStock() {
  const dispatch = useDispatch();
  const stocks = useSelector((state: RootState) => state.stock.data);
  const [loading, setLoading] = useState(false);

  async function getStockData() {
    setLoading(true);
    await dispatch<any>(getStock())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        swal(
          "Error",
          "Hubo un error al cargar los datos de stock, inténtelo más tarde",
          "error"
        );
      });
  }

  async function setStock(stock: Stock) {
    setLoading(true);
    await dispatch<any>(postStock(stock))
      .then(() => {
        setLoading(false);
        swal("Creado", "Stock creado con éxito", "success");
        getStockData(); // Actualiza los datos de stock después de crear uno nuevo
      })
      .catch(() => {
        setLoading(false);
        swal(
          "Error",
          "Hubo un error al crear el stock, inténtelo más tarde",
          "error"
        );
      });
  }

  async function updateStockData(stock: Stock) {
    setLoading(true);
    await dispatch<any>(updateStock(stock))
      .then(() => {
        setLoading(false);
        swal("Actualizado", "Stock actualizado con éxito", "success");
        getStockData(); // Actualiza los datos de stock después de actualizar uno existente
      })
      .catch(() => {
        setLoading(false);
        swal(
          "Error",
          "Hubo un error al actualizar el stock, inténtelo más tarde",
          "error"
        );
      });
  }

  async function removeStock(stockId: string) {
    setLoading(true);
    await dispatch<any>(deleteStock(stockId))
      .then(() => {
        setLoading(false);
        swal("Eliminado", "Stock eliminado con éxito", "success");
        getStockData(); // Actualiza los datos de stock después de eliminar uno existente
      })
      .catch(() => {
        setLoading(false);
        swal(
          "Error",
          "Hubo un error al eliminar el stock, inténtelo más tarde",
          "error"
        );
      });
  }

  async function ingressStock(movement: Movement) {
    setLoading(true);
    await dispatch<any>(setIngressStock(movement))
      .then(() => {
        setLoading(false);
        swal("Ingreso", "Ingreso de stock registrado con éxito", "success");
        getStockData(); // Actualiza los datos de stock después de registrar el ingreso
      })
      .catch(() => {
        setLoading(false);
        swal(
          "Error",
          "Hubo un error al registrar el ingreso de stock, inténtelo más tarde",
          "error"
        );
      });
  }

  async function egressStock(movement: Movement) {
    setLoading(true);
    await dispatch<any>(setEgressStock(movement))
      .then(() => {
        setLoading(false);
        swal("Egreso", "Egreso de stock registrado con éxito", "success");
        getStockData(); // Actualiza los datos de stock después de registrar el egreso
      })
      .catch(() => {
        setLoading(false);
        swal(
          "Error",
          "Hubo un error al registrar el egreso de stock, inténtelo más tarde",
          "error"
        );
      });
  }

  async function transferStock(movement: Movement) {
    setLoading(true);
    await dispatch<any>(setTransferStock(movement))
      .then(() => {
        setLoading(false);
        swal(
          "Transferencia",
          "Transferencia de stock realizada con éxito",
          "success"
        );
        getStockData(); // Actualiza los datos de stock después de realizar la transferencia
      })
      .catch(() => {
        setLoading(false);
        swal(
          "Error",
          "Hubo un error al realizar la transferencia de stock, inténtelo más tarde",
          "error"
        );
      });
  }

  return {
    data: stocks,
    loading,
    set: setStock,
    get: getStockData,
    update: updateStockData,
    remove: removeStock,
    setIngress: ingressStock,
    setEgress: egressStock,
    setTransfer: transferStock,
  };
}
