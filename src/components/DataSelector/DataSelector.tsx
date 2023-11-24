import { useState } from 'react';

import styles from "./DataSelector.module.css";

type Data = Array<{ id: string, label: string }>;

interface Props {
  data: Data;
  selected: string[];
  placeHolder: string;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  multiple?: boolean;
}

export default function DataSelector({ data, selected, placeHolder, onSelect, onRemove, multiple }: Props) {
  const [search, setSearch] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event?.target.value);
  }

  function handleCheck(itemId: string) {
    if (multiple) {
      if (selected.includes(itemId)) {
        onRemove(itemId); // Desmarcar si ya está seleccionado
      } else {
        onSelect(itemId); // Marcar el nuevo elemento
      }
    } else {
      // Si la selección múltiple está deshabilitada, solo se permite la selección de un elemento
      if (selected.includes(itemId)) {
        onRemove(itemId); // Desmarcar si ya está seleccionado
      } else {
        // Desmarcar todos los elementos previamente seleccionados
        selected.forEach((id) => onRemove(id));
        onSelect(itemId); // Marcar el nuevo elemento
      }
    }
  }

  return (
    <div className={styles.dataSelector}>
      <div className="form-floating">
        <input
          id="search"
          name="search"
          className="form-control"
          type="text"
          value={search}
          onChange={handleChange}
        />
        <label htmlFor="search" className="form-label">
          {placeHolder}
        </label>
      </div>
      <div className={styles.dropBox}>
        {
          data
            .filter((item) => item.label.includes(search))
            .map((item) => (
              <div
                key={item.id}
                className={styles.dropItem}
                onClick={() => onSelect(item.id)}
              >
                <input
                  id={`check-${item.id}`}
                  name={`check-${item.id}`}
                  className="form-check-input"
                  type="checkbox"
                  checked={selected.some((id) => id === item.id)}
                  onChange={() => handleCheck(item.id!)}
                />
                <label htmlFor={`check-${item.id}`}>{item.label}</label>
              </div>
            ))
        }
      </div>
    </div>
  )
}
