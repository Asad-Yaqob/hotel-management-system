import React from "react";
import HeroImage from "../assets/img/parking.jpeg";
import Gym from "../assets/img/gym.jpeg";
import PlayGround from "../assets/img/pground.jpeg";

const Experience = () => {
  return (
    <div className="bg-gray-50 py-16">
  <div className="container mx-auto px-4 md:px-8">
    {/* Image Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[HeroImage, Gym, PlayGround].map((image, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg shadow-lg group"
        >
          <img
            src={image}
            alt={`Luxury Image ${index + 1}`}
            className="w-full h-80 object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <h3 className="text-white text-xl font-bold">Luxury Experience</h3>
          </div>
        </div>
      ))}
    </div>

    {/* Text Section */}
    <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white p-10 md:p-16 mt-[-50px] rounded-lg shadow-lg z-10">
      <div className="absolute inset-0 opacity-20 bg-[url('/path/to/your/texture-image.jpg')] bg-cover"></div>
      <div className="relative flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-serif tracking-wide mb-2">
            With Our Experience,
          </h2>
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide">
            We Will Serve You
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {[
            { number: "800+", label: "Cities" },
            { number: "3500+", label: "Exclusive Hotels" },
            { number: "2M", label: "Exclusive Rooms" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <h3 className="text-5xl font-bold">{item.number}</h3>
              <p className="text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Experience;
