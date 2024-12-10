import React from 'react';
import HeroImage from '../assets/img/Hero.jpeg';
import { Link } from 'react-router-dom';

const RoomBooks = () => {
  return (
    <div className="w-full bg-gray-100 py-10">
      <div className="container mx-auto px-6 md:px-10">
        {/* Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">Your dream:</h1>
            <h1 className="text-6xl font-serif text-gray-800">luxurious hotel room</h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Escape to the epitome of comfort and elegance with our luxurious rooms.
              Designed to meet your every desire, these spaces redefine relaxation and style.
              Experience a stay like no other!
            </p>
          </div>
          <div className="flex flex-col justify-center items-start space-y-4">
            <p className="text-sm md:text-base text-gray-600">
              Discover the finest rooms tailored for your perfect getaway.
              Indulge in unmatched luxury and comfort.
            </p>
            <button className="font-bold underline underline-offset-4 text-orange-600 hover:text-orange-800 transition">
              View all rooms:
            </button>
          </div>
        </div>

        {/* Rooms Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Deluxe Room */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-transform duration-300">
            <img src={HeroImage} className="w-full h-48 object-cover" alt="Deluxe Room" />
            <div className="p-5">
              <h1 className="font-serif text-2xl text-gray-900">DELUXE</h1>
              <p className="text-gray-700 mt-4">
                Our Deluxe room offers chicly embellished decor fused with contemporary design and
                modern amenities to ensure that you enjoy a relaxed and comfortable stay.
              </p>
              <div className="flex gap-4 mt-6">
              <Link to="/Gallery"><button className="font-bold text-sm border rounded-2xl py-2 px-6 bg-gray-300 hover:bg-gray-800 hover:text-white transition">
                  Discover More
                </button>
                </Link>
                <Link to="/CheckoutRoom">
                  <button className="font-bold text-sm border rounded-2xl py-2 px-6 bg-gray-800 text-white hover:bg-gray-300 hover:text-black transition">
                    Reserve Now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Pearl Room */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-transform duration-300">
            <img src={HeroImage} className="w-full h-48 object-cover" alt="Pearl Room" />
            <div className="p-5">
              <h1 className="font-serif text-2xl text-gray-900">PEARL</h1>
              <p className="text-gray-700 mt-4">
                Living up to its name, aesthetically pleasing and contemporary decor the Pearl room
                adorns elegant, earthy tones and luxurious textures offering gorgeous city views.
              </p>
              <div className="flex gap-4 mt-6">
              <Link to="/Gallery"><button className="font-bold text-sm border rounded-2xl py-2 px-6 bg-gray-300 hover:bg-gray-800 hover:text-white transition">
                  Discover More
                </button>
                </Link>
                <button className="font-bold text-sm border rounded-2xl py-2 px-6 bg-gray-800 text-white hover:bg-gray-300 hover:text-black transition">
                  Reserve Now
                </button>
              </div>
            </div>
          </div>

          {/* Executive Room */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-transform duration-300">
            <img src={HeroImage} className="w-full h-48 object-cover" alt="Executive Room" />
            <div className="p-5">
              <h1 className="font-serif text-2xl text-gray-900">EXECUTIVE</h1>
              <p className="text-gray-700 mt-4">
                Offering an aesthetically pleasing and contemporary decor, our Executive room is
                furnished with a king-sized bed, spacious bathroom, writing desk, and mini bar.
              </p>
              <div className="flex gap-4 mt-6">
              <Link to="/Gallery"><button className="font-bold text-sm border rounded-2xl py-2 px-6 bg-gray-300 hover:bg-gray-800 hover:text-white transition">
                  Discover More
                </button>
                </Link>
                <button className="font-bold text-sm border rounded-2xl py-2 px-6 bg-gray-800 text-white hover:bg-gray-300 hover:text-black transition">
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBooks;
