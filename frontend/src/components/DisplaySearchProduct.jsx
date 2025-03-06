import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../helpers/displayCurrency";

const DisplaySearchProduct = ({ data, loading }) => {
  return (
    <div className="container mx-auto p-4 pt-[80px] bg-[#EBF4F6] min-h-screen">
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="w-10 h-10 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.map((product, index) => (
            <Link
              to={`/product/${product?._id}`}
              key={index}
              className="bg-white bg-opacity-90 border border-[#071952] border-opacity-20 rounded-xl shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="h-40 sm:h-48 flex justify-center items-center bg-[#EBF4F6] rounded-lg shadow-md">
                <img
                  src={product.productImage[0] || "https://via.placeholder.com/150"}
                  alt={product.productName}
                  className="h-28 w-auto object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Details */}
              <div className="mt-2 sm:mt-3 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-[#071952] truncate">
                  {product.productName || "Unnamed Product"}
                </h3>
                <p className="text-sm sm:text-md text-[#071952] opacity-80 font-medium">
                  {product.category || "Unknown Category"}
                </p>

                {/* Price Section */}
                <div className="mt-1 sm:mt-2">
                  {product.sellingPrice && product.sellingPrice < product.price ? (
                    <>
                      <span className="text-lg font-bold text-[#1E88E5]">
                        {formatPrice(product.sellingPrice)}
                      </span>
                      <span className="text-sm text-[#071952] opacity-70 line-through ml-2">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-[#1E88E5]">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
          {data.length === 0 && (
            <p className="text-center text-[#071952] text-lg sm:text-xl font-semibold opacity-80 py-4">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplaySearchProduct;