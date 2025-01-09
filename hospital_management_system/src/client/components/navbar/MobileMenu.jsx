import React from "react";
import { NavLink, Link } from "react-router-dom";

export const MobileMenu = ({ logout, isAuthenticated }) => {
  return (
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
          to="/CheckoutRoom"
          className={({ isActive }) =>
            isActive
              ? "w-full px-6 py-4 border-b border-gray-700 bg-gray-700 transition duration-300 text-center"
              : "w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center"
          }
        >
          Reserve Room
        </NavLink>
        <NavLink
          to="/About"
          className={({ isActive }) =>
            isActive
              ? "w-full px-6 py-4 border-b border-gray-700 bg-gray-700 transition duration-300 text-center"
              : "w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center"
          }
        >
          Blog
        </NavLink>
        {!isAuthenticated ? (
          <Link
            to={"/register"}
            className="border px-5 py-1 rounded-md hover:bg-gray-700 w-full text-center mt-4"
          >
            Register
          </Link>
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
  );
};
