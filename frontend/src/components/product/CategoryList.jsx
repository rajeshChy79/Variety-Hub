import React, { useState, useEffect } from 'react';
import SummaryApi from '../../../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const dataResponse = await fetch(SummaryApi.categoryProduct.url);
      if (!dataResponse.ok) throw new Error('Failed to fetch categories');
      const dataApi = await dataResponse.json();
      console.log("Category Fetch Response:", dataApi); // Debug response
      setCategoryProduct(dataApi?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="container mx-auto px-4 py-4 pt-[40px] bg-[#EBF4F6]">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-[#071952] text-center">Shop by Category</h2>

      {/* Loading Animation */}
      {loading ? (
        <div className="w-full flex justify-center py-4">
          <div className="w-10 h-10 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative">
          <div className="flex space-x-3 lg:space-x-4 overflow-x-auto no-scrollbar px-2 py-2 scroll-smooth gap-6 sm:gap-8 scrollbar-thin scrollbar-thumb-[#071952] scrollbar-track-[#EBF4F6]">
            {categoryProduct.map((product, index) => (
              <Link
                key={index}
                to={"/category-product?category=" + product?.category}
                className="flex flex-col items-center gap-1 sm:gap-2 flex-shrink-0 group transition-all duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full p-2 bg-white border border-[#071952] border-opacity-20 flex items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src={product?.productImage[0] || "https://via.placeholder.com/200"}
                    alt={product?.category}
                    className="w-full h-full object-scale-down mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-sm sm:text-base font-bold capitalize text-center text-[#071952] whitespace-nowrap hover:text-[#1E88E5] transition-colors duration-200">
                  {product?.category || "Unknown Category"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;