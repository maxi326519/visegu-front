import { closeLoading, openLoading } from "../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
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
  setIngress: (movement: Movement) => void;
  setEgress: (movement: Movement) => void;
  setTransfer: (movement: Movement) => void;
}

export function useStock(): UseStock {
  const dispatch = useDispatch();
  const stocks = useSelector((state: RootState) => state.stock.data);

  async function getStockData() {
    dispatch<any>(openLoading());
    return dispatch<any>(getStock())
      .then(() => {
        dispatch<any>(closeLoading());
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal(
          "Error",
          "Error to get the stock, try later",
          "error"
        );
      });
  }

  async function setStock(stock: Stock) {
    dispatch<any>(openLoading());
    return dispatch<any>(postStock(stock))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Created", "Stock created successfully", "success");
        getStockData(); // Actualiza los datos de stock después de crear uno nuevo
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal(
          "Error",
          "Error to create the stock, try later",
          "error"
        );
      });
  }

  async function updateStockData(stock: Stock) {
    dispatch<any>(openLoading());
    return dispatch<any>(updateStock(stock))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Updated", "Stock updated succesfully", "success");
        getStockData(); // Actualiza los datos de stock después de actualizar uno existente
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal(
          "Error",
          "Error to update the stock, try later",
          "error"
        );
      });
  }

  async function ingressStock(movement: Movement) {
    dispatch<any>(openLoading());
    return dispatch<any>(setIngressStock(movement))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Successful ingress", "Stock ingress successfully", "success");
        getStockData(); // Actualiza los datos de stock después de registrar el ingreso
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal(
          "Error",
          "Error to set the ingress, try later",
          "error"
        );
      });
  }

  async function egressStock(movement: Movement) {
    dispatch<any>(openLoading());
    return dispatch<any>(setEgressStock(movement))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Successful egress", "Egreso de stock registrado con éxito", "success");
        getStockData(); // Actualiza los datos de stock después de registrar el egreso
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal(
          "Error",
          "Error to set the egress, try later",
          "error"
        );
      });
  }

  async function transferStock(movement: Movement) {
    dispatch<any>(openLoading());
    return dispatch<any>(setTransferStock(movement))
      .then(() => {
        dispatch<any>(closeLoading());
        swal(
          "Successful transfer",
          "Stock transfer succesfully",
          "success"
        );
        getStockData(); // Actualiza los datos de stock después de realizar la transferencia
      })
      .catch((error: Error) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal(
          "Error",
          "Error to set the tranfer, try later",
          "error"
        );
      });
  }

  return {
    data: stocks,
    set: setStock,
    get: getStockData,
    update: updateStockData,
    setIngress: ingressStock,
    setEgress: egressStock,
    setTransfer: transferStock,
  };
}
