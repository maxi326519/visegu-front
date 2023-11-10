import {
  LoginData,
  LoginError,
  initLogin,
  initLoginError,
} from "../../interfaces/Login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../redux/actions/login/index";

import styles from "./Login.module.css";
import logo from "../../assets/img/logo.png";

import Input from "../../components/Inputs/Input";
import swal from "sweetalert";
import { closeLoading, openLoading } from "../../redux/actions/loading";

export default function Login() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<LoginError>(initLoginError());
  const [user, setUser] = useState<LoginData>(initLogin());

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const name: string = e.target.name;
    const value: string = e.target.value;
    setUser({ ...user, [name]: value });
    handleValidations(name, value);
  }

  function handleValidations(name: string, value: string) {
    if (name === "email") {
      setError({ ...error, email: "" });
    } else if (name === "password") {
      setError({ ...error, password: "" });
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    dispatch(openLoading());
    dispatch<any>(login(user))
      .then(() => {
        dispatch(closeLoading());
        redirect("/dashboard/products");
      })
      .catch((err: Error) => {
        console.log(err.message);
        dispatch(closeLoading());
        if (err?.message === "User not found") {
          setError({ ...error, email: "Usuario no encontrado" });
        } else if (err?.message === "Incorrect password") {
          setError({ ...error, password: "Contraseña incorrecta" });
        } else {
          swal("Error", "No se pudo logear", "error");
        }
      });
  }

  return (
    <div className={styles.sesion}>
      <form className="toLeft" onSubmit={handleSubmit}>
        <div className={styles.header}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.content}>
          <Input
            type="email"
            name="email"
            label="Email"
            value={user.email}
            error={error.email}
            handleChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            label="Contraseña"
            value={user.password}
            error={error.password}
            handleChange={handleChange}
          />
          <button className="submit" type="submit">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}
