import React from 'react';
import HeroImage from '../assets/img/Hero.jpeg';

const Hero = () => {
  return (
    <div
      name="home"
      className="w-full h-screen bg-cover bg-center bg-no-repeat pt-[80px] overflow-hidden"
      style={{
        backgroundImage: `url(${HeroImage})`,
      }}
    >
      <div className="flex flex-col justify-center items-center h-full px-4 sm:px-8 lg:px-16">
        <div className="bg-black/50 text-white p-8 rounded-lg shadow-lg max-w-4xl w-full text-center">
          <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
            Your Gateway to:
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-4">
            Comfort & Convenience
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 font-medium mt-4">
            Experience features picked for better value than ever. Enjoy the perfect blend of luxury and practicality.
          </p>
          <button className="mt-6 border border-white py-2 px-8 sm:px-10 md:px-14 bg-white text-black font-semibold transition-all hover:bg-gray-100 hover:text-black rounded-lg shadow-md hover:shadow-lg transform hover:scale-105">
            Get Your Room Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
