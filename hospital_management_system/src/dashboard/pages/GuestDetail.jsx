import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStaffAuth } from "../../context/auth/StaffAuthContext";
import { toast } from "react-toastify";
import { useGuestAuth } from "../../context/auth/GuestAuthContext";

const GuestDetail = () => {

  const { guestId } = useParams();
  const navigate = useNavigate();

  const { isLoading, fetchGuestDetails, currentGuest } =
    useGuestAuth();

  useEffect(() => {

    const loadData = async () => {
      if (guestId) {
        await fetchGuestDetails(guestId);
      }
    };

    loadData();
  }, []);

  

  const staff = currentGuest;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading guest details...</span>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Guest not found.</p>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    country,
    city,
  } = staff;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white py-6 px-6 flex items-center">
          <div>
            <h2 className="text-2xl font-semibold">{firstName + " " +  lastName}</h2>
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
                <span className="font-semibold">Phone:</span> {phone}
              </p>
            </div>
            <div>
              <h3 className="text-gray-600 font-semibold text-lg mb-2">
                Address
              </h3>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Street:</span> {address}
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
            <button className="px-6 py-2 text-sm text-white bg-indigo-500 rounded ms-2">
              <Link to={"/admin/guest"}>Go Back</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDetail;
