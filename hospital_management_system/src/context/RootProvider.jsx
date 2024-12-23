import { StaffAuthProvider } from "../context/auth/StaffAuthContext"; //
import { GuestAuthProvider } from "./auth/GuestAuthContext";
import { MaintainenceProvider } from "./MaintainenceContext";
import { RoomContextProvider } from "./RoomContext";

const RootProvider = ({ children }) => {
  return (
    <StaffAuthProvider>
      <GuestAuthProvider>
        <RoomContextProvider>
          <MaintainenceProvider>{children}</MaintainenceProvider>
        </RoomContextProvider>
      </GuestAuthProvider>
    </StaffAuthProvider>
  );
};

export default RootProvider;
