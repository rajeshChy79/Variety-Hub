import React, { useState, useEffect } from 'react';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../../components/admin/ChangeUserRole';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: ""
  });

  const fetchAllUsers = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.all_user.url, {
        method: SummaryApi.all_user.method,
        credentials: 'include'
      });
      if (!dataResponse.ok) throw new Error('Failed to fetch users');
      const dataApi = await dataResponse.json();
      console.log("Fetch Users Response:", dataApi); // Debug fetch response

      if (dataApi.success) {
        setAllUsers(dataApi.data || []);
      } else {
        toast.error(dataApi.message || 'Failed to load users');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      toast.error('An error occurred while fetching users');
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-[#071952] border-opacity-20 mt-[80px]">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#071952] mb-4 sm:mb-6">All Users</h2>
      <div className="overflow-x-auto bg-[#EBF4F6] rounded-xl shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-[#071952] text-[#EBF4F6]">
            <tr>
              <th className="p-3 sm:p-4 text-left font-medium text-sm sm:text-base">#</th>
              <th className="p-3 sm:p-4 text-left font-medium text-sm sm:text-base">Name</th>
              <th className="p-3 sm:p-4 text-left font-medium text-sm sm:text-base">Email</th>
              <th className="p-3 sm:p-4 text-left font-medium text-sm sm:text-base">Role</th>
              <th className="p-3 sm:p-4 text-left font-medium text-sm sm:text-base">Created At</th>
              <th className="p-3 sm:p-4 text-center font-medium text-sm sm:text-base">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id} className="border-b border-[#071952] border-opacity-20 hover:bg-[#EBF4F6] hover:shadow-md transition-all duration-200">
                <td className="p-3 sm:p-4 text-sm sm:text-base text-[#071952]">{index + 1}</td>
                <td className="p-3 sm:p-4 capitalize text-sm sm:text-base text-[#071952]">{user?.name || "Unnamed User"}</td>
                <td className="p-3 sm:p-4 text-sm sm:text-base text-[#071952] opacity-80 truncate max-w-[200px]">{user?.email || "No Email"}</td>
                <td className={`p-3 sm:p-4 font-semibold text-sm sm:text-base ${user?.role === 'admin' ? 'text-[#1E88E5]' : 'text-[#D32F2F]'}`}>
                  {user?.role || "Unknown"}
                </td>
                <td className="p-3 sm:p-4 text-sm sm:text-base text-[#071952] opacity-80">{moment(user?.createdAt).format('LL')}</td>
                <td className="p-3 sm:p-4 text-center">
                  <button
                    className="bg-[#1E88E5] text-[#EBF4F6] p-2 sm:p-3 rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-200"
                    onClick={() => {
                      setUpdateUserDetails(user);
                      setOpenUpdateRole(true);
                    }}
                    aria-label={`Edit role for ${user.name}`}
                  >
                    <MdEdit size={18} sm={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          onRoleChange={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;