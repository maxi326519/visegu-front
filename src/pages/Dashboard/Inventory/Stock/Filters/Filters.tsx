import { useState } from "react";

import style from "./Filter.module.css";
import filterSvg from "../../../../../assets/icons/filter.svg";

interface Props {
  handleSubmit: () => void;
}

export default function Filters({
  handleSubmit,
}: Props) {
  const [filter, setFilter] = useState<boolean>(false);

  function handleFilter() {
    setFilter(!filter);
  }

  return (
    <div className={style.filter}>
      <button className={`btn btn-outline-primary ${style.btnFilter}`} type="button" onClick={handleFilter}>
        <span>Filters</span>
        <img src={filterSvg} alt="filtros" />
      </button>
      {filter ? (
        <div className={style.filterContainer}>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleSubmit}
          >
            Aplicar
          </button>
        </div>
      ) : null}
    </div>
  );
}
