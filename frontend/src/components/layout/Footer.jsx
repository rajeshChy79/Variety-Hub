import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071952] text-[#EBF4F6] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center md:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#EBF4F6]">About Us</h2>
            <p className="text-[#EBF4F6] text-sm sm:text-base leading-relaxed opacity-80">
              We deliver top-quality products at affordable prices, prioritizing your satisfaction with every purchase.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#EBF4F6]">Quick Links</h2>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link to="/about" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">About</Link></li>
              <li><Link to="/shop" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">Shop</Link></li>
              <li><Link to="/contact" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">Contact</Link></li>
              <li><Link to="/faq" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">FAQ</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#EBF4F6]">Support</h2>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link to="/terms" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/shipping" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">Return Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#EBF4F6]">Follow Us</h2>
            <div className="flex justify-center md:justify-start gap-4 sm:gap-6">
              <a href="https://facebook.com" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">
                <FaFacebookF className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://twitter.com" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">
                <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://instagram.com" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">
                <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://linkedin.com" className="text-[#EBF4F6] hover:text-[#1E88E5] transition-colors duration-200">
                <FaLinkedinIn className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#EBF4F6] border-opacity-20 mt-8 pt-4 text-center">
          <p className="text-[#EBF4F6] text-xs sm:text-sm opacity-70">
            © {currentYear} YourBrand. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;