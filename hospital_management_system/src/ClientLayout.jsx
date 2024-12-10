import Navbar from "../src/client/Navbar"
import Footer from "../src/client/Footer"

import { Outlet } from "react-router-dom";


function ClientLayout() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
</div>
  );
}

export default ClientLayout;
