import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootProvider from "./context/RootProvider";
import "./index.css";

// Dashboard imports
import DashboardLayout from "./Layout";
import Dashboard from "./dashboard/pages/Dashboard";
import Staff from "./dashboard/pages/Staff";
import Guest from "./dashboard/pages/Guest";
import Room from "./dashboard/pages/Room";
import Cleaning from "./dashboard/pages/HouseKeeping";
import Maintainence from "./dashboard/pages/Maintainence";
import Booking from "./dashboard/pages/Booking";
import Service from "./dashboard/pages/Service";

// Client imports
import CheckOutRooms from "./client/page/CheckOutRooms";
import About from "./client/page/About";
import Gallery from "./client/page/Gallery";
import ClientLayout from "./ClientLayout";
import HomePage from "./client/page/HomePage";
import ProfilePage from "./dashboard/pages/Profile";
import StaffDetail from "./dashboard/pages/StaffDetail";
import RoomDetails from "./dashboard/pages/RoomDetail";
import GuestDetail from "./dashboard/pages/GuestDetail";
import SchedualCleaning from "./dashboard/components/housekeeping/SchedualCleaning";
import RoomDetailPage from "./client/page/RoomDetailPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import LoginForm from "./client/components/navbar/LoginForm";
import RegisterForm from "./client/components/navbar/RegisterForm";
import Login from "./dashboard/pages/Login";

// Create a single route structure
const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <DashboardLayout />
      </AdminProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "staff", element: <Staff /> },
      { path: "staffDetail/:staffId", element: <StaffDetail /> },
      { path: "guest", element: <Guest /> },
      { path: "guestDetail/:guestId", element: <GuestDetail /> },
      { path: "room", element: <Room /> },
      { path: "roomDetail/:roomId", element: <RoomDetails /> },
      { path: "House Keeping", element: <Cleaning /> },
      { path: "schedualCleaning/:roomId", element: <SchedualCleaning /> },
      { path: "maintainence", element: <Maintainence /> },
      { path: "booking", element: <Booking /> },
      { path: "service", element: <Service /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  { path: "/admin/login", element: <Login /> },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
      {
        path: "CheckoutRoom",
        element: (
          <ProtectedRoute>
            <CheckOutRooms />
          </ProtectedRoute>
        ),
      },
      { path: "RoomDetail/:roomId", element: <RoomDetailPage /> },
      { path: "Gallery", element: <Gallery /> },
      { path: "About", element: <About /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </RootProvider>
  </StrictMode>
);
