import React, { useEffect, useState } from "react";
import { useStaffAuth } from "./context/auth/StaffAuthContext";
import { Navigate } from "react-router-dom";

export function AdminProtectedRoute({ children }) {
  const { isAuthenticated, checkAuthStatus } = useStaffAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkAuthStatus();
      setIsLoading(false); 
    };
    verify();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
}
