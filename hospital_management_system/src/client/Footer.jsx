import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">About</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-gray-800">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                Our rooms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                Contact us
              </a>
            </li>
          </ul>
        </div>

        {/* Reservation Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Reservation</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-gray-800">
                Request invoice
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                Find a reservation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                Accommodation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                Destination articles
              </a>
            </li>
          </ul>
        </div>

        {/* Opening Hours Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Opening hours</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Mon – Fri: 12AM – 10PM</li>
            <li>Saturday: 9AM – 5PM</li>
            <li>Sunday: 11AM – 3PM</li>
          </ul>
        </div>

        {/* Address Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Address</h3>
          <p className="text-gray-600">
            Unit 7 / 91-93 Macleay St.
            <br />
            Potts Point New South Wales,
            <br />
            Australia 2011
          </p>
        </div>
      </div>

     
      
    </footer>
  );
};

export default Footer;
