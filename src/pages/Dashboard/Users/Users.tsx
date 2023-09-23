import { User } from "../../../interfaces/User";
import { useState } from "react";
import { useUsers } from "../../../hooks/useUser";

import UserRow from "./UserRow/UserRow";
import UserForm from "./UserForm/UserForm";

import styles from "./User.module.css";

export default function Users() {
  const users = useUsers();
  const [form, setForm] = useState<boolean>(false);
  const [data, setData] = useState<User | null>(null);

  function handleEdit(data: User) {
    setData(data);
    handleForm();
  }

  function handleForm() {
    setForm(!form);
    if (!form) setData(null);
  }

  function handleSubmit(user: User) {
    data ? users.update(user) : users.set(user)
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form && <UserForm data={data} handleClose={handleForm} handleSubmit={handleSubmit} />}
      <div className={styles.controls}>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={handleForm}
        >
          + New User
        </button>
      </div>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.firstRow}`}>
          <span>Name</span>
          <span>User</span>
          <span>Role</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        <div className={styles.body}>
          {users.data?.length <= 0 ? (
            <tr className={styles.emptyRows}>
              <th>No hay propiedades</th>
            </tr>
          ) : (
            users.data?.map((user: User) => (
              <UserRow
                user={user}
                handleEdit={handleEdit}
                handleDelete={users.delete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
