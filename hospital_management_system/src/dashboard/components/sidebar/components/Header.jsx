import React from "react";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { useSidebarContext } from "../../../../context/Sidebar";

const Header = () => {
  const { isSideBar, toggleSidebar } = useSidebarContext();

  return (
    <div>
      <div
        onClick={toggleSidebar}
        className="ms-3 mt-3 w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 hover:rounded-lg cursor-pointer transition-all duration-500"
      >
        {isSideBar ? (
          <TbLayoutSidebarLeftCollapse size={24} />
        ) : (
          <TbLayoutSidebarLeftExpand size={24} />
        )}
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center text-4xl pt-4 pb-2 w-full">
        <h2 className="font-bold">HMS</h2>
        <div className="w-16 border-t-2 border-black">
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Header;
