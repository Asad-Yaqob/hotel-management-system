import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useStaffAuth } from "../../../context/auth/StaffAuthContext";

const AddStaff = () => {

    const { register, isLoading } = useStaffAuth();

    const roles = ["manager", "housekeeping", "maintainence", "receptionist"];

    const formik = useFormik({
      initialValues: {
        staffName: "",
        email: "",
        password: "",
        phoneNo: "",
        streetAddress: "",
        country: "",
        city: "",
        avatar: null,
        role: "",
      },
      validationSchema: Yup.object({
        staffName: Yup.string().required("Staff Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        phoneNo: Yup.string()
          .max(11, "Must be 11 digits")
          .required("Phone Number is required"),
        streetAddress: Yup.string().required("Street Address is required"),
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
        role: Yup.string().required("Role is required"),
      }),
      onSubmit: async (values) => {
        const formData = new FormData();

        formData.append("staffName", values.staffName);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("phoneNo", values.phoneNo);
        formData.append("streetAddress", values.streetAddress);
        formData.append("country", values.country);
        formData.append("city", values.city);
        formData.append("avatar", values.avatar);
        formData.append("role", values.role);

        const response = await register(formData);

        if (response.success) {
          toast.dismiss();
          toast.success("Successfully registered.");
        } else {
          toast.dismiss();
          toast.error(response.error || "Failed to register");
        }
      },
    });

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      formik.setFieldValue("avatar", file);
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Register New Staff
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {[
            { label: "Staff Name", name: "staffName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Phone Number", name: "phoneNo", type: "text" },
            { label: "Street Address", name: "streetAddress", type: "text" },
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
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-600"
            />
            {formik.touched.avatar && formik.errors.avatar && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.avatar}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Role
            </label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.role}</p>
            )}
          </div>
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
              {isLoading ? "Registering..." : "Register Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStaff
