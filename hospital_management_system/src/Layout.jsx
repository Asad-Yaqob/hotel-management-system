import AppBar from "./dashboard/components/appbar/AppBar";
import SideBar from "./dashboard/components/sidebar/SideBar";
import { Outlet } from "react-router-dom";
import { SidebarContextProvider } from "./context/Sidebar";

function DashboardLayout() {
  
  return (
    <div className="flex h-screen">
      <SidebarContextProvider>
        {/* Sidebar */}
        <SideBar />

        {/* Main content */}
        <div className="flex flex-col w-full">
          <AppBar />
          <div className="flex-1 bg-gray-100 p-5 overflow-auto">
            <Outlet />
          </div>
        </div>
      </SidebarContextProvider>
    </div>
  );
}

export default DashboardLayout;
