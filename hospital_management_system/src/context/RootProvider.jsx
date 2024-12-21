import { StaffAuthProvider } from "../context/auth/StaffAuthContext"; //
import { GuestAuthProvider } from "./auth/GuestAuthContext";

const RootProvider = ({ children }) => {
  return (
    <StaffAuthProvider>
      <GuestAuthProvider>{children}</GuestAuthProvider>
    </StaffAuthProvider>
  );
};

export default RootProvider;
