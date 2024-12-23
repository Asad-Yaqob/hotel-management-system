import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddService = ({isLoading, addService, fetchServices, accessToken }) => {
  
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.string().required("Price is required"),
    }),
    onSubmit: async (values) => {
      const response = await addService(
        values.name,
        values.description,
        values.price,
        accessToken
      );

      if (response.success) {
        await fetchServices(accessToken);
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
          Add Service
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Description", name: "description", type: "text" },
            { label: "Price", name: "price", type: "text" },
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
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-indigo-500 text-white py-2 rounded-md font-medium transition ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-600"
              }`}
            >
              {isLoading ? "Adding..." : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
