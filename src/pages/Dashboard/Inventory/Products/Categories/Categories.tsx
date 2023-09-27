import { Cache, Categories as CategoriesTS, initCache, initCategories } from "../../../../../interfaces/Categories";
import { useState, useEffect } from "react";

import styles from "./Categories.module.css";

interface Props {
  data: CategoriesTS[];
  handleSubmit: (cache: Cache) => void;
  handleClose: () => void;
}

export default function Categories({ data, handleSubmit, handleClose }: Props) {
  const [newCategory, setNewCategory] = useState<CategoriesTS>(initCategories());
  const [categories, setCategories] = useState<CategoriesTS[]>([]);
  const [cache, setCache] = useState<Cache>(initCache());

  // Add list to categories
  useEffect(() => {
    setCategories(data);
  }, [data]);

  // Change new category
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewCategory({ ...newCategory, name: event.target.value });
  }

  // Add new category
  function handleAddCategory() {
    if (newCategory.name !== "" && !data.some((category) => category.name === newCategory.name)) {
      setCategories([...categories, newCategory]);
      setNewCategory(initCategories());

      // Add category to create in cache
      setCache({
        ...cache,
        new: [...cache.new, newCategory],
      });
    }
  }

  // Remove category
  function handleRemove(category: CategoriesTS) {
    setCategories(categories.filter((c) => c.name !== category.name));

    // Check if the category to delete is new
    if (cache.new.some((data) => data.name === newCategory.name)) {
      // If exist in cache, filter it to 'new'
      setCache({
        ...cache,
        remove: cache.remove.filter((data) => data.name !== category.name)
      });
    } else {
      // If don't exist add to cache to delete
      setCache({
        ...cache,
        remove: [...cache.remove, category],
      });
    }
  }

  // Submit data
  function handleLocalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit(cache);
    handleClose();
  }

  return (
    <div className={styles.background}>
      <form className={styles.container} onSubmit={handleLocalSubmit}>
        <div className={styles.close}>
          <h4>Categories</h4>
          <div
            className="btn btn-close"
            onClick={handleClose}
          />
        </div>
        <div className={styles.categoriesList}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className={styles.row}>
                <span>{category.name}</span>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleRemove(category)}
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
              value={newCategory.name}
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
