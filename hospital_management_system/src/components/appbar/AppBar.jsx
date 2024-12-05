import React from "react";

import { useSidebarContext } from "../../context/Sidebar" ;
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";

const AppBar = () => {

const { isSideBar, toggleSidebar } = useSidebarContext();
  
  return (
    <div className="bg-slate-600 flex items-center p-5">
      {/* Toggle Button (Hidden on larger screens when sidebar is open) */}
      {!isSideBar && (
        <div
          onClick={toggleSidebar}
          className="hover:bg-gray-300 hover:rounded-lg cursor-pointer transition-all duration-500  "
        >
          <TbLayoutSidebarLeftExpand size={24} />
        </div>
      )}

      <div className="ps-5 flex">
        <input
          type="text"
          placeholder="search..."
          className="px-10 py-2 bg-gray-300 rounded hover:border-none"
        />
        <div className="bg-gray-300 ms-3 rounded px-2 flex cursor-pointer">
          <button>
            <CiSearch size={30} />
          </button>
        </div>
      </div>

      <div className="ms-5 flex gap-5">
        <div className="bg-gray-200 rounded-full p-2">
          <IoMdNotificationsOutline />
        </div>

        <div className="flex gap-3 items-center">
          <div className="bg-gray-200 rounded-full">
            <img
              src="src\assets\react.svg"
              alt="profile"
              className="roundex-full"
            />
          </div>

          <div className="flex gap-3 items-center">
            <span>Jhon</span>

            <div className="hover:">
            <FaCaretDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
