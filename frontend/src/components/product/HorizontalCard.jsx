import React, { useState, useEffect, useRef, useContext } from "react";
import FetchCategoryWiseProduct from "../../pages/FetchCategoryWiseProduct";
import { formatPrice } from "../../helpers/displayCurrency";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../../helpers/addToCart";
import Context from "../../context";

const HorizontalCardVariant = ({ category, heading }) => {
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

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 my-4 relative">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#071952] py-2 sm:py-4">{heading}</h2>

      {loading ? (
        <p className="text-center text-lg font-semibold text-[#071952] opacity-80">Loading...</p>
      ) : data.length > 0 ? (
        <div className="relative">
          {/* Scroll Buttons (Hidden on Mobile) */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#071952] text-[#EBF4F6] p-3 sm:p-4 rounded-full shadow-xl hover:bg-[#1E88E5] hover:text-[#EBF4F6] transition-all duration-300 z-10"
          >
            <FaAngleLeft size={26} sm={30} />
          </button>

          {/* Responsive Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto overflow-y-hidden scrollbar-hide no-scrollbar"
          >
            {data.map((product, index) => (
              <div
                key={index}
                className="w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%] xl:w-[25%] bg-white bg-opacity-90 border border-[#071952] border-opacity-20 rounded-2xl shadow-lg p-4 flex-shrink-0 transform hover:scale-105 transition-all duration-300"
              >
                <Link to={"/product/" + product?._id}>
                  <div className="h-40 sm:h-48 flex justify-center items-center bg-[#EBF4F6] rounded-xl shadow-md">
                    <img
                      src={product.productImage[0] || "https://via.placeholder.com/200"}
                      alt={product.productName}
                      className="h-32 w-auto object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="mt-2 sm:mt-3 text-center">
                    <h3 className="text-md sm:text-lg font-semibold text-[#071952] truncate">{product.productName}</h3>
                    <p className="text-sm sm:text-md text-[#071952] opacity-80 font-medium">{product.category}</p>
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
                <button
                  className="mt-2 sm:mt-3 px-4 sm:px-5 py-2 bg-[#1E88E5] text-[#EBF4F6] font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 focus:outline-none transition-all duration-300 w-full text-sm sm:text-md"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Right Scroll Button (Hidden on Mobile) */}
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#071952] text-[#EBF4F6] p-3 sm:p-4 rounded-full shadow-xl hover:bg-[#1E88E5] hover:text-[#EBF4F6] transition-all duration-300 z-10"
          >
            <FaAngleRight size={26} sm={30} />
          </button>
        </div>
      ) : (
        <p className="text-center text-[#071952] text-lg font-semibold opacity-80">No products available</p>
      )}
    </div>
  );
};

export default HorizontalCardVariant;