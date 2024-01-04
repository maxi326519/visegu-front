import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/ReduxState";
import { Suppliers } from "../../../../interfaces/Suppliers";
import { Storage } from "../../../../interfaces/Storage";
import {
  MovementFilters,
  MovementType,
  initMovementFilters,
} from "../../../../interfaces/Movements";

import SelectInput from "../../../../components/Inputs/SelectInput";

import style from "./Filters.module.css";
import filterSvg from "../../../../assets/icons/filter.svg";

interface Props {
  handleSubmit: (filters: MovementFilters) => void;
  filters: MovementFilters;
  storages: Storage[];
  suppliers: Suppliers[];
}

export default function Filters({
  handleSubmit,
  filters,
  storages,
  suppliers,
}: Props) {
  const users = useSelector((state: RootState) => state.users);
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<MovementFilters>(initMovementFilters());

  useEffect(() => {
    setFilter(filters);
  }, [filters]);

  // Filter change
  function handleChangeFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  }

  function handleFilter() {
    setOpen(!open);
  }

  // Submit filters data
  function handleLocalSubmit(event: React.FormEvent) {
    event.preventDefault();
    handleSubmit(filter);
    handleFilter();
  }

  function handleClear() {
    handleSubmit(initMovementFilters());
  }

  return (
    <div className={style.filter}>
      <button
        className={`btn btn-outline-primary ${style.btnFilter}`}
        type="button"
        onClick={handleFilter}
      >
        <span>Filtros</span>
        <img src={filterSvg} alt="filtros" />
      </button>
      {open ? (
        <form className={style.filterContainer} onSubmit={handleLocalSubmit}>
          <SelectInput
            name="type"
            label="type"
            list={[
              {
                id: MovementType.EGRESS,
                label: MovementType.EGRESS,
              },
              {
                id: MovementType.INGRESS,
                label: MovementType.INGRESS,
              },
              {
                id: MovementType.TRANFER,
                label: MovementType.TRANFER,
              },
            ]}
            value={filter.type}
            handleChange={handleChangeFilter}
          />
          <SelectInput
            name="user"
            label="user"
            list={users.map((user) => ({
              id: user.id!,
              label: user.name,
            }))}
            value={filter.user}
            handleChange={handleChangeFilter}
          />
          <SelectInput
            name="storage"
            label="storage"
            list={storages.map((storage) => ({
              id: storage.id!,
              label: storage.name,
            }))}
            value={filter.storage}
            handleChange={handleChangeFilter}
          />
          <SelectInput
            name="supplier"
            label="Supplier"
            list={suppliers.map((supplier) => ({
              id: supplier.id!,
              label: supplier.name,
            }))}
            value={filter.supplier}
            handleChange={handleChangeFilter}
          />
          <button className="btn btn-success" type="submit">
            Aplicar
          </button>
          <button className="btn btn-outline-danger" type="button" onClick={handleClear}>
            Borrar
          </button>
        </form>
      ) : null}
    </div>
  );
}
