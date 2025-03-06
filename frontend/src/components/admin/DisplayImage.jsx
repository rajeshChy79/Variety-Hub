import React from 'react';
import { IoClose } from "react-icons/io5";

const DisplayImage = ({ onClose, imgUrl }) => {
  return (
    <div 
      className="fixed inset-0 bg-[#071952] bg-opacity-50 backdrop-blur-md flex justify-center items-center z-[60] transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // Close when clicking overlay
      }}
    >
      <div className="relative bg-[#EBF4F6] p-4 sm:p-6 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col items-center transform scale-95 animate-zoomIn">
        
        {/* Close Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent closing when clicking the button itself
            onClose();
          }} 
          className="absolute top-4 right-4 text-[#EBF4F6] bg-[#071952] p-2 sm:p-3 rounded-full hover:bg-[#1E88E5] hover:text-[#EBF4F6] transition-all duration-200 shadow-md hover:scale-110"
          aria-label="Close"
        >
          <IoClose size={28} />
        </button>

        {/* Image Container */}
        <div className="w-full max-h-[80vh] overflow-hidden rounded-xl shadow-inner">
          <img 
            src={imgUrl} 
            alt="Product Preview" 
            className="w-full max-h-[75vh] object-contain transition-transform duration-300 hover:scale-105"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;