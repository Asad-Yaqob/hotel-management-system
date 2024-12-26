import React from "react";
import { useFormik } from "formik";
import { useBookingContext } from "../../../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function GuestInformationForm({ room, checkInDate, checkOutDate }) {
  const { submitBooking } = useBookingContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      country: "",
      city: "",
      address: "",
      cashPayment: false,
      cardNo: "",
      cvv: "",
    },
    onSubmit: async (values) => {
      const nights = Math.ceil(
        (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = room.price * nights;

      const response = await submitBooking({
        ...values,
        roomId: room._id,
        checkInDate,
        checkOutDate,
        totalPrice,
      });

      if (response) {
        formik.resetForm();
        toast.dismiss();
        toast.success("room reservered  successfully.");
        useNavigate("/admin/booking");
        return;
      }

      toast.dismiss();
      toast.error("room reservation  failed.");
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
