import React, { useState, useEffect, useRef, useContext } from "react";
import FetchCategoryWiseProduct from "../../pages/FetchCategoryWiseProduct";
import { formatPrice } from "../../helpers/displayCurrency";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../../helpers/addToCart";
import Context from "../../context";

const HorizontalCardComponent = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const { fetchAddToCartCount } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoryProduct = await FetchCategoryWiseProduct(category);
      setData(categoryProduct?.data || []);
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 my-4 relative">
      {/* Section Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#071952] py-2 sm:py-4">{heading}</h2>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-lg font-semibold text-[#071952] opacity-80">Loading...</p>
      ) : data.length > 0 ? (
        <div className="relative">
          {/* Scrollable Container (No Vertical Scrollbar) */}
          <div
            ref={scrollRef}
            className="w-full overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide no-scrollbar"
          >
            <div className="flex gap-4 sm:gap-6 md:gap-8">
              {data.map((product, index) => (
                <Link
                  to={"product/" + product?._id}
                  key={index}
                  className="w-64 h-full bg-white bg-opacity-90 border border-[#071952] border-opacity-20 rounded-xl shadow-lg p-4 flex-shrink-0 transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="h-40 sm:h-48 flex justify-center items-center bg-[#EBF4F6] rounded-lg shadow-md">
                    <img
                      src={product.productImage[0] || "https://via.placeholder.com/150"}
                      alt={product.productName}
                      className="h-28 w-auto object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="mt-2 sm:mt-3 text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#071952] truncate">{product.productName}</h3>
                    <p className="text-sm sm:text-md text-[#071952] opacity-80 font-medium">{product.category}</p>

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

                    {/* Add to Cart Button */}
                    <button
                      className="mt-2 sm:mt-3 px-4 sm:px-5 py-2 bg-[#1E88E5] text-[#EBF4F6] font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 focus:outline-none transition-all duration-300 w-full text-sm sm:text-md"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#071952] text-[#EBF4F6] p-3 sm:p-4 rounded-full shadow-xl hover:bg-[#1E88E5] hover:text-[#EBF4F6] transition-all duration-300 z-10"
          >
            <FaAngleRight size={24} sm={30} />
          </button>
        </div>
      ) : (
        <p className="text-center text-[#071952] text-lg font-semibold opacity-80">No products available</p>
      )}
    </div>
  );
};

export default HorizontalCardComponent;