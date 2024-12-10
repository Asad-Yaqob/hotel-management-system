import React from "react";
import HeroImage from "../assets/img/Hero.jpeg";

const Experience = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={HeroImage}
              alt="Luxury Room"
              className="w-full h-80 object-cover rounded-lg transition-transform transform hover:scale-105"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={HeroImage}
              alt="Luxury Room"
              className="w-full h-80 object-cover rounded-lg transition-transform transform hover:scale-105"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={HeroImage}
              alt="Luxury Room"
              className="w-full h-80 object-cover rounded-lg transition-transform transform hover:scale-105"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-700 p-8 md:p-16 mt-[-40px] rounded-lg shadow-lg">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">With our experience</h2>
            <h2 className="text-3xl md:text-4xl font-serif text-white">we will serve you</h2>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white">800+</h3>
              <p className="text-lg text-white">Cities</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white">3500+</h3>
              <p className="text-lg text-white">Exclusive Hotels</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white">2M</h3>
              <p className="text-lg text-white">Exclusive Rooms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
