import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import swal from "sweetalert";

import userSvg from "../../assets/icons/user.svg";
import emailSvg from "../../assets/icons/email.svg";
import passSvg from "../../assets/icons/password.svg";
import logoutSvg from "../../assets/icons/logout.svg";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.login);
  const redirect = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    swal({
      text: "¿Quiere cerrar sesión?",
      icon: "info",
      buttons: {
        Si: true,
        No: true,
      },
    }).then((response) => {
      redirect("/login");
      /*       if (response === "Si")
              dispatch<any>(logOut()).then(() => redirect("/login")); */
    });
  }

  return (
    <nav className={styles.navBar}>
      <div className={styles.profile}>
        <div className={styles.userImg}>
          <img src={userSvg} alt="user" />
        </div>
        <ul className={styles.menu}>
          <li>
            <b>Perfil</b>
          </li>
          <li>{user.name}</li>
{/*           <li onClick={() => redirect("/reset-email")}>
            <img src={emailSvg} alt="email" /> <span>Cambiar correo</span>
          </li>
          <li onClick={() => redirect("/reset-password")}>
            <img src={passSvg} alt="password" /> <span>Cambiar contraseña</span>
          </li> */}
          <li onClick={handleLogout}>
            <img src={logoutSvg} alt="logout" /> <span>Cerrar sesion</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
