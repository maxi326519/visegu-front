import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";

import styles from "./Categories.module.css";
import { RootState } from "../../../../../interfaces/ReduxState";

interface Props {
  handleClose: () => void;
}

export default function Categories({ handleClose }: Props) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<string>("");
  const [categoriesList, setCategories] = useState<string[]>([]);
  const categories: string[] = [];

  useEffect(() => {
    setCategories(categories);
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCategory(event.target.value);
  }

  function handleAddCategory() {
    if (category !== "" && !categoriesList.some((c) => c === category)) {
      setCategories([...categoriesList, category]);
      setCategory("");
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleRemove(category: string) {
    setCategories(categoriesList.filter((c) => c !== category));
  }

  return (
    <div className={styles.background}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.close}>
          <h4>Categories</h4>
          <div
            className="btn btn-close"
            onClick={handleClose}
          />
        </div>
        <div className={styles.categoriesList}>
          {categoriesList.length > 0 ? (
            categoriesList.map((category, index) => (
              <div key={index} className={styles.row}>
                <span>{category}</span>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleRemove(category)}
                  disabled={category === "General" || category === "Shipping"}
                >
                  -
                </button>
              </div>
            ))
          ) : (
            <span className={styles.empty}>Empty</span>
          )}
        </div>
        <div>
          <div className={styles.formContainer}>
            <label htmlFor="add">.</label>
            <input
              className="form-control"
              id="add"
              type="text"
              value={category}
              onChange={handleChange}
            />
            <button
              className="btn btn-success"
              type="button"
              onClick={handleAddCategory}
            >
              +
            </button>
          </div>
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
