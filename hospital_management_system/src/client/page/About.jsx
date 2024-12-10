import React, { useRef } from 'react'
import HeroImage from '../../assets/img/Hero.jpeg';
import { FaArrowRight } from "react-icons/fa6";
import { FaWhatsapp  , FaFacebook , FaTwitter , FaInstagram} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const About = () => {

  const ContactUs = useRef(null);

  const scrollToContactUs = () => {
    ContactUs.current.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div>
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
          <div className="bg-black/40 text-white text-start p-6 sm:p-8 rounded-lg mx-4 sm:mx-auto">
            <p className="font-bold text-4xl sm:text-4xl">Own Your Luxury Dream Estate 🕊</p>
            <h1 className="text-lg sm:text-2xl md:text-2xl  lg:text-xl font-sans mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ipsam magni dolorum, <br /> nulla dolore dignissimos explicabo quibusdam sed tenetur alias.
            </h1>
            <div className='flex items-center gap-4 mt-6 text-lg' >
              <p><FaWhatsapp /></p>
              <p><FaFacebook /></p>
              <p><FaTwitter /></p>
              <p><FaInstagram /></p>
            </div>
            <button onClick={scrollToContactUs} className="flex items-center  gap-4 mt-12 border py-2 px-10 sm:px-20 bg-white text-black transition-all hover:bg-slate-400 hover:text-white rounded-lg"
             >Click Here For Contact Us
             <FaArrowRight />
             </button>
          </div>
        </div>
      </div>
      <section className="px-4 py-8">
  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      className="relative w-full h-52 rounded-lg overflow-hidden shadow-lg"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold">1200 +</h1>
        <p className="text-sm mt-2 font-medium">Companies affiliated with us</p>
      </div>
    </div>
    <div
      className="relative w-full h-52 rounded-lg overflow-hidden shadow-lg"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold">8M +</h1>
        <p className="text-sm mt-2 font-medium">Happy Customers</p>
      </div>
    </div>
    <div
      className="relative w-full h-52 rounded-lg overflow-hidden shadow-lg"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold">10 +</h1>
        <p className="text-sm mt-2 font-medium">Days of Service</p>
      </div>
    </div>
  </div>
</section>

      <section className='bg-slate-100 '>
      <div className="container mx-auto p-6 mt-28 mb-28 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
  <div className="flex items-center h-40">
    <div>
      <h1 className="font-semibold text-xl">Our Partnerships</h1>
      <p className="mt-1 text-slate-500 text-sm leading-relaxed">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora, neque?
      </p>
    </div>
  </div>

  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="border flex items-center justify-center bg-white rounded-xl shadow-md">
      <img src={HeroImage} className="w-24" alt="" />
    </div>
    <div className="border flex items-center justify-center bg-white rounded-xl shadow-md">
      <img src={HeroImage} className="w-24" alt="" />
    </div>
    <div className="border flex items-center justify-center bg-white rounded-xl shadow-md">
      <img src={HeroImage} className="w-24" alt="" />
    </div>
    <div className="border flex items-center justify-center bg-white rounded-xl shadow-md">
      <img src={HeroImage} className="w-24" alt="" />
    </div>
    <div className="border flex items-center justify-center bg-white rounded-xl shadow-md">
      <img src={HeroImage} className="w-24" alt="" />
    </div>
    <div className="border flex items-center justify-center bg-white rounded-xl shadow-md">
      <img src={HeroImage} className="w-24" alt="" />
    </div>
  </div>
</div>

      </section>
      <section>
      <div className="container mx-auto px-6 py-12">
  <div className="text-center mb-8">
    <h1 className="font-bold text-3xl text-gray-800">Feature Properties</h1>
    <p className="text-slate-500 mt-3 text-base leading-relaxed">
      Explore our collection of luxurious and affordable properties tailored to your needs.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div
      className="relative h-80 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 text-white">
        <h1 className="font-semibold text-lg">Luxury Villa Retreat</h1>
        <p className="text-sm mt-1">A perfect getaway for families and friends.</p>
        <p className="font-bold text-lg mt-2">$ 1400.00</p>
      </div>
    </div>
    <div
      className="relative h-80 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 text-white">
        <h1 className="font-semibold text-lg">CityScope</h1>
        <p className="text-sm mt-1">A perfect getaway for families and friends.</p>
        <p className="font-bold text-lg mt-2">$ 1400.00</p>
      </div>
    </div>
    <div
      className="relative h-80 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 text-white">
        <h1 className="font-semibold text-lg">Sea Side</h1>
        <p className="text-sm mt-1">A perfect getaway for families and friends.</p>
        <p className="font-bold text-lg mt-2">$ 1600.00</p>
      </div>
    </div>
    <div
      className="relative h-80 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"

    >
      <div className="absolute inset-0  flex flex-col justify-center p-4 text-black">
        <h1 className="font-bold text-2xl">Find Best Room for Your Family</h1>
        <p className="text-sm mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum ea eveniet possimus porro nobis. Veniam.</p>
          <button className='bg-black text-white px-7 py-2 rounded mt-5 flex justify-center items-center gap-3 hover:bg-slate-400 hover:text-black'>Explore More <FaArrowRightLong /></button>
      </div>
    </div>

  </div>
</div>

      </section>
      <section className="bg-gradient-to-b from-gray-100 to-gray-200 py-12">
  <div className="container mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
    <div className="relative h-80 md:h-full flex justify-center">
      <img
        src={HeroImage}
        alt="Hero"
        className="h-full w-full object-cover rounded-lg shadow-md"
      />
    </div>

    <div className="text-center md:text-left">
      <h2 className="text-lg font-semibold text-gray-700">About Us :</h2>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 leading-snug">
        Who We Are and What You Get From Our Spaces
      </h1>
      <p className="text-gray-600 mt-6 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
        laudantium nobis pariatur maiores eum nam officiis accusamus incidunt
        impedit placeat ab, quibusdam unde reprehenderit obcaecati ex veniam
        vel. Sapiente, blanditiis.
      </p>
      <button className="bg-black text-white px-6 py-3 rounded-md mt-6 transition-transform transform hover:bg-slate-400 hover:text-black hover:scale-105">
        Read More
      </button>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-10 gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">1k+</h1>
          <p className="text-gray-600">Rooms</p>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">9.5/10</h1>
          <p className="text-gray-600">User Satisfaction</p>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">1 Year+</h1>
          <p className="text-gray-600">Experience</p>
        </div>
      </div>
    </div>
  </div>
</section>

      <section >
      <div className="container mx-auto px-6 py-12">
  <div className="text-center mb-8">
    <h1 className="font-bold text-3xl text-gray-800">Feature Properties</h1>
    <p className="text-slate-500 mt-3 text-base leading-relaxed">
      Explore our collection of luxurious and affordable properties tailored to your needs.
    </p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border p-6 bg-gray-50 rounded-lg">
  <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="bg-blue-500 text-white rounded-full p-4 mb-4">
      <IoMdMail size={40} />
    </div>
    <h1 className="font-bold text-lg text-gray-800">Email Address</h1>
    <p className="text-slate-500 mt-2">faysal@gmail.com</p>
  </div>

  <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="bg-green-500 text-white rounded-full p-4 mb-4">
      <IoMdMail size={40} />
    </div>
    <h1 className="font-bold text-lg text-gray-800">Phone Number</h1>
    <p className="text-slate-500 mt-2">03227075828</p>
  </div>

  <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="bg-purple-500 text-white rounded-full p-4 mb-4">
      <IoMdMail size={40} />
    </div>
    <h1  className="font-bold text-lg text-gray-800">Address</h1>
    <p ref={ContactUs} className="text-slate-500 mt-2">Lyari - Karachi - Pakistan</p>
  </div>
</div>

  </div >
      </section>
      <section  className="bg-gradient-to-b from-gray-100 to-gray-300 py-10">
  <div className="max-w-screen-lg mx-auto px-4">
    <div className="text-center mb-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
        Get In Touch With Us
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mt-4">
        We are here to assist you with your queries and services.
      </p>
    </div>

    <div className="bg-white shadow-2xl rounded-lg p-6 sm:p-10 mx-4">
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Message
          </label>
          <textarea
            rows="4"
            placeholder="Write your message here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-black hover:bg-slate-300 hover:text-black text-white px-10 py-3 rounded-lg text-lg font-semibold shadow-md transition-transform transform hover:scale-105"
          >
            Submit Now
          </button>
        </div>
      </form>
    </div>
  </div>
</section>

    </div>
  )
}

export default About
 