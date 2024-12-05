import AppBar from "./components/appbar/AppBar";
import SideBar from "./components/sidebar/SideBar";
import { Outlet } from "react-router-dom";
import { SidebarContextProvider } from "./context/Sidebar";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Wrap only Sidebar and AppBar with SidebarContextProvider */}
      <SidebarContextProvider>
        {/* AppBar */}
        <AppBar />

        <div className="flex flex-1">
          {/* Sidebar */}
          <SideBar />

          {/* Main Content */}
          <div className="flex-1 bg-gray-100 p-5 overflow-auto">
            <Outlet />
          </div>
        </div>
      </SidebarContextProvider>
    </div>
  );
}

export default Layout;
