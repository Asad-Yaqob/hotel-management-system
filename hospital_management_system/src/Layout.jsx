import AppBar from "./dashboard/components/appbar/AppBar";
import SideBar from "./dashboard/components/sidebar/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarContextProvider } from "./context/Sidebar";
import { useStaffAuth } from "./context/auth/StaffAuthContext";
import Login from "./dashboard/pages/Login";
import { roles } from "./utils/constants";
import { Error } from "./dashboard/components/reusable/Error";
import { useEffect } from "react";

function DashboardLayout() {
  const { isAuthenticated, user } = useStaffAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect if user role is invalid
      if (!roles.includes(user?.role)) {
        navigate("/");
      }

      // Redirect if the user is deactivated
      if (user?.isActive === false) {
        navigate("/"); 
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Case 1: If the user is not logged in, show the Login page
  if (!isAuthenticated) {
    return <Login />;
  }

  // Case 2: If the user's role is invalid, show an error page
  if (!roles.includes(user?.role)) {
    return (
      <Error
        message="Only Staff can access this dashboard. Sorry"
        onRetry={() => navigate("/")}
      />
    );
  }

  // Case 3: If the user is deactivated, show a deactivation message
  if (user?.isActive === false) {
    return (
      <Error
        message="Your account is deactivated. Please contact the administrator."
        onRetry={() => navigate("/")}
      />
    );
  }

  // Case 4: Valid user and role; render the dashboard layout
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
