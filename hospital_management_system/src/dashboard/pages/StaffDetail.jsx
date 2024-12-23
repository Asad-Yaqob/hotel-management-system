import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStaffAuth } from "../../context/auth/StaffAuthContext";
import { toast } from "react-toastify";

const StaffDetail = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const { isLoading, fetchStaffDetails, currentStaff, toggleStatus} =
    useStaffAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (staffId) {
      await fetchStaffDetails(staffId);
    }
  };

  const staff = currentStaff;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading staff details...</span>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Staff not found.</p>
      </div>
    );
  }

  const {
    staffName,
    email,
    phoneNo,
    streetAddress,
    country,
    city,
    role,
    avatar,
    isActive,
  } = staff;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white py-6 px-6 flex items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white mr-4">
            <img
              src={avatar || "https://via.placeholder.com/150"}
              alt={`${staffName}'s Avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{staffName}</h2>
            <p className="text-sm">{role}</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-gray-600 font-semibold text-lg mb-2">
                Contact Information
              </h3>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Email:</span> {email}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Phone:</span> {phoneNo}
              </p>
            </div>
            <div>
              <h3 className="text-gray-600 font-semibold text-lg mb-2">
                Address
              </h3>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Street:</span> {streetAddress}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">City:</span> {city}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Country:</span> {country}
              </p>
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          <div className="flex justify-end mt-6">
            <button
              onClick={async () => {
                const action = isActive ? "deactivate" : "activate";
                const response = await toggleStatus(staffId, action);

                if (response.success) {
                  toast.dismiss();
                  toast.success(`Staff ${action}d successfully.`);
                } else {
                  toast.dismiss();
                  toast.error(
                    response.message || "Failed to update staff status."
                  );
                }
              }}
              className={`px-6 py-2 text-sm text-white ${
                isActive
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } rounded`}
            >
              {isActive ? "Deactivate" : "Activate"}
            </button>
            <button className="px-6 py-2 text-sm text-white bg-indigo-500 rounded ms-2">
              <Link to={"/admin/staff"}>Go Back</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetail;
