import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useFormik } from "formik"
import { RiMenu2Fill } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModelOpen, setIsLoginModelOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage ] = useState("");
  console.log(message);

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

  const openModal = () => {
    setIsModalOpen(true);
    setIsLoginModelOpen(false);
    setMenuOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModelOpen(true);
    setIsModalOpen(false);
    setMenuOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModelOpen(false);
  };

  const formik = useFormik({
    initialValues:{
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
       const registerRequest = await axios.post('http://localhost:8000/api/v1/guest/register', values);

       if (registerRequest.status <= 400) {
        setMessage("Registration Successful.")
       }

      } catch (error) {
        setMessage("Error: ", error)
      }
    }
  })

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className='flex items-center justify-between p-4 md:p-6 border-b border-gray-700 rounded-b-xl shadow-md'>
        <div className='text-white'>
          <Link to="/">
            <h1 className='text-2xl font-semibold'>LuxuryStay Hospitality</h1>
          </Link>
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
            <button onClick={openModal} className="hover: border px-5 py-1">
              Register
            </button>
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
      {/* Register Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <button onClick={closeModal} className="text-2xl">
              <IoCloseSharp />
            </button>
            <h1 className="text-center text-3xl font-semibold">Register Here!</h1>
            <form className="p-4" onSubmit={formik.handleSubmit}>
  <input
    type="text"
    name="firstName" // Specify the name
    value={formik.values.firstName} // Use formik.values
    onChange={formik.handleChange} // Properly handle changes
    placeholder="First Name"
    className="w-full px-3 py-2 border mt-4 rounded-md text-sm"
  />
  <input
    type="text"
    name="lastName" // Specify the name
    value={formik.values.lastName} // Use formik.values
    onChange={formik.handleChange}
    placeholder="Last Name"
    className="w-full px-3 py-2 border mt-4 rounded-md text-sm"
  />
  <input
    type="email"
    name="email" // Specify the name
    value={formik.values.email} // Use formik.values
    onChange={formik.handleChange}
    placeholder="Enter Email"
    className="w-full px-3 py-2 border mt-4 rounded-md text-sm"
  />
  <input
    type="password"
    name="password" // Specify the name
    value={formik.values.password} // Use formik.values
    onChange={formik.handleChange}
    placeholder="Enter Password"
    className="w-full px-3 py-2 border mt-4 rounded-md text-sm"
  />
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md hover:bg-blue-700 transition duration-300"
  >
    Register
  </button>
</form>

          </div>
        </div>
      )}
      {/* Login Modal */}
      {isLoginModelOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 md:w-1/2 lg:w-1/3">
            <button onClick={closeLoginModal} className="text-2xl">
              <IoCloseSharp />
            </button>
            <div className='flex justify-center h-24'>
              {/* <img src={Registerlogo} alt="Register Logo" className="w-20 h-20" /> */}
            </div>
            <h1 className='text-center text-3xl font-semibold '>Login </h1>
            <div className="flex items-center my-4 mt-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-3 text-xs text-gray-500">OR LOGIN WITH EMAIL</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div> 
            <form className="p-4">
              <input 
                type="email" 
                placeholder="Enter Email" 
                className="w-full px-3 py-2 border mt-4 rounded-md text-sm"
              />
              <input 
                type="password" 
                placeholder="Enter Password" 
                className="w-full px-3 py-2 border mt-4 rounded-md text-sm"
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md hover:bg-blue-700 transition duration-300">Login</button>
            </form>
            <div className='flex justify-center p-4 mt-1'>
              <p className='font-sans text-gray-500 text-xs'>Don't have an account yet? </p>
              <p className='font-sans text-blue-700 text-xs hover:underline cursor-pointer' onClick={openModal}>Sign up</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
