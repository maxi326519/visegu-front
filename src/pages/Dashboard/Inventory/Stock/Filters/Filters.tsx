import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/ReduxState";
import {
  StockFilters,
  initStockFilters,
} from "../../../../../interfaces/Stock";

import SelectInput from "../../../../../components/Inputs/SelectInput";

import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/icons/filter.svg";

interface Props {
  handleSubmit: (filters: StockFilters) => void;
  filters: StockFilters;
}

export default function Filters({ handleSubmit, filters }: Props) {
  const categories = useSelector(
    (state: RootState) => state.products.categories
  );
  const storages = useSelector((state: RootState) => state.storage);
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<StockFilters>(initStockFilters());

  useEffect(() => {
    setFilter(filters);
  }, [filters]);

  // Filter change
  function handleChangeFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  }

  // Toggle view menu
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
    handleSubmit(initStockFilters());
  }

  return (
    <div className={style.filter}>
      <button
        className={`btn btn-outline-primary ${style.btnFilter}`}
        type="button"
        onClick={handleFilter}
      >
        <span>Filters</span>
        <img src={filterSvg} alt="filtros" />
      </button>
      {open ? (
        <form className={style.filterContainer} onSubmit={handleLocalSubmit}>
          <SelectInput
            name="storage"
            label="Storage"
            list={storages.map((storage) => ({
              id: storage.id!,
              label: storage.name,
            }))}
            value={filter.storage}
            handleChange={handleChangeFilter}
          />
          <SelectInput
            name="category"
            label="Category"
            list={categories.map((category) => ({
              id: category.id!,
              label: category.name,
            }))}
            value={filter.category}
            handleChange={handleChangeFilter}
          />
          <button className="btn btn-success" type="submit">
            Aplicar
          </button>
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={handleClear}
          >
            Borrar
          </button>
        </form>
      ) : null}
    </div>
  );
}
