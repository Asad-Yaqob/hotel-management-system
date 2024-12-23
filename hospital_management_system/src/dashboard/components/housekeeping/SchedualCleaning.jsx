import React, { useEffect, useState } from "react";
import { baseURl, services } from "../../../utils/constants";
import { Link, useParams } from "react-router-dom";
import { useStaffAuth } from "../../../context/auth/StaffAuthContext";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const SchedualCleaning = () => {
  const { roomId } = useParams();
  const { accessToken } = useStaffAuth();

  const [currentRoom, setCurrentRoom] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await fetchCurrentRoom(accessToken, roomId);
    };

    loadData();
  }, []);


  // Fetch room information
  const fetchCurrentRoom = async (accessToken, roomId) => {
    if (!accessToken || !roomId) return;

    setIsLoading(true);

    try {
      const response = await axios.get(
        `${baseURl}/cleaning/room-status/${roomId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 200) {
        setCurrentRoom(response.data.data.room);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const schedualCleaning = async (
    accessToken,
    roomId,
    service,
    description
  ) => {
    if (!accessToken) return;

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${baseURl}/cleaning/schedule-task`,
        { roomId, service, description },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 200) {
        formik.resetForm();
        toast.dismiss();
        toast.success("Cleaning scheduled successfully!");
      } else {
        toast.dismiss();
        toast.success("Cleaning scheduled failed!");
      }
    } catch (error) {
      toast.dismiss();
      toast.success(error || "Cleaning scheduled failed!");
    } finally {
      setIsLoading(false);
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      roomNumber: currentRoom.roomNo || "",
      serviceType: "",
      specialInstructions: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      roomNumber: Yup.string().required("Room number is required"),
      serviceType: Yup.string().required("Service type is required"),
      specialInstructions: Yup.string(),
    }),
    onSubmit: async (values) => {
      await schedualCleaning(
        accessToken,
        currentRoom._id,
        values.serviceType,
        values.specialInstructions
      );
    },
  });

  return (
    <>
      <div className="my-5">
        <Link
          to={"/admin/House Keeping"}
          className="px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded"
        >
          Go Back
        </Link>
      </div>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center">
          Request a Cleaning Service
        </h2>
        <form
          className="mt-8 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold"
              htmlFor="roomNumber"
            >
              Room Number
            </label>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              value={formik.values.roomNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 mt-2 border ${
                formik.touched.roomNumber && formik.errors.roomNumber
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
            />
            {formik.touched.roomNumber && formik.errors.roomNumber && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.roomNumber}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold"
              htmlFor="serviceType"
            >
              Select Service
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formik.values.serviceType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 mt-2 border ${
                formik.touched.serviceType && formik.errors.serviceType
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
            >
              <option value="">Select a Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
            {formik.touched.serviceType && formik.errors.serviceType && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.serviceType}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold"
              htmlFor="specialInstructions"
            >
              Special Instructions (Optional)
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formik.values.specialInstructions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Submit Request
          </button>
        </form>
      </div>
    </>
  );
};

export default SchedualCleaning;
