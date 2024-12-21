import { useState, useRef, useEffect } from "react";
import { useStaffAuth } from "../../../context/auth/StaffAuthContext";
import { Link, useNavigate } from "react-router-dom";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { logout, user } = useStaffAuth();
    const navigate = useNavigate();

  const logoutStaff = async () => {
    
   const response = await logout();

   const { success } = response;

   if (success) {
     navigate('/admin');
   }

  }
    
  // Handle click outside to close the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out text-white focus:outline-none"
      >
        <img
          src={user?.avatar}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <span className="font-semibold">{user?.staffName}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-10 overflow-hidden transition-all duration-300 ease-in-out transform opacity-100">
          <Link
            to={'profile'}
            className="block px-4 py-3 text-sm text-gray-800 hover:bg-indigo-50 transition duration-300 ease-in-out"
          >
            Profile
          </Link>
          <button
            onClick={logoutStaff}
            className="block w-full text-left px-4 py-3 text-sm text-gray-800 hover:bg-indigo-50 transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
