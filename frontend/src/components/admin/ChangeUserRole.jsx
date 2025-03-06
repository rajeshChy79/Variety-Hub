import React, { useState } from 'react';
import ROLE from '../../../common/role';
import { MdClose } from "react-icons/md";
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, userId, onRoleChange, onClose }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          role: userRole
        })
      });
      if (!dataResponse.ok) throw new Error('Failed to update user role');
      const dataApi = await dataResponse.json();
      console.log("Update Role Response:", dataApi); // Debug response

      if (dataApi.success) {
        toast.success(dataApi.message);
        onRoleChange();
        onClose();
      } else {
        toast.error(dataApi.message || 'Failed to update user role');
      }
    } catch (err) {
      console.error('Update Role Error:', err);
      toast.error('An error occurred while updating the user role');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#071952] bg-opacity-50 backdrop-blur-sm mt-[80px]">
      <div className="bg-[#EBF4F6] p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-md relative border border-[#071952] border-opacity-20">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-[#071952] hover:text-[#D32F2F] transition-colors duration-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-[#071952] mb-4 sm:mb-6 text-center">Change User Role</h2>

        {/* User Info */}
        <div className="mb-4 sm:mb-5">
          <p className="text-[#071952] font-medium text-sm sm:text-base">Name:</p>
          <p className="text-[#071952] text-sm sm:text-base font-semibold">{name || "Unnamed User"}</p>
        </div>

        <div className="mb-4 sm:mb-5">
          <p className="text-[#071952] font-medium text-sm sm:text-base">Email:</p>
          <p className="text-[#071952] text-sm sm:text-base font-semibold truncate max-w-full">{email || "No Email"}</p>
        </div>

        {/* Role Selection */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <p className="text-[#071952] font-medium text-sm sm:text-base">Role:</p>
          <select
            className="border bg-white px-4 py-2 sm:px-5 sm:py-3 rounded-md focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 text-[#071952] font-medium text-sm sm:text-base"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((userRole) => (
              <option key={userRole} value={userRole} className="text-[#071952]">
                {userRole}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          className="w-full py-2 sm:py-3 bg-[#1E88E5] text-[#EBF4F6] font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-200"
          onClick={updateUserRole}
        >
          Update Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;