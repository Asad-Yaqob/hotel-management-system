
import AppBar from "./dashboard/appbar/AppBar";
import SideBar from "./dashboard/sidebar/SideBar";
import { Outlet } from "react-router-dom";
import { SidebarContextProvider } from "./context/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar context wrapped only around the Sidebar and AppBar */}
      <SidebarContextProvider>
        {/* Sidebar */}
        <SideBar />

        {/* Main content container */}
        <div className="flex flex-col w-full">
          {/* AppBar */}
          <AppBar />

          {/* Main Content */}
          <div className="flex-1 bg-gray-100 p-5 overflow-auto">
            <Outlet />
          </div>
        </div>
      </SidebarContextProvider>
    </div>
  );
}

export default DashboardLayout;
