import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { RiMenu2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGuestAuth } from "../context/auth/GuestAuthContext";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { isAuthenticated, login, register, logout, isLoading } =
    useGuestAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleRegisterModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsLoginModalOpen(false);
    setMenuOpen(false);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    setIsModalOpen(false);
    setMenuOpen(false);
  };

  const formikRegister = useFormik({
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
          setMessage("Registration Successful.");

          toast.dismiss();
          toast.success("Registration Successful.");
          toggleLoginModal();
          return;
        }

        toast.dismiss();
        toast.error("Registration Failed.");
      } catch (error) {
        setMessage(error.response?.data?.message || "An error occurred.");
        toast.dismiss();
        toast.error(error.message || "Registration Failed.");
      }
    },
  });

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { success } = await login(values.email, values.password);

      if (success) {
        setMessage("Login Successful.");

        toast.dismiss();
        toast.success("Login Successful.");
        setIsLoginModalOpen(!isLoginModalOpen);
        setIsModalOpen(false);
        setMenuOpen(false);
        return;
      }

      setMessage("Something went wrong.");
      toast.dismiss();
      toast.success("Login failed.");
    },
  });

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700 rounded-b-xl shadow-md">
        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-4 text-lg text-white">
            <Link to="/">
              <li className="px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center">
                Home
              </li>
            </Link>
            <li className="px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300">
              Amenities
            </li>
            <Link to="/Gallery">
              <li className="px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center">
                Gallery
              </li>
            </Link>
          </ul>
        </div>
        <div className="text-white">
          <Link to="/">
            <h1 className="text-2xl font-semibold">LuxuryStay Hospitality</h1>
          </Link>
        </div>
        <div className="hidden md:flex">
          <ul className="flex items-center gap-4 text-lg text-white">
            <Link to="/CheckoutRoom">
              <li className="px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center">
                Rooms
              </li>
            </Link>
            <Link to="/About">
              <li className="px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center">
                Blog <MdKeyboardArrowDown className="ml-2" />
              </li>
            </Link>
            {!isAuthenticated ? (
              <button
                onClick={toggleRegisterModal}
                className="border px-5 py-1 rounded-md hover:bg-gray-700"
              >
                Register
              </button>
            ) : (
              <button
                onClick={logout}
                className="border px-5 py-1 rounded-md hover:bg-gray-700"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
        {/* Mobile Menu Toggle Button */}
        <div className="text-white md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <RiMenu2Fill size={25} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black">
          <ul className="flex flex-col items-center text-lg text-white">
            <li className="w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
              Home
            </li>
            <li className="w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
              Pages
            </li>
            <li className="w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
              Amenities
            </li>
            <li className="w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
              Gallery
            </li>
            <li className="w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
              Rooms
            </li>
            <li className="w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
              Blog
            </li>
            <li className="w-full px-6 py-4 hover:bg-gray-700 transition duration-300 text-center">
              Contact
            </li>
            {!isAuthenticated ? (
              <button
                onClick={toggleRegisterModal}
                className="border px-5 py-1 rounded-md hover:bg-gray-700 w-full text-center mt-4"
              >
                Register
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="border px-5 py-1 rounded-md hover:bg-gray-700 w-full text-center mt-4"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      )}

      {/* Register Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <button onClick={toggleRegisterModal} className="text-2xl">
              <IoCloseSharp />
            </button>
            <h1 className="text-center text-3xl font-semibold">
              Register Here!
            </h1>
            <form onSubmit={formikRegister.handleSubmit} className="p-4">
              {[
                { name: "firstName", placeholder: "First Name" },
                { name: "lastName", placeholder: "Last Name" },
                { name: "email", placeholder: "Enter Email" },
                {
                  name: "password",
                  placeholder: "Enter Password",
                  type: "password",
                },
              ].map(({ name, placeholder, type = "text" }, index) => (
                <div key={index} className="mt-4">
                  <input
                    type={type}
                    name={name}
                    value={formikRegister.values[name]}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border rounded-md text-sm "
                  />
                  {formikRegister.touched[name] &&
                    formikRegister.errors[name] && (
                      <p className="text-red-500 text-xs mt-1">
                        {formikRegister.errors[name]}
                      </p>
                    )}
                </div>
              ))}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-indigo-500 mt-5 text-white py-2 rounded-md font-medium transition ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-600"
                }`}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
              {message && (
                <p className="mt-4 text-sm text-center text-red-600">
                  {message}
                </p>
              )}
            </form>
            <div className="flex justify-center p-4 mt-1">
              <p className="text-gray-500 text-xs">Already have an account?</p>
              <p
                onClick={toggleLoginModal}
                className="text-blue-700 text-xs hover:underline cursor-pointer ml-1"
              >
                Log in
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <button onClick={toggleLoginModal} className="text-2xl">
              <IoCloseSharp />
            </button>
            <h1 className="text-center text-3xl font-semibold">Login</h1>
            <div className="flex items-center my-4 mt-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-3 text-xs text-gray-500">
                OR LOGIN WITH EMAIL
              </span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <form className="p-4" onSubmit={formikLogin.handleSubmit}>
              {[
                { name: "email", placeholder: "Enter Email", type: "email" },
                {
                  name: "password",
                  placeholder: "Enter Password",
                  type: "password",
                },
              ].map(({ name, placeholder, type }, index) => (
                <div key={index} className="mt-4">
                  <input
                    name={name}
                    type={type}
                    value={formikLogin.values[index]}
                    onChange={formikLogin.handleChange}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border mt-4 rounded-md text-sm"
                  />
                  {formikLogin.touched[name] && formikLogin.errors[name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {formikLogin.errors[name]}
                    </p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-indigo-500 mt-5 text-white py-2 rounded-md font-medium transition ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-600"
                }`}
              >
                {isLoading ? "Logging..." : "Login "}
              </button>
              {message && (
                <p className="mt-4 text-sm text-center text-red-600">
                  {message}
                </p>
              )}
            </form>
            <div className="flex justify-center p-4 mt-1">
              <p className="text-gray-500 text-xs">
                Don't have an account yet?
              </p>
              <p
                onClick={toggleRegisterModal}
                className="text-blue-700 text-xs hover:underline cursor-pointer ml-1"
              >
                Sign up
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
