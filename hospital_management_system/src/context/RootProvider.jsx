import { SidebarContextProvider } from "../context/Sidebar";
import { AuthProvider } from "../context/auth/GuestAuthContext"; // Assuming you have this provider
import { StaffAuthContextProvider } from "../context/auth/StaffAuthContext"; // Assuming you have this provider

const RootProvider = ({ children }) => {
  return (
    <AuthProvider>
      <StaffAuthContextProvider>
        <SidebarContextProvider>{children}</SidebarContextProvider>
      </StaffAuthContextProvider>
    </AuthProvider>
  );
};

export default RootProvider;
