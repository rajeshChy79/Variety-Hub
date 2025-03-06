import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ProductCategory from "../../helpers/ProductCategory";
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from "../../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ product, onClose, fetchAllProducts }) => {
  const [data, setData] = useState({
    ...product,
    productName: product.productName || "",
    brandName: product.brandName || "",
    category: product.category || "",
    productImage: product.productImage || [],
    description: product.description || "",
    price: product.price || "",
    sellingPrice: product.sellingPrice || "",
  });

  const [openFullScreenImg, setOpenFullScreenImg] = useState(false);
  const [fullScreenImg, setFullScreenImg] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadImageCloudinary = await uploadImage(file);
      console.log("Uploaded Image:", uploadImageCloudinary);

      if (uploadImageCloudinary?.url) {
        setData((prev) => ({
          ...prev,
          productImage: [...prev.productImage, uploadImageCloudinary.url],
        }));
      }
    } catch (error) {
      console.error("Image Upload Error:", error);
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        onClose();
        fetchAllProducts();
      } else {
        toast.error(dataApi.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("An error occurred while updating the product");
    }
  };

  const handleDeleteProductImg = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: newProductImage }));
  };

  return (
    <div className="fixed inset-0 bg-[#071952] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#EBF4F6] p-4 sm:p-6 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-[#071952]">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center pb-3 border-b border-[#071952] border-opacity-20">
          <h2 className="text-lg sm:text-xl font-bold text-[#071952]">
            Edit Product
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-[#071952] hover:text-[#D32F2F] transition-colors duration-200"
          >
            <IoClose />
          </button>
        </div>

        {/* Product Upload Form */}
        <form
          className="grid gap-4 sm:gap-5 p-4 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-[#071952] scrollbar-track-[#EBF4F6]"
          onSubmit={handleSubmit}
        >
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="text-sm font-medium text-[#071952]"
            >
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter Product Name"
              value={data.productName}
              onChange={handleOnChange}
              className="mt-1 w-full p-2 bg-white border border-[#071952] rounded-md text-gray-700 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Brand Name */}
          <div>
            <label
              htmlFor="brandName"
              className="text-sm font-medium text-[#071952]"
            >
              Brand Name:
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="Enter Brand Name"
              value={data.brandName}
              onChange={handleOnChange}
              className="mt-1 w-full p-2 bg-white border border-[#071952] rounded-md text-gray-700 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Product Category Selection */}
          <div>
            <label
              htmlFor="category"
              className="text-sm font-medium text-[#071952]"
            >
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="mt-1 w-full p-2 bg-white border border-[#071952] rounded-md text-gray-700 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
              required
            >
              <option value="">Select Category</option>
              {ProductCategory.map((ele, index) => (
                <option value={ele.value} key={index}>
                  {ele.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Image Upload Section */}
          <div>
            <label
              htmlFor="productImage"
              className="text-sm font-medium text-[#071952]"
            >
              Product Image:
            </label>
            <div className="mt-1 bg-white p-4 w-full h-32 border border-dashed border-[#071952] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#EBF4F6] transition-colors duration-200">
              <label htmlFor="uploadImageInput" className="text-center">
                <div className="text-[#071952] flex flex-col justify-center items-center gap-2">
                  <span className="text-3xl">
                    <IoMdCloudUpload />
                  </span>
                  <p className="text-sm">Upload Product Image</p>
                  <input
                    type="file"
                    id="uploadImageInput"
                    className="hidden"
                    onChange={handleUploadProduct}
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Display Uploaded Images */}
          {data.productImage.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {data.productImage.map((ele, index) => (
                <div className="relative group" key={index}>
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-[#D32F2F] bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-700"
                    onClick={() => handleDeleteProductImg(index)}
                  >
                    <MdDelete size={18} />
                  </button>
                  <img
                    src={ele}
                    alt={`product-${index}`}
                    width={80}
                    height={80}
                    className="bg-white border border-[#071952] rounded-md cursor-pointer hover:shadow-md transition-shadow duration-200"
                    onClick={() => {
                      setOpenFullScreenImg(true);
                      setFullScreenImg(ele);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#D32F2F] text-xs">
              *Please upload at least one product image
            </p>
          )}

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="text-sm font-medium text-[#071952]"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              value={data.price}
              onChange={handleOnChange}
              className="mt-1 w-full p-2 bg-white border border-[#071952] rounded-md text-gray-700 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Selling Price */}
          <div>
            <label
              htmlFor="sellingPrice"
              className="text-sm font-medium text-[#071952]"
            >
              Selling Price:
            </label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              placeholder="Enter selling price"
              value={data.sellingPrice}
              onChange={handleOnChange}
              className="mt-1 w-full p-2 bg-white border border-[#071952] rounded-md text-gray-700 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-[#071952]"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={data.description}
              placeholder="Enter description"
              rows={3}
              onChange={handleOnChange}
              className="mt-1 w-full p-2 bg-white border border-[#071952] rounded-md text-gray-700 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 resize-none h-28"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-[#1E88E5] text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            Update Product
          </button>
        </form>
      </div>

      {/* Full-Screen Image Display */}
      {openFullScreenImg && (
        <DisplayImage
          onClose={() => setOpenFullScreenImg(false)}
          imgUrl={fullScreenImg}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
