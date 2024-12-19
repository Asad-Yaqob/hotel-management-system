import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function StaffPage() {
  const formik = useFormik({
    initialValues: {
      staffName: "",
      email: "",
      password: "",
      phoneNo: "",
      streetAddress: "",
      country: "",
      city: "",
      avatar: "",
      role: "",
    },
    validationSchema: Yup.object({
      staffName: Yup.string().required("Staff name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      phoneNo: Yup.string()
        .matches(/^\d+$/, "Phone number must be numeric")
        .required("Phone number is required"),
      streetAddress: Yup.string().required("Street address is required"),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
      avatar: Yup.string()
        .url("Invalid URL for avatar")
        .required("Avatar is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      // Handle form submission here
    },
  });

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Staff Management
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Staff Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Staff Name
          </label>
          <input
            type="text"
            name="staffName"
            className={`mt-1 block w-full border rounded-md p-2 ${
              formik.touched.staffName && formik.errors.staffName
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter staff name"
            {...formik.getFieldProps("staffName")}
          />
          {formik.touched.staffName && formik.errors.staffName && (
            <p className="text-red-500 text-sm">{formik.errors.staffName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            className={`mt-1 block w-full border rounded-md p-2 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            className={`mt-1 block w-full border rounded-md p-2 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNo"
            className={`mt-1 block w-full border rounded-md p-2 ${
              formik.touched.phoneNo && formik.errors.phoneNo
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter phone number"
            {...formik.getFieldProps("phoneNo")}
          />
          {formik.touched.phoneNo && formik.errors.phoneNo && (
            <p className="text-red-500 text-sm">{formik.errors.phoneNo}</p>
          )}
        </div>

        {/* Street Address */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Street Address
          </label>
          <input
            type="text"
            name="streetAddress"
            className={`mt-1 block w-full border rounded-md p-2 ${
              formik.touched.streetAddress && formik.errors.streetAddress
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter street address"
            {...formik.getFieldProps("streetAddress")}
          />
          {formik.touched.streetAddress && formik.errors.streetAddress && (
            <p className="text-red-500 text-sm">
              {formik.errors.streetAddress}
            </p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Country
          </label>
          <input
            type="text"
            name="country"
            className={`mt-1 block w-full border rounded-md p-2 ${
              formik.touched.country && formik.errors.country
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter country"
            {...formik.getFieldProps("country")}
          />
          {formik.touched.country && formik.errors.country && (
            <p className="text-red-500 text-sm">{formik.errors.country}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            City
          </label>
          <input
            type="text"
            name="city"
            className={`mt-1 block w-full border rounded-md p-2 ${
              formik.touched.city && formik.errors.city
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter city"
            {...formik.getFieldProps("city")}
          />
          {formik.touched.city && formik.errors.city && (
            <p className="text-red-500 text-sm">{formik.errors.city}</p>
          )}
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Avatar URL
          </label>
          <input
            type="text"
            name="avatar"
            className={`mt-1 block w-full border rounded-md p-2 ${
              formik.touched.avatar && formik.errors.avatar
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter avatar URL"
            {...formik.getFieldProps("avatar")}
          />
          {formik.touched.avatar && formik.errors.avatar && (
            <p className="text-red-500 text-sm">{formik.errors.avatar}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Role
          </label>
          <input
            type="text"
            name="role"
            className={`mt-1 block w-full border rounded-md p-2 ${
              formik.touched.role && formik.errors.role
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter role"
            {...formik.getFieldProps("role")}
          />
          {formik.touched.role && formik.errors.role && (
            <p className="text-red-500 text-sm">{formik.errors.role}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default StaffPage;
