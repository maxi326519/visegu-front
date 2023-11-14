import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import { UserRol } from "../../interfaces/User";

import SideItem from "./SideItem/SideItem";

import styles from "./SideBarAccordion.module.css";
import users from "../../assets/icons/users.svg";
import products from "../../assets/icons/product.svg";
import stock from "../../assets/icons/stock.svg";
import storages from "../../assets/icons/storages.svg";
import movements from "../../assets/icons/transfer.svg";
import reports from "../../assets/icons/reports.svg";
import logo from "../../assets/img/logo.png";

const sideList = [
  {
    label: "Users",
    icon: users,
    path: "/dashboard/users",
    permissions: UserRol.ADMIN,
  },
  {
    label: "Products",
    icon: products,
    path: "/dashboard/products",
    permissions: UserRol.ADMIN,
  },
  {
    label: "Stock",
    icon: stock,
    path: "/dashboard/stock",
    permissions: UserRol.USER,
  },
  {
    label: "Storages",
    icon: storages,
    path: "/dashboard/storages",
    permissions: UserRol.ADMIN,
  },
  {
    label: "Movements",
    path: "/dashboard/movements",
    icon: movements,
    permissions: UserRol.ADMIN,
  },
  /*   {
    label: "Reports",
    path: "/dashboard/Reports",
    icon: reports,
    permissions: UserRol.USER,
  }, */
];

export default function SideBarAccordion() {
  const user = useSelector((state: RootState) => state.login);

  return (
    <div className={styles.sideBar}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      {sideList.map(
        (item) =>
          // If user is admin
          (user.rol === UserRol.ADMIN || item.permissions === UserRol.USER) && (
            <SideItem icon={item.icon} label={item.label} path={item.path} />
          )
      )}
    </div>
  );
}
