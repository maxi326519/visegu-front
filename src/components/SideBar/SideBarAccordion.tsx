import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import { UserRol } from "../../interfaces/User";

import users from "../../assets/icons/users.svg";
import products from "../../assets/icons/product.svg"
import stock from "../../assets/icons/stock.svg";
import storages from "../../assets/icons/storages.svg";
import search from "../../assets/icons/search.svg";
import movements from "../../assets/icons/transfer.svg";

import logo from "../../assets/img/logo.png";

import SideDropDown from "./SideDropDown/SideDropDown";
import SideItem from "./SideItem/SideItem";

import styles from "./SideBarAccordion.module.css";

const sideList = [
  {
    label: "Users",
    icon: users,
    path: "/dashboard/users",
    permissions: UserRol.USER,
  },
  {
    label: "Inventory",
    icon: stock,
    permissions: UserRol.USER,
    subList: [
      {
        label: "Products",
        icon: products,
        path: "/dashboard/inventory/products",
      },
      {
        label: "Stock",
        icon: stock,
        path: "/dashboard/inventory/stock",
      },
      {
        label: "Storages",
        icon: storages,
        path: "/dashboard/inventory/storages",
      },
    ],
  },
  {
    label: "Movements",
    path: "/dashboard/movements",
    icon: movements,
    permissions: UserRol.USER,
  },
];

export default function SideBarAccordion() {
  const user = useSelector((state: RootState) => state.login);

  return (
    <div className={styles.sideBar}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      {sideList.map((item) =>
        // If user is admin
        /*         user.rol === UserRol.ADMIN || */
        // If permissions is any
        item.permissions === UserRol.USER
        && (
          // If item has sublist
          item.subList ? (
            <SideDropDown
              icon={item.icon}
              label={item.label}
              list={item.subList}
            />
          ) : (
            <SideItem icon={item.icon} label={item.label} path={item.path} />
          )
        )
      )}
    </div>
  );
}
