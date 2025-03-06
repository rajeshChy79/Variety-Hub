import { FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Cancel = () => {
  return (
    <div className="container mx-auto sm:px-6 lg:px-8 py-4 pt-[80px] min-h-screen bg-[#EBF4F6] flex justify-center items-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#071952] border-opacity-20 text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <FaTimesCircle className="text-5xl sm:text-6xl text-[#D32F2F] mb-3" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#071952] mb-2 sm:mb-3">
            Payment Cancelled!
          </h1>
          <p className="text-lg sm:text-xl text-[#071952] opacity-80 mb-4">
            Your payment has been cancelled. If this was a mistake, please try again.
          </p>
          <button
            className="w-full max-w-xs mx-auto mt-4 sm:mt-6 bg-[#D32F2F] text-[#EBF4F6] py-2 sm:py-3 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105"
            onClick={() => window.location.href = "/"}
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
