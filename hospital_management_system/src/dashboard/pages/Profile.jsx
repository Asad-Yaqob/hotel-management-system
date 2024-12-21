import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStaffAuth } from "../../context/auth/StaffAuthContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/reusable/Loader";
import { Error } from "../components/reusable/Error";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, updateUserProfile, updatePassword, updateAvatar, isLoading } =
    useStaffAuth();
  const [newAvatar, setNewAvatar] = useState(null);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      staffName: user.staffName,
      email: user.email,
      phoneNo: user.phoneNo,
      streetAddress: user.streetAddress,
      country: user.country,
      city: user.city,
    },
    validationSchema: Yup.object({
      staffName: Yup.string().required("Staff Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNo: Yup.string().required("Phone number is required"),
      streetAddress: Yup.string().required("Street Address is required"),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
    }),
    onSubmit: async (values) => {
      const response = await updateUserProfile(
        values.staffName,
        values.email,
        values.phoneNo,
        values.streetAddress,
        values.country,
        values.city
      );

      if (response.success) {
        toast.dismiss();
        toast.success("Password updated successfully.");
        navigate("/admin/profile");
        return;
      }

      toast.dismiss();
      toast.error("Failed to change password");
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const response = await updateAvatar(file);

      if (response.success) {
        toast.dismiss();
        toast.success("Avatar updated successfully.");
        navigate("/admin/profile");
        return;
      }

      toast.dismiss();
      toast.error("Failed to change password");

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const response = await updatePassword(currentPassword, newPassword);

    if (response.success) {
      toast.dismiss();
      toast.success("Password updated successfully.");
      navigate("/admin/profile");
      return;
    }
    toast.dismiss();
    toast.error("Failed to change password");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Profile</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left side: Avatar and Avatar update */}
        <div className="flex flex-col items-center py-10 px-10 bg-white rounded-lg shadow-md">
          <div className="mb-8 overflow-hidden rounded border-4 border-gray-200">
            <img
              src={newAvatar || user.avatar}
              alt="Avatar"
              className="w-full h-full object-fill"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-8"
          />
          <button
            onClick={() => updateAvatar(newAvatar)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            {isLoading ? <Loader message="Updating Avatar" /> : "Update Avatar"}
          </button>
        </div>

        {/* Right side: Profile Information */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="staffName" className="block text-lg">
                  Staff Name
                </label>
                <input
                  type="text"
                  id="staffName"
                  name="staffName"
                  value={formik.values.staffName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border rounded-lg mt-2"
                />
                {formik.errors.staffName && formik.touched.staffName && (
                  <div className="text-red-500">{formik.errors.staffName}</div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border rounded-lg mt-2"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>

              <div>
                <label htmlFor="phoneNo" className="block text-lg">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  value={formik.values.phoneNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border rounded-lg mt-2"
                />
                {formik.errors.phoneNo && formik.touched.phoneNo && (
                  <div className="text-red-500">{formik.errors.phoneNo}</div>
                )}
              </div>

              <div>
                <label htmlFor="streetAddress" className="block text-lg">
                  Street Address
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formik.values.streetAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border rounded-lg mt-2"
                />
                {formik.errors.streetAddress &&
                  formik.touched.streetAddress && (
                    <div className="text-red-500">
                      {formik.errors.streetAddress}
                    </div>
                  )}
              </div>

              <div>
                <label htmlFor="country" className="block text-lg">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border rounded-lg mt-2"
                />
                {formik.errors.country && formik.touched.country && (
                  <div className="text-red-500">{formik.errors.country}</div>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-lg">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 border rounded-lg mt-2"
                />
                {formik.errors.city && formik.touched.city && (
                  <div className="text-red-500">{formik.errors.city}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 mt-4"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl mb-6">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-lg">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="w-full p-3 border rounded-lg mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-lg">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full p-3 border rounded-lg mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 mt-4"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
