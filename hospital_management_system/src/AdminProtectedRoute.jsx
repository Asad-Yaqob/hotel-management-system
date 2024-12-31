import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStaffAuth } from "./context/auth/StaffAuthContext";

function AdminProtectedRoute({ children }) {
  const { isAuthenticated, checkAuthStatus } = useStaffAuth();

  useEffect(() => {
    async function verify() {
      await checkAuthStatus();
    }
    verify();
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Optional loading state
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
}

export default AdminProtectedRoute;
