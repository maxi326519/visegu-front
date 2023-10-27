import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    redirect("/login");
    dispatch<any>(reLogin())
      .then(() => redirect("/dashboard"))
      .catch((error: Error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/reset-email" element={<ResetEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <div className="dashboard">
        <SideBarAccordion />
        <Navbar />
        <Routes>
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/inventory/products" element={<Products />} />
          <Route path="/dashboard/inventory/stock" element={<Stocks />} />
          <Route path="/dashboard/inventory/storages" element={<Storages />} />
          <Route path="/dashboard/movements" element={<Movements />} />
          {/*           <Route path="/dashboard/reports" element={<Reports />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
