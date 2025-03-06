import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!dataResponse.ok) throw new Error("Failed to send reset link");
      const dataApi = await dataResponse.json();
      console.log("Forgot Password Response:", dataApi); // Debug response

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else {
        toast.error(dataApi.message || "Failed to send reset link");
      }
    } catch (err) {
      console.error("Forgot Password Error:", err);
      toast.error("An error occurred while sending the reset link");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen p-4 pt-[80px] bg-[#EBF4F6]">
      <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-md transform transition duration-300 hover:scale-[1.02]">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#071952] text-center mb-4 sm:mb-6">
          Forgot Password
        </h2>

        {/* Forgot Password Form */}
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
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-full bg-transparent outline-none text-gray-700"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button className="bg-[#1E88E5] text-[#EBF4F6] px-6 py-2 sm:py-3 w-full rounded-full hover:bg-blue-700 transition-all duration-300 font-medium text-base sm:text-lg shadow-md hover:scale-105">
            Send Reset Link
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="mt-5 sm:mt-6 text-center text-[#071952] text-sm sm:text-base">
          Remember your password?
          <Link
            to="/login"
            className="text-[#1E88E5] font-medium hover:text-blue-700 hover:underline ml-1 transition-colors duration-200"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
