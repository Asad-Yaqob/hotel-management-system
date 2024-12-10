import React, { useState, useEffect } from 'react';
import { RiMenu2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className='flex items-center justify-between p-4 md:p-6 border-b border-gray-700 rounded-b-xl shadow-md'>
        <div className='text-white'>
        <Link to="/"><h1 className='text-2xl font-semibold'>LuxuryStay Hospitality</h1></Link>
        </div>
        {/* Desktop Menu */}
        <div className='hidden md:flex'>
          <ul className='flex items-center gap-4 text-lg text-white'>
            
            <Link to="/">
            <li className='px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center'>
              Home <MdKeyboardArrowDown className='ml-2' />
            </li>
            </Link>
            
            <li className='px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300'>Amenities</li>
            <Link to="/Gallery">
            <li className='px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center'>
              Gallery <MdKeyboardArrowDown className='ml-2' />
            </li>
            </Link>
            <Link to="/CheckoutRoom">
            <li className='px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center'>
              Rooms <MdKeyboardArrowDown className='ml-2' />
            </li>
            </Link>
            <Link to="/About">
            <li className='px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center'>
              Blog <MdKeyboardArrowDown className='ml-2' />
            </li>
            </Link>
            
          </ul>
        </div>
        {/* Mobile Menu Toggle Button */}
        <div className='text-white md:hidden'>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <RiMenu2Fill size={25} />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
  <div className='md:hidden bg-black'>
    <ul className='flex flex-col items-center text-lg text-white'>
      <li className='w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center'>
        Home
      </li>
      <li className='w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center'>
        Pages
      </li>
      <li className='w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center'>
        Amenities
      </li>
      <li className='w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center'>
        Gallery
      </li>
      <li className='w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center'>
        Rooms
      </li>
      <li className='w-full px-6 py-4 border-b border-gray-700 hover:bg-gray-700 transition duration-300 text-center'>
        Blog
      </li>
      <li className='w-full px-6 py-4 hover:bg-gray-700 transition duration-300 text-center'>
        Contact
      </li>
    </ul>
  </div>
)}

    </div>
  );
};

export default Navbar;
