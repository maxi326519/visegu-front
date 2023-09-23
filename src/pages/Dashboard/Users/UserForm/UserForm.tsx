import { useEffect, useState } from "react";
import { User, UserError, UserRol, initUser, initUserError } from "../../../../interfaces/User";

import styles from "./UserForm.module.css";
import Input from "../../../../components/Inputs/Input";
import SelectInput from "../../../../components/Inputs/SelectInput";

export interface Props {
  data: User | null;
  handleClose: () => void;
  handleSubmit: (user: User) => void;
}

export default function UserForm({ data, handleClose, handleSubmit }: Props) {
  const [user, setUser] = useState<User>(initUser());
  const [error, setError] = useState<UserError>(initUserError());

  // If data is selected for editing, update product local data
  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  // Change product
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setUser({ ...user, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  // Sbubmit data
  function handleLocalSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (validations()) {
      handleSubmit(user);
      handleClose();
    }
  }

  // Errors validations
  function validations() {
    let errors: UserError = initUserError();
    let value = true;

    if (user.name === "") {
      errors.name = "This field can not be blank";
      value = false;
    }

    if (user.email === "") {
      errors.name = "This field can not be blank";
      value = false;
    }

    if (user.password === "") {
      errors.name = "This field can not be blank";
      value = false;
    }

    setError(errors);
    return value;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.headerTitle}>New user</h3>
          <button className={styles.headerClose} type="button" onClick={handleClose}>X</button>
        </header>
        <form className={styles.form} onSubmit={handleLocalSubmit}>
          <SelectInput
            name="rol"
            label="Rol"
            value={user.rol}
            list={[
              {
                id: UserRol.USER,
                label: UserRol.USER
              },
              {
                id: UserRol.ADMIN,
                label: UserRol.ADMIN
              }
            ]}
            handleChange={handleChange}
          />
          <Input
            name="name"
            label="Name"
            value={user.name}
            handleChange={handleChange}
          />
          <Input
            name="email"
            label="Email"
            value={user.email}
            handleChange={handleChange}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={user.password}
            handleChange={handleChange}
          />
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
