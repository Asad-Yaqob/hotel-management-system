import React from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import { useSidebarContext } from "../../context/Sidebar";

import { CiLogout } from "react-icons/ci";

const SideBar = () => {
  const { isSideBar } = useSidebarContext();

  return (
    <div
      className={`fixed md:static bg-gray-200 h-screen overflow-y-auto py-5 flex flex-col z-20 transition-all duration-500 ${
        isSideBar ? "w-64" : "w-0"
      }`}
    >
      <Header />

      <Navigation />
      
      <div className="flex items-center gap-3 ps-5 pt-5">
        <CiLogout />
        <a href="#">Log out</a>
      </div>
    </div>
  );
};

export default SideBar;
