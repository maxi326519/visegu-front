import { useEffect, useState } from "react";
import { Categories } from "../../../../../interfaces/Categories";
import { Suppliers } from "../../../../../interfaces/Suppliers";
import {
  ProductFilters,
  initProductFilters,
} from "../../../../../interfaces/Product";

import SelectInput from "../../../../../components/Inputs/SelectInput";

import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/icons/filter.svg";

interface Props {
  handleSubmit: (filters: ProductFilters) => void;
  filters: ProductFilters;
  categories: Categories[];
  suppliers: Suppliers[];
}

export default function Filters({
  handleSubmit,
  filters,
  categories,
  suppliers,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<ProductFilters>(initProductFilters());

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
            name="supplier"
            label="Supplier"
            list={suppliers.map((supplier) => ({
              id: supplier.id!,
              label: supplier.name,
            }))}
            value={filter.supplier}
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
        </form>
      ) : null}
    </div>
  );
}
