import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useGuestAuth } from '../../../context/auth/GuestAuthContext';
import { Link } from 'react-router-dom';
import { HeroImage } from '../booking/HeroImage';

const RegisterForm = () => {

   const { register, isLoading } = useGuestAuth();

   const formik = useFormik({
     initialValues: {
       firstName: "",
       lastName: "",
       email: "",
       password: "",
     },
     validationSchema: Yup.object({
       firstName: Yup.string().required("First Name is required"),
       lastName: Yup.string().required("Last Name is required"),
       email: Yup.string()
         .email("Invalid email address")
         .required("Email is required"),
       password: Yup.string()
         .min(6, "Password must be at least 6 characters")
         .required("Password is required"),
     }),
     onSubmit: async (values) => {
       try {
         const response = await register(
           values.firstName,
           values.lastName,
           values.email,
           values.password
         );

         if (response.success) {
           toast.dismiss();
           toast.success("Registration Successful.");
           return;
         }

         toast.dismiss();
         toast.error("Registration Failed.");
       } catch (error) {
         toast.dismiss();
         toast.error(error.message || "Registration Failed.");
       }
     },
   });

  return (
    <>
      <HeroImage />
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6 mt-16 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create an Account
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className="mt-1 py-1 px-6 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-600 text-sm">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className="mt-1 py-1 px-6 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-600 text-sm">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 py-1 px-6 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 py-1 px-6 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            <Link to={"/login"} className="text-blue-600 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm
