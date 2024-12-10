import React from 'react';
import HeroImage from '../assets/img/Hero.jpeg';

const Blog = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div
        name="home"
        className="container mx-4 sm:mx-8 lg:mx-16 rounded-lg bg-zinc-200 overflow-hidden"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex flex-col justify-center items-center text-center p-8 lg:p-12 h-full">
          <div className="bg-black/50 text-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
            <p className="font-bold text-slate-800 text-lg sm:text-xl md:text-2xl">
              STORIES DELIVERED STRAIGHT
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mt-4 text-slate-950">
              Sign up for exclusive offers from us
            </h1>

            <button className="mt-6 py-2 px-8 sm:px-10 md:px-14 bg-slate-700 text-white font-semibold transition-all hover:bg-slate-500 hover:text-black rounded-full shadow-md hover:shadow-lg transform hover:scale-105">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
