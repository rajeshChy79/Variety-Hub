import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import DisplayImage from "./DisplayImage";

const AdminProductCard = ({ product, fetchAllProducts }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [openFullScreenImg, setOpenFullScreenImg] = useState(false);
  const [fullScreenImg, setFullScreenImg] = useState("");

  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle image click for full-screen display
  const handleImageClick = (imgUrl) => {
    setFullScreenImg(imgUrl);
    setOpenFullScreenImg(true);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-3 w-full max-w-[250px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] mx-auto border border-[#071952] border-opacity-20 mt-[20px]">
      {/* Product Image */}
      <div className="w-full h-32 overflow-hidden rounded-lg">
        {product?.productImage?.length > 0 ? (
          <img
            src={product.productImage[0]}
            alt={product.productName || "Product Image"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer hover:shadow-md"
            onClick={() => handleImageClick(product.productImage[0])}
          />
        ) : (
          <div className="w-full h-full bg-[#EBF4F6] flex items-center justify-center rounded-lg">
            <p className="text-[#071952] text-sm font-medium">No Image Available</p>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-2 text-center">
        <h1
          className="text-base sm:text-lg font-semibold text-[#071952] truncate w-full"
          title={product.productName}
        >
          {product.productName}
        </h1>
        <p className="text-xs sm:text-sm font-medium text-[#071952] opacity-80">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Edit Button */}
      <button
        className="w-fit mx-auto p-2 bg-[#1E88E5] rounded-full text-[#EBF4F6] shadow-md hover:scale-110 hover:bg-blue-700 transition-all duration-300"
        onClick={() => setEditProduct(true)}
        aria-label={`Edit ${product.productName}`}
      >
        <MdEdit size={20} />
      </button>

      {/* Edit Product Modal */}
      {editProduct && (
        <AdminEditProduct
          product={product}
          onClose={() => setEditProduct(false)}
          fetchAllProducts={fetchAllProducts}
        />
      )}

      {/* Full-Screen Image Display */}
      {openFullScreenImg && (
        <DisplayImage
          imgUrl={fullScreenImg}
          onClose={() => setOpenFullScreenImg(false)}
        />
      )}
    </div>
  );
};

export default AdminProductCard;