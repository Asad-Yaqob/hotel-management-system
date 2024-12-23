import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useGuestAuth } from "../../../context/auth/GuestAuthContext";

const AddGuest = () => {
  const { registerGuestByStaff, isLoading, fetchGuests, accessToken } = useGuestAuth();
  const [cashPayment, setCashPayment] = useState(false); 

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      country: "",
      city: "",
      cardNo: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      phone: Yup.string()
        .max(11, "Must be 11 digits")
        .required("Phone Number is required"),
      address: Yup.string().required("Street Address is required"),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
      // Card details are required only if cashPayment is false
      cardNo: Yup.string().when("cashPayment", {
        is: false,
        then: Yup.string().required("Card Number is required"),
      }),
      cvv: Yup.string().when("cashPayment", {
        is: false,
        then: Yup.string().required("CVV is required"),
      }),
    }),
    onSubmit: async (values) => {

      const response = await registerGuestByStaff(
        values.firstName, values.lastName,
        values.email,
        values.password,
        values.phone,
        values.address,
        values.country,
        values.city,
        cashPayment ? null : values.cardNo,
        cashPayment ? null : values.cvv,
        cashPayment,
      );

      if (response.success) {

        await fetchGuests(accessToken);
        toast.dismiss();
        toast.success("Successfully registered.");
      } else {
        toast.dismiss();
        toast.error(response.message || "Failed to register");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Register New Guest
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Phone Number", name: "phone", type: "text" },
            { label: "Street Address", name: "address", type: "text" },
            { label: "Country", name: "country", type: "text" },
            { label: "City", name: "city", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-600">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-600">
              Cash Payment:
            </label>
            <input
              type="checkbox"
              checked={cashPayment}
              onChange={() => setCashPayment(!cashPayment)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          {!cashPayment && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNo"
                  value={formik.values.cardNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter card number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {formik.touched.cardNo && formik.errors.cardNo && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.cardNo}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formik.values.cvv}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter CVV"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {formik.touched.cvv && formik.errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.cvv}
                  </p>
                )}
              </div>
            </>
          )}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-indigo-500 text-white py-2 rounded-md font-medium transition ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-600"
              }`}
            >
              {isLoading ? "Registering..." : "Register Guest"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuest;
