import React, { useRef, useState } from 'react';
import HeroImage from '../../assets/img/Hero.jpeg';
import { FaArrowDown } from "react-icons/fa6";
import { LuBed } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { MdInbox } from "react-icons/md";
import { DELUXE, PEARL, EXECUTIVE } from '../../Data/data.js';

const Gallery = () => {
  const [selectedRate, setSelectedRate] = useState(""); 

  const gallery = useRef(null);

  const scrollToGallery = () => {
    gallery.current.scrollIntoView({ behavior: "smooth" });
  };

  // Filter rooms based on selected rate
  const filterRoomsByRate = (rooms) => {
    if (!selectedRate) return rooms;
    const [min, max] = selectedRate.split("-").map(Number);
    return rooms.filter((room) => room.price >= min && room.price <= max);
  };

  // Apply filter to all categories
  const filteredDeluxe = filterRoomsByRate(DELUXE);
  const filteredPearl = filterRoomsByRate(PEARL);
  const filteredExecutive = filterRoomsByRate(EXECUTIVE);

  return (
    <div className=''>
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
            <p className="font-serif text-4xl sm:text-6xl">Find Your Peace 🕊</p>
            <h1 className="text-lg sm:text-2xl font-sans mt-4">
              The Place where you are looking for
            </h1>
            <button ref={gallery} className="mt-6 border py-2 px-10 sm:px-20 bg-white text-black transition-all hover:bg-slate-400 hover:text-white rounded-lg"
             onClick={scrollToGallery}>
             <FaArrowDown />
             </button>
          </div>
        </div>
      </div>
      <div   className='mt-10'>
        <div className="container mx-auto p-6 rounded-lg shadow-lg bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-serif text-slate-900 font-bold sm:text-[14px] md:text-4xl lg:text-4xl">Our Gallery</h1>
            <div className="flex items-center gap-3">
              <select
                name="rate"
                id="rate"
                className="border border-gray-300 rounded px-7 py-1 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                onChange={(e) => setSelectedRate(e.target.value)} // Update selected rate
              >
                <option value="">Find Rate</option>
                <option value="30-40">$30 - $40</option>
                <option value="40-50">$40 - $50</option>
                <option value="50-60">$50 - $60</option>
                <option value="60-70">$60 - $70</option>
              </select>
            </div>
          </div>

          {/* Deluxe Section */}
          <div className='mt-8'>
            <h1 className='text-3xl text-black/70 font-serif'>DELUXE :</h1>
            <div className="overflow-x-auto whitespace-nowrap mt-3 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex gap-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                {filteredDeluxe.map((room, index) => (
                  <div key={index} className="border rounded-xl shadow-lg mb-6 min-w-[300px]">
                    <img src={room.image} className="h-32 rounded-xl rounded-b-none w-full object-cover" alt={`${room.name}`} />
                    <div className="flex items-center p-3 justify-between">
                      <p className="flex items-center gap-2"><LuBed /> {room.bed}</p>
                      <p className="flex items-center gap-2"><MdInbox /> {room.size}</p>
                      <p className="flex items-center gap-2"><CiUser /> {room.people}</p>
                    </div>
                    <div className="p-3">
                      <h1 className="text-2xl font-bold">{room.name}</h1>
                    </div>
                    <div className="flex items-center p-3 justify-between">
                      <h1 className="text-xl font-semibold">$<span className="text-red-500">{room.price}</span></h1>
                      <button className="border py-1 px-7 rounded font-bold bg-slate-100 hover:bg-slate-300 transition">Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pearl Section */}
          <div className='mt-8'>
            <h1 className='text-3xl text-black/70 font-serif'>PEARL :</h1>
            <div className="overflow-x-auto whitespace-nowrap mt-3 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex gap-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                {filteredPearl.map((room, index) => (
                  <div key={index} className="border rounded-xl shadow-lg mb-6 min-w-[300px]">
                    <img src={room.image} className="h-32 rounded-xl rounded-b-none w-full object-cover" alt={`${room.name}`} />
                    <div className="flex items-center p-3 justify-between">
                      <p className="flex items-center gap-2"><LuBed /> {room.bed}</p>
                      <p className="flex items-center gap-2"><MdInbox /> {room.size}</p>
                      <p className="flex items-center gap-2"><CiUser /> {room.people}</p>
                    </div>
                    <div className="p-3">
                      <h1 className="text-2xl font-bold">{room.name}</h1>
                    </div>
                    <div className="flex items-center p-3 justify-between">
                      <h1 className="text-xl font-semibold">$<span className="text-red-500">{room.price}</span></h1>
                      <button className="border py-1 px-7 rounded font-bold bg-slate-100 hover:bg-slate-300 transition">Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Executive Section */}
          <div className='mt-8'>
            <h1 className='text-3xl text-black/70 font-serif'>EXECUTIVE :</h1>
            <div className="overflow-x-auto whitespace-nowrap mt-3 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex gap-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                {filteredExecutive.map((room, index) => (
                  <div key={index} className="border rounded-xl shadow-lg mb-6 min-w-[300px]">
                    <img src={room.image} className="h-32 rounded-xl rounded-b-none w-full object-cover" alt={`${room.name}`} />
                    <div className="flex items-center p-3 justify-between">
                      <p className="flex items-center gap-2"><LuBed /> {room.bed}</p>
                      <p className="flex items-center gap-2"><MdInbox /> {room.size}</p>
                      <p className="flex items-center gap-2"><CiUser /> {room.people}</p>
                    </div>
                    <div className="p-3">
                      <h1 className="text-2xl font-bold">{room.name}</h1>
                    </div>
                    <div className="flex items-center p-3 justify-between">
                      <h1 className="text-xl font-semibold">$<span className="text-red-500">{room.price}</span></h1>
                      <button className="border py-1 px-7 rounded font-bold bg-slate-100 hover:bg-slate-300 transition">Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Gallery;
