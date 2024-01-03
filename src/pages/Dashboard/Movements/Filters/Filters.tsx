import { useEffect, useState } from "react";
import { Suppliers } from "../../../../interfaces/Suppliers";
import { Product } from "../../../../interfaces/Product";
import {
  MovementFilters,
  initMovementFilters,
} from "../../../../interfaces/Movements";

import SelectInput from "../../../../components/Inputs/SelectInput";

import style from "./Filters.module.css";
import filterSvg from "../../../../assets/icons/filter.svg";

interface Props {
  handleSubmit: (filters: MovementFilters) => void;
  filters: MovementFilters;
  suppliers: Suppliers[];
  products: Product[];
}

export default function Filters({
  handleSubmit,
  filters,
  suppliers,
  products,
}: Props) {
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
            name="product"
            label="Product"
            list={products.map((product) => ({
              id: product.id!,
              label: product.description,
            }))}
            value={filter.product}
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
