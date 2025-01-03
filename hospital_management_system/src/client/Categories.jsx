import React from 'react';
import display from "../../public/img/display.jpeg";

const Categories = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black/95">Giving the:</h1>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl pl-4 font-serif">best just for you</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="border py-3 px-6 sm:px-8 rounded-full font-bold text-sm sm:text-base bg-slate-600 text-white transition-transform transform hover:scale-105">Restaurants & Bar</button>
          <button className="border py-3 px-6 sm:px-8 rounded-full font-bold text-sm sm:text-base bg-slate-100 hover:bg-slate-200 transition-colors">Spa & Wellness</button>
          <button className="border py-3 px-6 sm:px-8 rounded-full font-bold text-sm sm:text-base bg-slate-100 hover:bg-slate-200 transition-colors">Yoga & Fitness</button>
          <button className="border py-3 px-6 sm:px-8 rounded-full font-bold text-sm sm:text-base bg-slate-100 hover:bg-slate-200 transition-colors">Summer Terrace</button>
          <button className="border py-3 px-6 sm:px-8 rounded-full font-bold text-sm sm:text-base bg-slate-100 hover:bg-slate-200 transition-colors">Kids Playground</button>
          <button className="border py-3 px-6 sm:px-8 rounded-full font-bold text-sm sm:text-base bg-slate-100 hover:bg-slate-200 transition-colors">Swimming Pool</button>
          <button className="border py-3 px-6 sm:px-8 rounded-full font-bold text-sm sm:text-base bg-slate-100 hover:bg-slate-200 transition-colors">Events & Meeting</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img src={display} alt="Accommodation" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col space-y-6">
            <div>
              <h2 className="font-bold text-lg sm:text-xl">1. We provide the best choice for you to stay.</h2>
              <p className="font-sans text-sm sm:text-base">Experience our top-notch accommodations, ensuring your ultimate comfort and satisfaction during your stay.</p>
              <hr className="mt-3" />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl">2. We provide the best choice for you to stay.</h2>
              <p className="font-sans text-sm sm:text-base">Experience our top-notch accommodations, ensuring your ultimate comfort and satisfaction during your stay.</p>
              <hr className="mt-3" />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl">3. Can refund up to 100%</h2>
              <p className="font-sans text-sm sm:text-base">We offer a highly flexible refund policy allowing refunds of up to 100% of the booking amount when needed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
