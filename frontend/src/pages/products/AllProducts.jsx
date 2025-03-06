import React, { useEffect, useState } from 'react';
import UploadProduct from '../../components/admin/UploadProduct';
import SummaryApi from '../../../common';
import AdminProductCard from '../../components/admin/AdminProductCard';
import { toast } from 'react-toastify'; // Ensure you import this for notifications

const AllProducts = () => {
  const [openUploadProduct, setUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  const fetchAllProducts = async () => {
    setLoading(true); // Start loading
    try {
      console.log(SummaryApi.allProduct.url);
      const dataResponse = await fetch(SummaryApi.allProduct.url);
      if (!dataResponse.ok) throw new Error("Failed to fetch products");
      const dataApi = await dataResponse.json();
      setAllProducts(dataApi?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setAllProducts([]); // Fallback to empty array on error
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#EBF4F6] ">
      {/* Header */}
      <div className="bg-[#071952] px-4 py-4 flex justify-between items-center shadow-md">
        <h2 className="font-bold text-xl text-[#EBF4F6]">All Products</h2>
        <button
          className="bg-[#1E88E5] text-[#EBF4F6] py-2 px-6 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-md border border-[#1E88E5]"
          onClick={() => setUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* Product List */}
      <div className="container mx-auto p-6">
        {loading ? (
          <div className="text-center text-[#071952] text-lg">
            Loading products...
          </div>
        ) : allProducts.length === 0 ? (
          <div className="text-center text-[#071952] text-lg">
            No products available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allProducts.map((product) => (
              <AdminProductCard
                key={product._id || product.id || Math.random()} // Use product ID if available
                product={product}
                fetchAllProducts={fetchAllProducts}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setUploadProduct(false)}
          fetchAllProducts={fetchAllProducts}
        />
      )}
    </div>
  );
};

export default AllProducts;