import React, { useState, useCallback, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { RiMenu2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useGuestAuth } from "../context/auth/GuestAuthContext";
import Modal from "./components/navbar/Modal";
import RegisterForm from "./components/navbar/RegisterForm";
import LoginForm from "./components/navbar/LoginForm";

const Navbar = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { isAuthenticated, login, register, logout, isLoading } = useGuestAuth();

  const toggleRegisterModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
    setIsLoginModalOpen(false);
    setMenuOpen(false);
  }, [isModalOpen]);

  const toggleLoginModal = useCallback(() => {
    setIsLoginModalOpen(!isLoginModalOpen);
    setIsModalOpen(false);
    setMenuOpen(false);
  }, [isLoginModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await register(values.firstName, values.lastName, values.email, values.password);
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
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { success } = await login(values.email, values.password);
      if (success) {
        setMessage("Login Successful.");
        toast.dismiss();
        toast.success("Login Successful.");
        setIsLoginModalOpen(false);
        setIsModalOpen(false);
        setMenuOpen(false);
        return;
      }
      setMessage("Something went wrong.");
      toast.dismiss();
      toast.error("Login failed.");
    },
  });

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700 rounded-b-xl shadow-md">
        <div className="hidden md:flex">
          <ul className="flex items-center gap-4 text-lg text-white">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-lg bg-gray-700 transition duration-300 flex items-center"
                  : "px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/Amenities"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-lg bg-gray-700 transition duration-300"
                  : "px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
              }
            >
              Amenities
            </NavLink>
            <NavLink
              to="/Gallery"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-lg bg-gray-700 transition duration-300 flex items-center"
                  : "px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center"
              }
            >
              Gallery
            </NavLink>
          </ul>
        </div>
        <div className="text-white">
          <NavLink to="/">
            <h1 className="text-2xl font-semibold">LuxuryStay Hospitality</h1>
          </NavLink>
        </div>
        <div className="hidden md:flex">
          <ul className="flex items-center gap-4 text-lg text-white">
            <NavLink
              to="/CheckoutRoom"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-lg bg-gray-700 transition duration-300 flex items-center"
                  : "px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center"
              }
            >
              Rooms
            </NavLink>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-lg bg-gray-700 transition duration-300 flex items-center"
                  : "px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center"
              }
            >
              Blog <MdKeyboardArrowDown className="ml-2" />
            </NavLink>
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
        <div className="text-white md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <RiMenu2Fill size={25} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black">
          <ul className="flex flex-col items-center text-lg text-white">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "w-full px-6 py-4 border-b border-gray-700 bg-gray-700 transition duration-300 text-center"
                  : "w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/Pages"
              className={({ isActive }) =>
                isActive
                  ? "w-full px-6 py-4 border-b border-gray-700 bg-gray-700 transition duration-300 text-center"
                  : "w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center"
              }
            >
              Pages
            </NavLink>
            <NavLink
              to="/Amenities"
              className={({ isActive }) =>
                isActive
                  ? "w-full px-6 py-4 border-b border-gray-700 bg-gray-700 transition duration-300 text-center"
                  : "w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center"
              }
            >
              Amenities
            </NavLink>
            <NavLink
              to="/Gallery"
              className={({ isActive }) =>
                isActive
                  ? "w-full px-6 py-4 border-b border-gray-700 bg-gray-700 transition duration-300 text-center"
                  : "w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center"
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="/Rooms"
              className={({ isActive }) =>
                isActive
                  ? "w-full px-6 py-4 border-b border-gray-700 bg-gray-700 transition duration-300 text-center"
                  : "w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center"
              }
            >
              Rooms
            </NavLink>
            <NavLink
              to="/Blog"
              className={({ isActive }) =>
                isActive
                  ? "w-full px-6 py-4 border-b border-gray-700 bg-gray-700 transition duration-300 text-center"
                  : "w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center"
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/Contact"
              className={({ isActive }) =>
                isActive
                  ? "w-full px-6 py-4 border-b border-gray-700 bg-gray-700 transition duration-300 text-center"
                  : "w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center"
              }
            >
              Contact
            </NavLink>
            {!isAuthenticated ? (
              <button
                onClick={toggleRegisterModal}
                className="border px-5 py-1 rounded-md hover:bg-gray-700 w-full text-center mt-4"
              >
                Register
              </button>
            ) : (
              <button
                onClick={logout}
                className="border px-5 py-1 rounded-md hover:bg-gray-700 w-full text-center mt-4"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      )}
      
      {isModalOpen && (
        <Modal onClose={toggleRegisterModal}>
          <RegisterForm
            formik={formikRegister}
            message={message}
            isLoading={isLoading}
            toggleLoginModal={toggleLoginModal}
          />
        </Modal>
      )}
      {isLoginModalOpen && (
        <Modal onClose={toggleLoginModal}>
          <LoginForm
            formik={formikLogin}
            message={message}
            isLoading={isLoading}
            toggleRegisterModal={toggleRegisterModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
