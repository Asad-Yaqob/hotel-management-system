import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useGuestAuth } from "./context/auth/GuestAuthContext";

function ProtectedRoute({ children }) {

  const { isAuthenticated, checkAuthStatus } = useGuestAuth();

  useEffect(() => {
    async function verify() {
      await checkAuthStatus();
    }
    verify();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Optional loading state
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
