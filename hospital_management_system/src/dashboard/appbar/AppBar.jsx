import { CiSearch } from "react-icons/ci";
import { useSidebarContext } from "../../context/Sidebar";
import { IoMdNotificationsOutline } from "react-icons/io";
import Dropdown from "./Dropdown";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

const AppBar = () => {
  const { isSideBar, toggleSidebar } = useSidebarContext();

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-900 text-white flex  items-center p-4 shadow-lg z-20 transition-all duration-300">
      {/* Toggle Button (Hidden on larger screens when sidebar is open) */}
      {!isSideBar && (
        <div
          onClick={toggleSidebar}
          className="hover:bg-indigo-500 hover:rounded-full cursor-pointer p-2 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <TbLayoutSidebarLeftExpand size={24} />
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center mx-5 flex-grow">
        <div className="relative flex items-center w-full max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full bg-gray-300 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 transition-all duration-300 ease-in-out"
          />
          <button className="absolute right-3">
            <CiSearch
              size={24}
              className="text-gray-800 hover:text-white transition-all duration-200"
            />
          </button>
        </div>
      </div>

      {/* Notification and User Profile */}
      <div className="flex items-center gap-5 ml-5">
        <div className="relative">
          <div className="bg-gray-300 p-2 rounded-full hover:bg-indigo-500 cursor-pointer transition-all duration-300">
            <IoMdNotificationsOutline size={24} className="text-black" />
            {/* Notification Badge */}
            <span className="absolute top-0 right-0 bg-red-600 text-xs text-white rounded-full w-3 h-3 flex justify-center items-center">
              !
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default AppBar;
