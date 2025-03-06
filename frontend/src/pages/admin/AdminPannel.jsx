import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../../../common/role';

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-[#EBF4F6]">
      {/* Combined Scrollable Sidebar and Main Content */}
      <div className="flex flex-row w-full">
        {/* Sidebar (Sticky, Scrolls with Content) */}
        <aside className="bg-[#071952] text-[#EBF4F6] w-[350px] min-h-screen p-4 sm:p-6 shadow-lg sticky top-[100px] left-0 z-40 flex flex-col">
          <div className="h-auto flex flex-col items-center justify-center border-b border-[#EBF4F6] border-opacity-20 mb-4 pt-[40px] sm:mb-6 pb-4">
            <div className="relative">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt={user?.name}
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-[#EBF4F6] shadow-md"
                />
              ) : (
                <FaRegUserCircle className="text-4xl sm:text-5xl text-[#EBF4F6]" />
              )}
            </div>
            <p className="text-sm sm:text-base font-semibold mt-2 text-center capitalize">{user?.name || "Admin"}</p>
            <p className="text-xs sm:text-sm text-[#EBF4F6] opacity-70">{user?.role || "Role"}</p>
          </div>

          <nav className="space-y-3 flex-grow">
            <Link to="all-users" className="block px-4 py-2 sm:py-3 rounded-lg bg-[#1E88E5] hover:bg-blue-700 text-[#EBF4F6] font-medium text-sm sm:text-base transition-colors duration-200 shadow-sm">
              All Users
            </Link>
            <Link to="all-products" className="block px-4 py-2 sm:py-3 rounded-lg bg-[#1E88E5] hover:bg-blue-700 text-[#EBF4F6] font-medium text-sm sm:text-base transition-colors duration-200 shadow-sm">
              All Products
            </Link>
          </nav>
        </aside>

        {/* Main Content (Scrollable, Structured) & Footer */}
        <div className="flex flex-col flex-grow w-full">
          <main className="p-4 sm:p-6 bg-white shadow-lg rounded-xl m-4 sm:m-6 flex-grow overflow-y-auto max-h-[calc(100vh-20px)] scrollbar-hide no-scrollbar">
            <div className="container mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;