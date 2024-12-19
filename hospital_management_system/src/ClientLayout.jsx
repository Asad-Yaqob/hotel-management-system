import Navbar from "../src/client/Navbar"
import Footer from "../src/client/Footer"

import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/auth/GuestAuthContext";


function ClientLayout() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default ClientLayout;
