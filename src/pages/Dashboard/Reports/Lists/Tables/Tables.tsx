import { useDispatch, useSelector } from "react-redux";
import { deleteItem, setItem } from "../../../../../redux/actions/reports";
import { useState, useEffect } from "react";
import { ReportLists } from "../../../../../interfaces/ReportsModels/Lists";
import { RootState } from "../../../../../interfaces/ReduxState";
import swal from "sweetalert";

import styles from "./Tables.module.css";

interface Props {
  name: string;
  handleOpenLoading: () => void;
  handleCloseLoading: () => void;
}

interface Cache {
  new: string[];
  deleted: string[];
}

const initCache = (): Cache => ({
  new: [],
  deleted: [],
});

export default function Tables({
  name,
  handleOpenLoading,
  handleCloseLoading,
}: Props) {
  const dispatch = useDispatch();
  const lists: ReportLists = useSelector(
    (state: RootState) => state.reports.lists
  );
  const [newData, setNewData] = useState<any>("");
  const [cache, setCache] = useState<Cache>(initCache);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setCache(initCache);
    for (let item in lists) {
      if (item === name) {
        setData(lists[item as keyof typeof lists]);
      }
    }
  }, [name, setData, lists]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cache.new.length > 0) {
      handleOpenLoading();
      dispatch<any>(setItem(name, cache.new))
        .then(() => {
          swal("Actualizado", "Datos Actualizados", "success");
          handleCloseLoading();
        })
        .catch((error: any) => {
          handleCloseLoading();
          console.log(error);
          swal("Error", "No se pudo actualizar los datos", "error");
        });
    }
    if (cache.deleted.length > 0) {
      handleOpenLoading();
      dispatch<any>(deleteItem(name, cache.deleted))
        .then(() => {
          swal("Actualizado", "Datos Actualizados", "success");
          handleCloseLoading();
        })
        .catch((error: any) => {
          handleCloseLoading();
          console.log(error);
          swal("Error", "No se pudo actualizar los datos", "error");
        });
    }
    setCache(initCache);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Add format to value
    let value: any = event.target.value;

    // Set value
    setNewData(value);

    // Clear error
    setError("");
  }

  function handleAdd() {
    // if it's not a empty strign
    if (newData !== "") {
      // If the data is not repeat
      if (!data.includes(newData)) {
        setData([...data, newData]);
        setCache({ ...cache, new: [...cache.new, newData] });
        setNewData("");
      } else {
        // if the adata is repeat, set error
        setError("Ya existe en el listado");
      }
    }
  }

  function handleRemove(item: string) {
    // Filter data to remove
    setData(data.filter((itemData: string) => itemData !== item));

    //
    if (cache.new.some((cache) => cache === item)) {
      setCache({
        ...cache,
        new: cache.new.filter((cache: string) => cache !== item),
      });
    } else {
      setCache({ ...cache, deleted: [...cache.deleted, item] });
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.categoriesList}>
        {data.length > 0 ? (
          data
            .filter((item) => typeof item === "string")
            .map((data, index) => (
              <div key={index} className={styles.row}>
                <span>{typeof data === "string" ? data : ""}</span>
                <div
                  className="btn btn-close"
                  onClick={() => handleRemove(data)}
                />
              </div>
            ))
        ) : (
          <span className={styles.empty}>Empty</span>
        )}
      </div>
      <div>
        <div className={styles.formContainer}>
          {name === "diasFestivos" ? (
            <input
              className="form-control"
              id="fecha"
              type="date"
              placeholder="Fecha"
              value={newData}
              onChange={handleChange}
            />
          ) : name === "tipoProceso" ? (
            <div className={styles.inputs}>
              <input
                className="form-control"
                id="tipo"
                name="tipo"
                type="text"
                placeholder="Tipo"
                value={newData?.tipo || ""}
                onChange={handleChange}
              />
              <input
                className="form-control"
                id="dias"
                name="dias"
                type="number"
                placeholder="Dias"
                value={newData?.dias || ""}
                onChange={handleChange}
              />
            </div>
          ) : name === "salariosMinimos" ? (
            <div className={styles.inputs}>
              <input
                className="form-control"
                id="fecha"
                name="fecha"
                type="number"
                placeholder="Año"
                value={newData?.fecha || ""}
                onChange={handleChange}
              />
              <input
                className="form-control"
                id="salario"
                name="salario"
                type="number"
                placeholder="Salario"
                value={newData?.salario || ""}
                onChange={handleChange}
              />
            </div>
          ) : (
            <input
              className="form-control"
              id="add"
              type="text"
              placeholder="Datos"
              value={newData}
              onChange={handleChange}
            />
          )}
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleAdd}
          >
            +
          </button>
        </div>
        <small>{error}</small>
        <button
          className="btn btn-outline-primary"
          type="submit"
          disabled={cache.new.length <= 0 && cache.deleted.length <= 0}
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
