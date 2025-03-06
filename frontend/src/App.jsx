import React, { useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "../common/index.jsx";
import { useEffect } from "react";
import Context from "./context"; // Correct for default export
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice.jsx";
const App = () => {
  const dispatch = useDispatch();
  const [countCartProduct, setCountCartProduct] = useState(0);
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.Current_User.url, {
      method: SummaryApi.Current_User.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.user));
    }
  };

  const fetchAddToCartCount = async () => {
    const dataResponse = await fetch(SummaryApi.countAddToCartProduct.url, {
      method: SummaryApi.countAddToCartProduct.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    setCountCartProduct(dataApi?.data?.count);
  };

  useEffect(() => {
    /*user details*/
    fetchUserDetails();
    fetchAddToCartCount();
  }, []);

  return (
    <div className="pt-16">
      <Context.Provider
        value={{
          fetchUserDetails, //user details fetch
          countCartProduct, //current user add to cart product count
          fetchAddToCartCount,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </div>
  );
};

export default App;
