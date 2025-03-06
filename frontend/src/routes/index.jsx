import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home.jsx";
import Login from "../pages/auth/Login.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import SignUp from "../pages/auth/SignUp.jsx";
import AdminPannel from "../pages/admin/AdminPannel.jsx";
import AllUsers from "../pages/admin/AllUsers.jsx";
import AllProducts from "../pages/products/AllProducts.jsx";
import CategoryProduct from "../pages/products/CategoryProduct.jsx";
import ProductDetails from "../pages/products/ProductDetails.jsx";
import Cart from "../pages/cart/Cart.jsx";
import SearchProduct from "../pages/SearchProduct.jsx";
import Success from "../pages/Success.jsx";
import Cancel from "../pages/Cancel.jsx"
import OrderPage from "../pages/OrderPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path:"success",
        element: <Success />
      },
      {
        path:"cancel",
        element:<Cancel/>
      },
      {
        path: "category-product",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path:"/order",
        element:<OrderPage/>
      },
      {
        path: "admin-panel",
        element: <AdminPannel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
        ],
      },
    ],
  },
]);

export default router;
