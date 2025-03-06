import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import image1 from "../../assest/banner/img1.webp";
import image2 from "../../assest/banner/img2.webp";
import image3 from "../../assest/banner/img3.jpg";
import image4 from "../../assest/banner/img4.jpg";
import image5 from "../../assest/banner/img5.webp";

import image1Mobile from "../../assest/banner/img1_mobile.jpg";
import image2Mobile from "../../assest/banner/img2_mobile.webp";
import image3Mobile from "../../assest/banner/img3_mobile.jpg";
import image4Mobile from "../../assest/banner/img4_mobile.jpg";
import image5Mobile from "../../assest/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

  const images = isMobile ? mobileImages : desktopImages;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 pt-[30px] bg-[#EBF4F6] py-4">
      <div className="relative w-full h-64 sm:h-80 md:h-96 bg-[#EBF4F6] rounded-xl overflow-hidden shadow-xl">
        {/* Image Slider */}
        <div
          className="flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((imageUrl, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img
                src={imageUrl}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            className="bg-[#071952] text-[#EBF4F6] p-2 sm:p-3 rounded-full shadow-md hover:bg-[#1E88E5] hover:text-[#EBF4F6] transition-all duration-300"
            onClick={prevImage}
          >
            <FaAngleLeft size={24} sm={28} />
          </button>
          <button
            className="bg-[#071952] text-[#EBF4F6] p-2 sm:p-3 rounded-full shadow-md hover:bg-[#1E88E5] hover:text-[#EBF4F6] transition-all duration-300"
            onClick={nextImage}
          >
            <FaAngleRight size={24} sm={28} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentImage ? "bg-[#1E88E5]" : "bg-[#071952] opacity-50"
              } transition-all duration-200`}
              onClick={() => setCurrentImage(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;