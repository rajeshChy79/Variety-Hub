import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle, FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../../../store/userSlice";
import ROLE from "../../../common/role";
import Context from "../../context";

const Header = () => {
  const context = useContext(Context);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();

  const searchInput = useLocation();
  const urlSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = urlSearch.get("q") || "";
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });
      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(";").forEach((cookie) => {
          document.cookie = cookie
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });
        window.location.href = "/login";
      } else {
        toast.error(data.error || "Logout failed");
      }
    } catch (err) {
      toast.error("An error occurred during logout");
      console.error("Logout Error:", err);
    }
  };

  const handleOnSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : "/search");
  };

  return (
    <header className="h-16 md:h-20 bg-[#071952] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="h-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link to={"/"}>
            <Logo w={90} h={60} className="text-[#EBF4F6]" />
          </Link>
        </div>

        {/* Search Bar Section */}
        <div className="hidden md:flex items-center w-full max-w-lg mx-4 bg-[#EBF4F6] rounded-full shadow-md focus-within:ring-2 focus-within:ring-[#1E88E5] transition-all duration-300">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 text-gray-700 bg-transparent outline-none placeholder-gray-500"
            onChange={handleOnSearch}
            value={search}
          />
          <button className="p-2 text-[#071952] bg-[#1E88E5] hover:text-[#acb2b8] transition-colors duration-200 rounded-r-full">
            <IoSearchSharp size={24} />
          </button>
        </div>

        {/* User Actions Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Profile */}
          {user?._id && (
            <div className="relative group">
              <div
                className="text-3xl md:text-4xl text-[#EBF4F6] cursor-pointer hover:text-[#1E88E5] transition-colors duration-200"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user?.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#EBF4F6] shadow-sm"
                  />
                ) : (
                  <FaRegUserCircle />
                )}
              </div>

              {/* Profile Dropdown */}
              {menuDisplay && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50 animate-fade-in">
                  <nav className="flex flex-col gap-1">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-products"
                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#1E88E5] hover:text-white rounded-md transition-colors duration-200"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#D32F2F] hover:text-white rounded-md transition-colors duration-200 text-left"
                    >
                      Logout
                    </button>
                  </nav>
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          {user?._id && (
            <Link to={"/cart"} className="relative group">
              <FaCartPlus className="text-2xl md:text-3xl text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200" />
              {context.countCartProduct > 0 && (
                <div className="absolute -top-2 -right-2 bg-[#D32F2F] text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold shadow-md group-hover:bg-red-700 transition-colors duration-200">
                  {context.countCartProduct}
                </div>
              )}
            </Link>
          )}

          {/* Login/Logout Button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-[#D32F2F] text-white text-sm sm:text-base font-medium rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 sm:px-4 py-1 sm:py-2 bg-[#1E88E5] text-white text-sm sm:text-base font-medium rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden bg-[#EBF4F6] shadow-md mt-2 mx-4 rounded-full flex items-center px-2 py-1">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-3 py-1 text-gray-700 outline-none placeholder-gray-500 bg-transparent"
          onChange={handleOnSearch}
          value={search}
        />
        <button className="p-1 text-[#071952] hover:text-[#1E88E5] transition-colors duration-200">
          <IoSearchSharp size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
