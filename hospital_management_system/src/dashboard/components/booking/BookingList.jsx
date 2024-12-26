import React from 'react'
import { convertDateToDDMMYYYY } from '../../../utils/dateFormater';

const BookingList = ({bookings, allGuests, roomData, }) => {
  return (
    <div className="rounded-lg mb-10">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      {bookings?.length > 0 ? (
        <table className="w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Guest</th>
              <th className="p-3 text-left">Total Price</th>
              <th className="p-3 text-left">Room Number</th>
              <th className="p-3 text-left">Check In </th>
              <th className="p-3 text-left">Check Out</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => {
              const guest = allGuests.find(
                (guest) => guest._id == booking.guest
              );
              const room = roomData.find((room) => room._id == booking.room);

              const checkInDate = convertDateToDDMMYYYY(booking.checkInDate);
              const checkOutDate = convertDateToDDMMYYYY(booking.checkOutDate);

              return (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-2">
                    {guest?.firstName || booking.guest}
                  </td>
                  <td className="border-b px-4 py-2">
                    ${booking.totalPrice}/night
                  </td>
                  <td className="border-b px-4 py-2">
                    {room?.roomNo || booking.room}
                  </td>
                  <td className="border-b px-4 py-2">{checkInDate}</td>
                  <td className="border-b px-4 py-2">{checkOutDate}</td>
                  <td className="border-b px-4 py-2">{booking.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-gray-500">No booking available</div>
      )}
    </div>
  );
}

export default BookingList
