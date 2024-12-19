
import AppBar from "./dashboard/components/appbar/AppBar";
import SideBar from "./dashboard/components/sidebar/SideBar";
import { Outlet } from "react-router-dom";
import { SidebarContextProvider } from "./context/Sidebar";
import { useStaffAuthContext } from "./context/auth/StaffAuthContext";
import Login from "./dashboard/pages/auth/Login";
import { useEffect } from "react";



function DashboardLayout() {
  const { isLoggedIn } = useStaffAuthContext();

  // Render the login screen if the user is not logged in
  if (isLoggedIn) {
    return <Login />;
  }

  // Render the dashboard layout if the user is logged in
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



