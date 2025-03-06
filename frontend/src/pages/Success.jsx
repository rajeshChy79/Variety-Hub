import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EBF4F6] px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-[#071952] border-opacity-20 text-center flex flex-col items-center justify-center">
          {/* Animated Tick Icon */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <FaCheckCircle className="text-5xl sm:text-6xl text-[#2E7D32] mb-2 sm:mb-3" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#071952] mb-2 sm:mb-3">
            Payment Successful!
          </h1>
          <p className="text-lg sm:text-xl text-[#071952] opacity-80 mb-4">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <Link to={"/order"} className="w-full max-w-xs mx-auto mt-4 sm:mt-6 bg-[#1E88E5] text-[#EBF4F6] py-2 sm:py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105">
            See Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;