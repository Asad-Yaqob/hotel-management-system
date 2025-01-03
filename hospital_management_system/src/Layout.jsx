import AppBar from "./dashboard/components/appbar/AppBar";
import SideBar from "./dashboard/components/sidebar/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarContextProvider } from "./context/Sidebar";
import { roles } from "./utils/constants";
import { Error } from "./dashboard/components/reusable/Error";
import { useStaffAuth } from "./context/auth/StaffAuthContext";

function DashboardLayout() {

  const { user } = useStaffAuth();

  // Case 2: If the user's role is invalid, show an error page
  if (!roles.includes(user?.role)) {
    return (
      <Error
        message="Only Staff can access this dashboard. Sorry"
        onRetry={() => useNavigate("/")}
      />
    );
  }

  // Case 3: If the user is deactivated, show a deactivation message
  if (user?.isActive === false) {
    return (
      <Error
        message="Your account is deactivated. Please contact the administrator."
        onRetry={() => useNavigate("/")}
      />
    );
  }

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
