import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import "./index.css";

import Layout from "./Layout";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Staff from "./components/pages/staff/Staff";
import Guest from "./components/pages/guest/Guest";
import Room from "./components/pages/room/Room";
import Cleaning from "./components/pages/cleaning/Cleaning";
import Maintainence from "./components/pages/maintainence/Maintainence";
import Booking from "./components/pages/booking/Booking";
import Service from "./components/pages/service/Service";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/guest" element={<Guest />} />
      <Route path="/room" element={<Room />} />
      <Route path="/cleaning" element={<Cleaning />} />
      <Route path="/maintainence" element={<Maintainence />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/service" element={<Service />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
);
