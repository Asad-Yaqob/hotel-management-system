import React from "react";
import {
  MdSupervisorAccount,
  MdManageAccounts,
  MdDryCleaning,
} from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { IoIosPaper, IoIosSettings } from "react-icons/io";
import { IoBed } from "react-icons/io5";
import { FaServicestack } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  
  const menuItems = [
    { name: "dashboard", icon: <RiDashboard2Fill /> },
    { name: "staff", icon: <MdManageAccounts /> },
    { name: "guest", icon: <MdSupervisorAccount /> },
    { name: "room", icon: <IoBed /> },
    { name: "cleaning", icon: <MdDryCleaning /> },
    { name: "maintainence", icon: <IoIosSettings /> },
    { name: "service", icon: <FaServicestack /> },
    { name: "booking", icon: <IoIosPaper /> },
  ];

  return (
    <div>
      {/* Navigation */}
      <ul className="pt-5 lg:text-xl">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-2 p-2 cursor-pointer ps-5 hover:bg-gray-100 hover:text-purple-700"
          >
            {item.icon}
            <NavLink
              to={item.name}
              className={({ isActive }) =>
                `${
                  isActive
                    ? " text-purple-800 border-r-4 border-purple-600"
                    : ""
                } w-full`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="w-[80%] border-t-2 border-gray-300 mx-auto mt-6">
        <hr />
      </div>
    </div>
  );
};

export default Navigation;
