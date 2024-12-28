import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useBookingContext } from "../../../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGuestAuth } from "../../../context/auth/GuestAuthContext";

export function GuestInformationForm({ room, checkInDate, checkOutDate }) {
  const { submitBooking } = useBookingContext();
  const { user } = useGuestAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(room.price);
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      password: user?.password || "",
      phone: "",
      country: "",
      city: "",
      address: "",
      cashPayment: false,
      cardNo: "",
      cvv: "",
    },
    onSubmit: async (values) => {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
        toast.error("Invalid check-in or check-out date.");
        return;
      }

      const roomPrice = room.price || 0;

      if (roomPrice <= 0) {
        toast.error("Invalid room price.");
        return;
      }

      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      if (nights <= 0) {
        toast.error("Check-out date must be after check-in date.");
        return;
      }

      const totalPrice = roomPrice * nights;

      if (isNaN(totalPrice) || totalPrice <= 0) {
        toast.error("Invalid total price calculation.");
        return;
      }

      // console.log("Total Price:", totalPrice);

      const bookingData = {
        room: room._id,
        checkInDate,
        checkOutDate,
        totalPrice,
        phone: values.phone,
        country: values.country,
        city: values.city,
        address: values.address,
        cashPayment: values.cashPayment,
        cardNo: values.cardNo,
        cvv: values.cvv,
      };

      if (user.role !== "guest") {
        bookingData.firstName = values.firstName;
        bookingData.lastName = values.lastName;
        bookingData.email = values.email;
        bookingData.password = values.password;
      }

      // console.log(bookingData, user.role);

      const { success, message } = await submitBooking(bookingData, user?.role);

      if (!success) {
        toast.dismiss();
        toast.error(message || "Room reservation failed.");
        return;
      }

      formik.resetForm();
      toast.dismiss();
      toast.success(message || "Room reserved successfully.");
      navigate(user?.role !== "guest" ? "/admin/booking" : "/CheckoutRoom");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
      <h3 className="text-xl font-semibold mb-4">Guest Information</h3>

      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {user.role !== "guest" && (
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      )}

      <div>
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="cashPayment"
            checked={formik.values.cashPayment}
            onChange={formik.handleChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span className="ml-2">Pay with cash</span>
        </label>
      </div>

      {!formik.values.cashPayment && (
        <>
          <div>
            <label>Card Number</label>
            <input
              type="text"
              name="cardNo"
              value={formik.values.cardNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={formik.values.cvv}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Complete Booking
      </button>
    </form>
  );
}
