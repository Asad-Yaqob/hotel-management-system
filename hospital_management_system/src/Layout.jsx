import AppBar from "./dashboard/components/appbar/AppBar";
import SideBar from "./dashboard/components/sidebar/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarContextProvider } from "./context/Sidebar";
import { useStaffAuth } from "./context/auth/StaffAuthContext";
import Login from "./dashboard/pages/Login";
import { roles } from "./utils/constants";
import { Error } from "./dashboard/components/reusable/Error";
import { useEffect, useState } from "react";

function DashboardLayout() {
  const { isAuthenticated, user } = useStaffAuth();
  const navigate = useNavigate();
  const [isUserInitialized, setIsUserInitialized] = useState(false);

  useEffect(() => {
    // Wait for user to be initialized
    if (isAuthenticated) {
      if (user) {
        if (user.role && roles.includes(user.role)) {
          if (user.isActive === false) {
            navigate("/");
          }
        } else {
          navigate("/");
        }
        setIsUserInitialized(true); // Mark initialization as complete
      }
    } else {
      setIsUserInitialized(true); // Mark initialization complete if not authenticated
    }
  }, []);

  // Show a loading spinner or message while user is being initialized
  if (!isUserInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Case 1: If the user is not logged in, show the Login page
  if (!isAuthenticated) {
    return <Login />;
  }

  // Case 2: If the user's role is invalid, show an error page
  if (!roles.includes(user.role)) {
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
