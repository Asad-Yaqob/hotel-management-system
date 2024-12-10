import React, { useState, useEffect } from 'react';
import HeroImage from '../../assets/img/Hero.jpeg';
import { IoClose } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { SearchData } from '../../Data/data';

const CheckOutRooms = () => {
  const [todayDate, setTodayDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState(''); // State for user input of guests
  const [filteredRooms, setFilteredRooms] = useState([]); // State for filtered rooms
  const [selectedRoom, setSelectedRoom] = useState(null); // State for the selected room

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setTodayDate(`${year}-${month}-${day}`);
  }, []);

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null); // Clear the selected room when the modal closes
  };

  const handleBookNow = () => {
    const numGuests = Number(guests);
    if (!isNaN(numGuests) && numGuests > 0) {
      // Filter rooms based on the number of guests
      const filtered = SearchData.filter(room => Number(room.Guests) === numGuests);
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms([]); // Clear the list if input is invalid or empty
    }
  };

  return (
    <div>
      <div
        name="home"
        className="w-full bg-zinc-200 pt-[80px] overflow-hidden"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="mt-24 sm:mt-36 h-full">
          <div className="bg-black/40 text-white text-center p-6 sm:p-8 rounded-lg mx-4 sm:mx-auto">
            <p className="font-serif text-4xl sm:text-6xl">Welcome to Hotel</p>
            <h1 className="text-lg sm:text-2xl font-sans mt-4">
              The Place where you are looking for
            </h1>
            <Link to="/Gallery">
              <button className="mt-6 border py-2 px-10 sm:px-20 bg-white text-black transition-all hover:bg-slate-400 hover:text-white rounded-lg">
                Explore More
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-10 px-4">
        <div className="container mx-auto border h-auto sm:h-28 flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-100 rounded-lg gap-4">
          <div className="flex flex-col items-start w-full sm:w-1/5">
            <label htmlFor="checkIn" className="text-sm font-semibold mb-1">
              Check-in <span className="text-gray-400">(i)</span>
            </label>
            <input
              type="date"
              id="checkIn"
              className="border rounded-md w-full p-2 text-sm"
              min={todayDate}
            />
          </div>

          <div className="flex flex-col items-start w-full sm:w-1/5">
            <label htmlFor="checkOut" className="text-sm font-semibold mb-1">
              Check-out
            </label>
            <input
              type="date"
              id="checkOut"
              className="border rounded-md w-full p-2 text-sm"
              min={todayDate}
            />
          </div>

          <div className="flex flex-col items-start w-full sm:w-1/5">
            <label htmlFor="guests" className="text-sm font-semibold mb-1">
              Guests
            </label>
            <input
              type="number"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="1"
              className="border rounded-md w-full p-2 text-sm"
              min="1"
            />
          </div>

          {/* Promo Field */}
          <div className="flex flex-col items-start w-full sm:w-1/5">
            <label htmlFor="promo" className="text-sm font-semibold mb-1">
              Promo
            </label>
            <input
              type="text"
              id="promo"
              className="border rounded-md w-full p-2 text-sm"
            />
          </div>

          <button
            onClick={handleBookNow}
            className="bg-blue-600 text-white font-semibold py-2 px-6 sm:mt-6 rounded-lg hover:bg-blue-400 w-full sm:w-auto"
          >
            Book Now
          </button>
        </div>
      </div>

      <section className="py-10 bg-gray-100 px-4">
        {/* Show only filtered rooms after clicking the button */}
        {filteredRooms.length > 0 && filteredRooms.map((room, index) => (
          <div key={room.id} className="container mx-auto border rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div className="sm:col-span-2 relative">
                <img
                  src={room.image}
                  alt="Room"
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => openModal(room)}
                  className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full"
                >
                  📷
                </button>
              </div>

              <div className="sm:col-span-3 bg-white p-4 sm:p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Best Available Rate
                  </h2>
                  <p className="text-gray-500">USD {room.price}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-medium">Guest ({room.Guests})</p>
                    <div className="flex items-center mt-2">
                      <span className="text-lg">👤</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Booking Policy</p>
                    <a href="#" className="text-blue-600 mt-2 block">
                      View Details
                    </a>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">475.00 Avg/night</p>
                    <p className="text-sm text-gray-500">
                      + 123.50 taxes and charges
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">No of Room(s)</p>
                    <select className="w-full mt-2 border rounded-lg p-2 text-sm">
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
                <button className="mt-6 border bg-black hover:bg-slate-300 hover:text-black text-white py-2 px-10 rounded w-full sm:w-auto">
                  Book Now
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50">
              <h3 className="text-lg font-semibold">{room.name}</h3>
            </div>
          </div>
        ))}
      </section>

      {/* Modal to display selected room details */}
      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-3xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black text-3xl hover:text-red-500"
            >
              <IoClose />
            </button>

            <div className="max-h-[80vh] overflow-y-auto scroll-hidden">
              <div className="w-full">
                <img
                  src={selectedRoom.image}
                  alt="Room"
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedRoom.name}</h1>
          <p className="text-gray-600 text-sm mb-8">
            Experience the ultimate luxury and comfort in our Deluxe Suite King. 
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-600">
            {selectedRoom.Description}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Bed Type</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <FaBed className="text-lg text-gray-800" /> {selectedRoom.bed}
            </p>
            <p className="text-gray-600 text-sm mt-2">Prices are per room. ${selectedRoom.price}</p>
          </div>
~
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <p className="text-gray-600 flex items-center gap-2">✔ King Bed</p>
              <p className="text-gray-600 flex items-center gap-2">✔ Minibar</p>
              <p className="text-gray-600 flex items-center gap-2">✔ Free Breakfast</p>
              <p className="text-gray-600 flex items-center gap-2">✔ Safe in Room</p>
              <p className="text-gray-600 flex items-center gap-2">✔ Free Wifi</p>
              <p className="text-gray-600 flex items-center gap-2">✔ Telephone</p>
              <p className="text-gray-600 flex items-center gap-2">✔ Air Conditioning</p>
              <p className="text-gray-600 flex items-center gap-2">✔ Desk</p>
              <p className="text-gray-600 flex items-center gap-2">✔ LCD/Plasma TV</p>
              <p className="text-gray-600 flex items-center gap-2">✔ Electronic Key Card</p>
              <p className="text-gray-600 flex items-center gap-2">✔ Safety Deposit Box</p>
            </div>
          </div>
        </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutRooms;
