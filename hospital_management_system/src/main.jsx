import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import "./index.css";

//  Dashboard imports
import DashboardLayout from "./Layout";
import Dashboard from "./dashboard/pages/dashboard/Dashboard";
import Staff from "./dashboard/pages/staff/Staff";
import Guest from "./dashboard/pages/guest/Guest";
import Room from "./dashboard/pages/room/Room";
import Cleaning from "./dashboard/pages/cleaning/Cleaning";
import Maintainence from "./dashboard/pages/maintainence/Maintainence";
import Booking from "./dashboard/pages/booking/Booking";
import Service from "./dashboard/pages/service/Service";

//  Client imports
import CheckOutRooms from "./client/page/CheckOutRooms";
import About from "./client/page/About";
import Gallery from "./client/page/Gallery";
import ClientLayout from "./ClientLayout"
import HomePage from "./client/page/HomePage";

// Create a single route structure
const router = createBrowserRouter([
  {
    path: "/admin", 
    element: <DashboardLayout />, 
    children: [
      { index: true, element: <Dashboard /> },
      { path: "staff", element: <Staff /> },
      { path: "guest", element: <Guest /> },
      { path: "room", element: <Room /> },
      { path: "cleaning", element: <Cleaning /> },
      { path: "maintainence", element: <Maintainence /> },
      { path: "booking", element: <Booking /> },
      { path: "service", element: <Service /> },
    ]
  },
  {
    path: "/", 
    element: <ClientLayout />, 
    children: [
      {  index: true, element: <HomePage /> },
      { path: "CheckoutRoom", element: <CheckOutRooms /> },
      { path: "Gallery", element: <Gallery /> },
      { path: "About", element: <About /> },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
);
