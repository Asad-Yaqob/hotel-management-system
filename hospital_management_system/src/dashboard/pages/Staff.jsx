import React, { useEffect, useState } from "react";
import AddStaff from "../components/staff/AddStaff";
import { useStaffAuth } from "../../context/auth/StaffAuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Error } from "../components/reusable/Error";

const Staff = () => {
  const [showAddStaff, setShowAddStaff] = useState(false);
  const { allStaff, getStaff, setAllStaff, isLoading, user } = useStaffAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await getStaff();
  };

  // Mock data for staff list
  const staffList = allStaff;

   if (user?.role !== "admin") {
     return (
       <Error
         message="Only admin can access this page"
       />
     );
   }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-6">
        <button
          onClick={() => setShowAddStaff((prev) => !prev)}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          {showAddStaff ? "Hide Add Staff" : "Add Staff"}
        </button>
      </div>

      {showAddStaff && <AddStaff />}

      <div className="bg-white shadow-md rounded-lg p-4 mt-6">
        <h2 className="text-xl font-bold mb-4">Staff List</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left">Name</th>
              <th className="border-b px-4 py-2 text-left">Role</th>
              <th className="border-b px-4 py-2 text-left">Email</th>
              <th className="border-b px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Show a loader when data is being fetched
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <div className="flex justify-center items-center">
                    <div className="loader border-t-4 border-blue-500 w-8 h-8 rounded-full animate-spin"></div>
                    <span className="ml-3 text-gray-600">
                      Loading staff data...
                    </span>
                  </div>
                </td>
              </tr>
            ) : staffList?.length > 0 ? (
              // Render staff data when available
              staffList.map((staff) => (
                <tr
                  key={staff._id}
                  className={`hover:bg-gray-100 ${
                    !staff.isActive ? "bg-indigo-300 text-white" : ""
                  }`}
                >
                  <td className="border-b px-4 py-2">{staff.staffName}</td>
                  <td className="border-b px-4 py-2">{staff.role}</td>
                  <td className="border-b px-4 py-2">{staff.email}</td>
                  <td className="border-b px-4 py-2">
                    {/* Action column replaced with a link */}
                    <Link
                      to={`/admin/staffDetail/${staff._id}`}
                      className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              // Show a message if no staff data is available
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No staff data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;
