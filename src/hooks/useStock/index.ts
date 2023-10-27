import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../interfaces/ReduxState";
import { Movement } from "../../interfaces/Movements";
import { Stock } from "../../interfaces/Stock";
import {
  postStock,
  getStock,
  updateStock,
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
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
        swal(
          "Error",
          "Error to get the stock, try later",
          "error"
        );
      });
  }

  async function setStock(stock: Stock) {
    setLoading(true);
    await dispatch<any>(postStock(stock))
      .then(() => {
        setLoading(false);
        swal("Created", "Stock created successfully", "success");
        getStockData(); // Actualiza los datos de stock después de crear uno nuevo
      })
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
        swal(
          "Error",
          "Error to create the stock, try later",
          "error"
        );
      });
  }

  async function updateStockData(stock: Stock) {
    setLoading(true);
    await dispatch<any>(updateStock(stock))
      .then(() => {
        setLoading(false);
        swal("Updated", "Stock updated succesfully", "success");
        getStockData(); // Actualiza los datos de stock después de actualizar uno existente
      })
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
        swal(
          "Error",
          "Error to update the stock, try later",
          "error"
        );
      });
  }

  async function ingressStock(movement: Movement) {
    setLoading(true);
    await dispatch<any>(setIngressStock(movement))
      .then(() => {
        setLoading(false);
        swal("Successful ingress", "Stock ingress successfully", "success");
        getStockData(); // Actualiza los datos de stock después de registrar el ingreso
      })
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
        swal(
          "Error",
          "Error to set the ingress, try later",
          "error"
        );
      });
  }

  async function egressStock(movement: Movement) {
    setLoading(true);
    await dispatch<any>(setEgressStock(movement))
      .then(() => {
        setLoading(false);
        swal("Successful egress", "Egreso de stock registrado con éxito", "success");
        getStockData(); // Actualiza los datos de stock después de registrar el egreso
      })
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
        swal(
          "Error",
          "Error to set the egress, try later",
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
          "Successful transfer",
          "Stock transfer succesfully",
          "success"
        );
        getStockData(); // Actualiza los datos de stock después de realizar la transferencia
      })
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
        swal(
          "Error",
          "Error to set the tranfer, try later",
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
    setIngress: ingressStock,
    setEgress: egressStock,
    setTransfer: transferStock,
  };
}
