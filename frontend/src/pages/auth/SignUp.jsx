import React, { useState } from "react";
import loginIcons from "../../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64sec from "../../helpers/imagetobase64sec";
import SummaryApi from "../../../common/index";
import defaultProfilePic from "../../assest/signin.jpg";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imagePic = await imageToBase64sec(file);
        setData((prev) => ({
          ...prev,
          profilePic: imagePic,
        }));
      } catch (error) {
        console.error("Image Upload Error:", error);
        toast.error("Failed to upload profile picture");
      }
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const dataResponse = await fetch(SummaryApi.SignUP.url, {
        method: SummaryApi.SignUP.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!dataResponse.ok) throw new Error("Signup failed");
      const dataApi = await dataResponse.json();
      console.log("Signup Response:", dataApi); // Debug response

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else {
        toast.error(dataApi.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      toast.error("An error occurred during signup");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-[80vh] py-10 bg-[#EBF4F6]">
  <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-md transform transition duration-300 hover:scale-[1.02]">
    {/* Profile Picture Upload Section */}
    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto relative overflow-hidden rounded-full border-4 border-[#071952] shadow-md">
      <img
        src={data.profilePic || defaultProfilePic}
        alt="Profile"
        className="w-full h-full object-cover rounded-full"
      />
      <label className="absolute bottom-0 w-full bg-[#071952] text-[#EBF4F6] text-xs sm:text-sm font-medium py-1 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-200">
        Upload Photo
        <input type="file" className="hidden" onChange={handleOnPic} />
      </label>
    </div>

    {/* Signup Form */}
    <form className="pt-4 space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
      {/* Name Input */}
      <div>
        <label className="block text-[#071952] font-semibold text-sm">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleOnChange}
          placeholder="Enter your name"
          className="w-full p-2.5 sm:p-3 rounded-md border border-[#071952] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 bg-white text-gray-700"
          required
        />
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-[#071952] font-semibold text-sm">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleOnChange}
          placeholder="Enter your email"
          className="w-full p-2.5 sm:p-3 rounded-md border border-[#071952] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 bg-white text-gray-700"
          required
        />
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-[#071952] font-semibold text-sm">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={data.password}
            onChange={handleOnChange}
            placeholder="Enter password"
            className="w-full p-2.5 sm:p-3 rounded-md border border-[#071952] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 bg-white text-gray-700 pr-10"
            required
          />
          <span
            className="absolute right-3 top-2.5 text-lg cursor-pointer text-[#071952] hover:text-[#1E88E5] transition-colors duration-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div>
        <label className="block text-[#071952] font-semibold text-sm">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm password"
            className="w-full p-2.5 sm:p-3 rounded-md border border-[#071952] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 bg-white text-gray-700 pr-10"
            required
          />
          <span
            className="absolute right-3 top-2.5 text-lg cursor-pointer text-[#071952] hover:text-[#1E88E5] transition-colors duration-200"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
      </div>

      {/* SignUp Button */}
      <button className="bg-[#1E88E5] text-[#EBF4F6] py-2.5 sm:py-3 rounded-md w-full hover:bg-blue-700 transition-all duration-300 font-semibold text-sm sm:text-base shadow-md hover:scale-105">
        Sign Up
      </button>
    </form>

    {/* Redirect to Login */}
    <p className="mt-3 text-center text-[#071952] text-sm">
      Already have an account?
      <Link
        to="/login"
        className="text-[#1E88E5] hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
      >
        {" "}
        Login
      </Link>
    </p>
  </div>
</section>

  );
};

export default SignUp;
