import { CiLogout } from "react-icons/ci";
import { useSidebarContext } from "../../../context/Sidebar";
import { useStaffAuth } from "../../../context/auth/StaffAuthContext";
import Header from "./components/Header";
import Navigation from "./components/Navigation"
import { useNavigate } from "react-router-dom";

const SideBar = () => {

  const { isSideBar } = useSidebarContext();
  const { logout, accessToken } = useStaffAuth()

  const navigate = useNavigate();

  const logoutStaff = async () => {
    const response = await logout(accessToken);

    console.log(response)
    const { success } = response;

    if (success) {
      navigate("/admin");
    }
  };

  return (
    <div
      className={`fixed md:static bg-gray-300  h-screen overflow-y-auto py-5 flex flex-col z-20 transition-all duration-500 ${
        isSideBar ? "w-[400px]" : "w-0"
      }`}
    >
      <Header />

      <Navigation />

      <div className="flex items-center gap-3 ps-5 pt-5">
        <CiLogout />
        <button onClick={logoutStaff}>Log out</button>
      </div>
    </div>
  );
};

export default SideBar;