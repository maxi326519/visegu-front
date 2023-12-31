import { Routes, Route, useNavigate } from "react-router-dom";
import { closeLoading, openLoading } from "./redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./interfaces/ReduxState";
import { useEffect } from "react";
import { reLogin } from "./redux/actions/login";
import axios from "axios";

import Login from "./pages/Login/Login";
import SideBarAccordion from "./components/SideBar/SideBarAccordion";
import Navbar from "./components/Navbar/Navbar";
import ResetEmail from "./pages/ResetEmail/ResetEmail";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Products from "./pages/Dashboard/Inventory/Products/Products";
import Stocks from "./pages/Dashboard/Inventory/Stock/Stock";
import Storages from "./pages/Dashboard/Inventory/Storages/Storages";
import Users from "./pages/Dashboard/Users/Users";
import Movements from "./pages/Dashboard/Movements/Movements";
import Reports from "./pages/Dashboard/Reports/Reports";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading/Loading";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading);
  const redirect = useNavigate();
  const user = useSelector((state: RootState) => state.login);

  axios.defaults.baseURL = "https://api.visegu.com";
/*   axios.defaults.baseURL = "http://localhost:3001"; */

  useEffect(() => {
    redirect("/login");
    dispatch<any>(openLoading());
    dispatch<any>(reLogin())
      .then(() => {
        redirect("/dashboard/products");
        dispatch<any>(closeLoading());
      })
      .catch((error: Error) => {
        console.log(error);
        redirect("/login");
        dispatch<any>(closeLoading());
      });
  }, []);

  return (
    <div className="App">
      {loading && <Loading />}

      <Routes>
        <Route path="/reset-email" element={<ResetEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {user.id && (
        <div className="dashboard">
          <SideBarAccordion />
          <Navbar />
          <Routes>
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/stock" element={<Stocks />} />
            <Route path="/dashboard/storages" element={<Storages />} />
            <Route path="/dashboard/movements" element={<Movements />} />
            <Route path="/dashboard/reports" element={<Reports />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
