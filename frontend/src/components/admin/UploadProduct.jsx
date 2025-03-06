import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ProductCategory from "../../helpers/ProductCategory";
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from "../../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchAllProducts }) => {
  // State to store product details
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [], // Stores uploaded image URLs
    description: "",
    price: "",
    sellingPrice: "",
  });

  // State to handle full-screen image display
  const [openFullScreenImg, setOpenFullScreenImg] = useState(false);
  const [fullScreenImg, setFullScreenImg] = useState("");

  // Handle input field changes for product details
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload and store the uploaded image URL
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (!file) return; // If no file is selected, exit

    try {
      const uploadImageCloudinary = await uploadImage(file); // Upload image using helper function
      console.log("Uploaded Image:", uploadImageCloudinary);

      if (uploadImageCloudinary?.url) {
        // Add the uploaded image URL to the productImage array
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

  // Upload product section
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!dataResponse.ok) throw new Error("Failed to upload product");
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        onClose();
        fetchAllProducts();
      } else {
        toast.error(dataApi.message || "Failed to upload product");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("An error occurred while uploading the product");
    }
  };

  // Handle image deletion from the uploaded images list
  const handleDeleteProductImg = (index) => {
    const newProductImage = [...data.productImage]; // Copy existing images
    newProductImage.splice(index, 1); // Remove the selected image
    setData((prev) => ({ ...prev, productImage: newProductImage })); // Update state
  };

  return (
    <div className="fixed bg-[#071952] bg-opacity-50 w-full h-full top-0 left-0 flex justify-center items-center z-[60] mt-[80px]">
      <div className="bg-[#EBF4F6] p-4 sm:p-6 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-[#071952] border-opacity-20">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center pb-3 border-b border-[#071952] border-opacity-20">
          <h2 className="text-lg sm:text-xl font-bold text-[#071952]">
            Upload Product
          </h2>
          <button
            className="w-fit ml-auto text-2xl text-[#071952] hover:text-[#D32F2F] cursor-pointer transition-colors duration-200"
            onClick={onClose}
            aria-label="Close modal"
          >
            <IoClose />
          </button>
        </div>

        {/* Product Upload Form */}
        <form
          className="grid p-4 sm:p-5 gap-4 sm:gap-5 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-[#071952] scrollbar-track-[#EBF4F6]"
          onSubmit={handleSubmit}
        >
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="text-sm sm:text-base font-medium text-[#071952]"
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
              className="mt-1 w-full p-2 sm:p-3 bg-white border border-[#071952] rounded-md focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 text-gray-700"
              required
            />
          </div>

          {/* Brand Name */}
          <div>
            <label
              htmlFor="brandName"
              className="text-sm sm:text-base font-medium text-[#071952]"
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
              className="mt-1 w-full p-2 sm:p-3 bg-white border border-[#071952] rounded-md focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 text-gray-700"
              required
            />
          </div>

          {/* Product Category Selection */}
          <div>
            <label
              htmlFor="category"
              className="text-sm sm:text-base font-medium text-[#071952]"
            >
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="mt-1 w-full p-2 sm:p-3 bg-white border border-[#071952] rounded-md focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 text-[#071952] font-medium"
              required
            >
              <option value="">Select Category</option>
              {ProductCategory.map((ele, index) => (
                <option
                  value={ele.value}
                  key={index}
                  className="text-[#071952]"
                >
                  {ele.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Image Upload Section */}
          <div>
            <label
              htmlFor="productImage"
              className="text-sm sm:text-base font-medium text-[#071952] mt-2"
            >
              Product Image:
            </label>
            <div className="mt-1 bg-white p-4 w-full h-32 border border-dashed border-[#071952] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#EBF4F6] transition-colors duration-200">
              <label htmlFor="uploadImageInput" className="text-center">
                <div className="text-[#071952] flex flex-col justify-center items-center gap-2">
                  <span className="text-3xl sm:text-4xl">
                    <IoMdCloudUpload />
                  </span>
                  <p className="text-sm sm:text-base">Upload Product Image</p>
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
                    className="absolute top-1 right-1 text-[#D32F2F] bg-white p-1 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-700"
                    onClick={() => handleDeleteProductImg(index)}
                  >
                    <MdDelete size={18} sm={20} />
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
            <p className="text-[#D32F2F] text-xs sm:text-sm">
              *Please upload at least one product image
            </p>
          )}

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="text-sm sm:text-base font-medium text-[#071952]"
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
              className="mt-1 w-full p-2 sm:p-3 bg-white border border-[#071952] rounded-md focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 text-gray-700"
              required
            />
          </div>

          {/* Selling Price */}
          <div>
            <label
              htmlFor="sellingPrice"
              className="text-sm sm:text-base font-medium text-[#071952]"
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
              className="mt-1 w-full p-2 sm:p-3 bg-white border border-[#071952] rounded-md focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 text-gray-700"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="text-sm sm:text-base font-medium text-[#071952]"
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
              className="mt-1 w-full p-2 sm:p-3 bg-white border border-[#071952] rounded-md focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 resize-none h-28 text-gray-700"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 sm:px-5 py-2 sm:py-3 bg-[#1E88E5] text-[#EBF4F6] rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-md"
          >
            Upload Product
          </button>
        </form>
      </div>

      {/* Display Image in Full Screen */}
      {openFullScreenImg && (
        <DisplayImage
          onClose={() => setOpenFullScreenImg(false)}
          imgUrl={fullScreenImg}
        />
      )}
    </div>
  );
};

export default UploadProduct;
