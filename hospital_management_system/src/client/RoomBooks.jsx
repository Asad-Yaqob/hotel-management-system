import React from 'react';
import HeroImage from '../assets/img/deluxe.jpeg';
import E from '../assets/img/e.jpeg';
import P from '../assets/img/p.jpeg';
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
  {[
    {
      title: "DELUXE",
      description: "Chicly embellished decor  design and modern amenities for a relaxed stay.",
      image: HeroImage,
      alt: "Deluxe Room",
      galleryLink: "/Gallery",
      reserveLink: "/CheckoutRoom",
    },
    {
      title: "PEARL",
      description: "Elegant, earthy tones with luxurious textures offering gorgeous city views.",
      image: E,
      alt: "Pearl Room",
      galleryLink: "/Gallery",
      reserveLink: "/CheckoutRoom",
    },
    {
      title: "EXECUTIVE",
      description: "King-sized bed, spacious bathroom, writing desk, and mini bar for a premium experience.",
      image: P,
      alt: "Executive Room",
      galleryLink: "/Gallery",
      reserveLink: "/CheckoutRoom",
    },
  ].map((room, index) => (
    <div
  key={index}
  className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
>
  <div className="relative">
    <img
      src={room.image}
      className="w-full h-64 object-cover"
      alt={room.alt}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
    <h1 className="absolute bottom-4 left-4 text-white text-3xl font-serif tracking-wide">
      {room.title}
    </h1>
  </div>
  <div className="p-6 bg-gray-50">
    <p className="text-gray-700 mb-6">{room.description}</p>
    <div className="flex gap-4">
      <Link to={room.galleryLink}>
        <button className="text-sm font-semibold py-2 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:shadow-lg hover:from-purple-600 hover:to-blue-600 transition">
          Discover More
        </button>
      </Link>
      <Link to={room.reserveLink}>
        <button className="text-sm font-semibold py-2 px-6 rounded-lg bg-gray-800 text-white shadow-md hover:bg-gray-700 transition">
          Reserve Now
        </button>
      </Link>
    </div>
  </div>
</div>
  
  ))}
</div>

      </div>
    </div>
  );
};

export default RoomBooks;
