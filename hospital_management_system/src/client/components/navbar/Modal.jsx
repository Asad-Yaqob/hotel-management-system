import React from 'react'
import { IoCloseSharp } from "react-icons/io5";

const Modal = ({ children, onClose }) => {
const handleClose = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
};

return (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    onClick={handleClose}
  >
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <IoCloseSharp />
      </button>
      {children}
    </div>
  </div>
);
};

export default Modal
