import React from "react";
import heroImage from "../../../assets/img/Hero.jpeg";
import { Link } from "react-router-dom";

export function HeroImage() {
  return (
    <div
      name="home"
      className="w-full bg-zinc-200 pt-[80px] overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mt-24 sm:mt-36 h-full">
        <div className="bg-black/40 text-white text-center p-6 sm:p-8 rounded-lg mx-4 sm:mx-auto">
          <p className="font-serif text-4xl sm:text-6xl">Welcome to Hotel</p>
          <h1 className="text-lg sm:text-2xl font-sans mt-4">
            The Place where you are looking for
          </h1>
          <Link to="/Gallery">
            <button className="mt-6 border py-2 px-10 sm:px-20 bg-white text-black transition-all hover:bg-slate-400 hover:text-white rounded-lg">
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
