import React from 'react';
import HeroImage from '../assets/img/background.jpeg';

const Blog = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
  <div
    className="container mx-4 sm:mx-8 lg:mx-16 rounded-lg overflow-hidden shadow-lg"
    style={{
      backgroundImage: `url(${HeroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="flex flex-col justify-center items-center text-center p-8 lg:p-16 h-full bg-black/60">
      <div className="bg-white/90 p-8 lg:p-12 rounded-lg shadow-lg max-w-3xl w-full">
        <p className="font-bold text-lg sm:text-xl md:text-1xl text-gray-700 tracking-wide">
          STORIES DELIVERED STRAIGHT
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-serif mt-4 text-gray-800">
          Sign up for exclusive offers from us
        </h1>
        <button className="mt-6 py-3 px-10 bg-gradient-to-r from-slate-800 to-slate-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 transition-all transform hover:scale-105">
          Login
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Blog;
