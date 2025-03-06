import React, { useContext, useState } from "react";
//import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../../../common";
import Context from "../../context/index";
import defaultProfilePic from "../../assest/signin.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const { fetchUserDetails, fetchAddToCartCount } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataResponse = await fetch(SummaryApi.SignIN.url, {
        method: SummaryApi.SignIN.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      //if (!dataResponse.ok) throw new Error("Login failed");
      const dataApi = await dataResponse.json();
      console.log("Login Response:", dataApi); // Debug response

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/");
        fetchUserDetails();
        fetchAddToCartCount();
      } else {
        toast.error(dataApi.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("An error occurred during login");
    }
  };

  return (
    <section
      id="login"
      className="flex justify-center items-center min-h-screen p-4 pt-[80px] bg-[#EBF4F6]"
    >
      <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-md mx-auto transform transition duration-300 hover:scale-[1.02]">
        {/* Login Icon */}
        <div className="flex justify-center">
          <img
            src={defaultProfilePic}
            alt="Login Icon"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
          />
        </div>

        {/* Welcome message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#071952] text-center mt-4 sm:mt-6">
          Welcome Back
        </h2>

        {/* Login Form */}
        <form
          className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-5"
          onSubmit={handleSubmit}
        >
          {/* Email Input Field */}
          <div>
            <label className="block text-[#071952] font-medium text-sm sm:text-base">
              Email:
            </label>
            <div className="bg-white p-3 sm:p-4 rounded-lg mt-1 border border-[#071952] focus-within:ring-2 focus-within:ring-[#1E88E5] transition-all duration-200">
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="w-full h-full bg-transparent outline-none text-gray-700"
                required
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div>
            <label className="block text-[#071952] font-medium text-sm sm:text-base">
              Password:
            </label>
            <div className="bg-white p-3 sm:p-4 rounded-lg mt-1 border border-[#071952] flex items-center focus-within:ring-2 focus-within:ring-[#1E88E5] transition-all duration-200">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full h-full bg-transparent outline-none text-gray-700"
                required
              />
              <div
                className="cursor-pointer text-xl text-[#071952] hover:text-[#1E88E5] transition-colors duration-200 ml-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <Link
              to="/forgot-password"
              className="block text-right text-sm sm:text-base text-[#1E88E5] hover:text-blue-700 hover:underline mt-2 transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button className="bg-[#1E88E5] text-[#EBF4F6] px-6 py-2 sm:py-3 w-full rounded-full hover:bg-blue-700 transition-all duration-300 font-medium text-base sm:text-lg shadow-md hover:scale-105">
            Login
          </button>
        </form>

        {/* Redirect to Sign Up */}
        <p className="mt-5 sm:mt-6 text-center text-[#071952] text-sm sm:text-base">
          Don't have an account?
          <Link
            to="/sign-up"
            className="text-[#1E88E5] font-medium hover:text-blue-700 hover:underline ml-1 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
