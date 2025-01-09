import React from 'react'
import { RiMenu2Fill } from 'react-icons/ri';
import { NavLink, Link } from 'react-router-dom';

export const NavbarContent = ({ logout, setMenuOpen, menuOpen, isAuthenticated }) => {
  return (
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
            Reserve Room
          </NavLink>
          <NavLink
            to="/About"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded-lg bg-gray-700 transition duration-300 flex items-center"
                : "px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center"
            }
          >
            Blog
          </NavLink>
          {!isAuthenticated ? (
            <Link
              to={"/register"}
              className="border px-5 py-1 rounded-md hover:bg-gray-700"
            >
              Register
            </Link>
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
  );
};
