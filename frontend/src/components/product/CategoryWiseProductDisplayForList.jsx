import React, { useContext } from "react";
import { formatPrice } from "../../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../../helpers/addToCart";
import Context from "../../context";
import { toast } from "react-toastify"; // Ensure you import this for notifications

const CategoryWiseProductList = ({ data = [], loading, heading }) => {
  const { fetchAddToCartCount } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-[#071952] border-opacity-20">
      {/*  Display Heading Properly */}
      {heading && (
        <h2 className="text-2xl sm:text-3xl font-bold text-[#071952] mb-2 sm:mb-3 border-b border-[#071952] border-opacity-20 pb-2 sm:pb-3">
          {heading}
        </h2>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="w-10 h-10 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.map((product, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-90 border border-[#071952] border-opacity-20 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Product Image */}
                  <Link to={`/product/${product?._id}`}>
                    <div className="h-40 sm:h-48 flex justify-center items-center bg-[#EBF4F6] rounded-t-xl shadow-md">
                      <img
                        src={
                          product.productImage[0] ||
                          "https://via.placeholder.com/150"
                        }
                        alt={product.productName}
                        className="h-28 w-auto object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="p-3 sm:p-4 flex flex-col gap-1 sm:gap-2 text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#071952] truncate">
                      {product.productName || "Unnamed Product"}
                    </h3>
                    <p className="text-sm sm:text-md text-[#071952] opacity-80 font-medium">
                      {product.category || "Unknown Category"}
                    </p>

                    {/* Price Section */}
                    <div className="mt-1 sm:mt-2">
                      {product.sellingPrice &&
                      product.sellingPrice < product.price ? (
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

                    {/* Add to Cart Button */}
                    <button
                      className="mt-2 sm:mt-3 px-4 sm:px-5 py-2 bg-[#1E88E5] text-[#EBF4F6] font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 focus:outline-none transition-all duration-300 w-full text-sm sm:text-md"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#071952] text-lg sm:text-xl font-semibold opacity-80 py-4">
              No products available
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryWiseProductList;
