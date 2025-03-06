import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../../../common";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { formatPrice } from "../../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../../components/product/CategoryWiseProductDisplay";
import addToCart from "../../helpers/addToCart";
import { toast } from 'react-toastify'; // Ensure you import this for notifications
import Context from "../../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [showZoomImage, setShowZoomImage] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const params = useParams();
  const { fetchAddToCartCount } = useContext(Context);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const dataResponse = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: params?.id }),
      });
      if (!dataResponse.ok) throw new Error("Failed to fetch product details");
      const dataApi = await dataResponse.json();
      console.log("Product Details Response:", dataApi); // Debug response

      if (dataApi.success) {
        setData(dataApi?.data || {});
        setActiveImage(dataApi?.data?.productImage[0] || "https://via.placeholder.com/300");
      } else {
        toast.error(dataApi.message || "Failed to load product details");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("An error occurred while fetching product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnter = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  const handleZoomImage = (e) => {
    setShowZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  };

  const handleLeaveImage = () => {
    setShowZoomImage(false);
  };

  const handleAddToCart = async (e,id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
  };

  return (
    <div className="container mx-auto p-4 pt-[80px] bg-[#EBF4F6] min-h-screen">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Image Section */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          {/* Product Image */}
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-[#EBF4F6] relative shadow-md rounded-xl">
            <img
              src={activeImage || "https://via.placeholder.com/300"}
              className="h-full w-full object-scale-down mix-blend-multiply transition-transform duration-300 hover:scale-105"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImage}
            />

            {/* Product Zoom */}
            {showZoomImage && (
              <div className="hidden lg:block absolute min-h-[500px] overflow-hidden min-w-[500px] bg-[#f9fbfc] -right-[510px] top-0 shadow-xl rounded-xl">
                <div
                  className="w-full h-full min-h-[500px] min-w-[500px] mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage || "https://via.placeholder.com/300"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="h-full">
            {loading ? (
              <div className="flex gap-3 lg:flex-col overflow-scroll scrollbar-hide h-full">
                {productImageListLoading.map((_, index) => (
                  <div
                    className="h-20 w-20 bg-[#EBF4F6] rounded animate-pulse shadow-md"
                    key={index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-3 lg:flex-col overflow-scroll scrollbar-hide h-full no-scrollbar pl-10">
                {data?.productImage?.map((imgUrl, index) => (
                  <div
                    className="h-20 w-20 bg-white rounded p-1 border border-[#071952] border-opacity-20 shadow-md hover:shadow-lg transition-shadow duration-200"
                    key={index}
                  >
                    <img
                      src={imgUrl || "https://via.placeholder.com/200"}
                      alt=""
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer transition-transform duration-200 hover:scale-105"
                      onMouseEnter={() => handleMouseEnter(imgUrl)}
                      onClick={() => handleMouseEnter(imgUrl)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        {loading ? (
          <div className="grid flex-col gap-1 w-full">
            <p className="bg-[#EBF4F6] animate-pulse h-5 lg:h-8 w-full rounded-full inline-block shadow-md" />
            <h2 className="h-5 bg-[#EBF4F6] lg:h-8 animate-pulse w-full shadow-md" />
            <p className="bg-[#EBF4F6] h-6 min-w-[100px] lg:h-8 animate-pulse w-full shadow-md" />
          </div>
        ) : (
          <div className="flex flex-col gap-2 sm:gap-3">
            <p className="bg-[#EBF4F6] text-[#1E88E5] px-2 rounded-full inline-block w-fit shadow-md">
              {data?.brandName || "Unknown Brand"}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#071952]">
              {data?.productName || "Unnamed Product"}
            </h2>
            <p className="capitalize text-[#071952] opacity-80">
              {data?.category || "Unknown Category"}
            </p>

            <div className="flex items-center gap-1 text-[#1E88E5]">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl sm:text-3xl font-medium my-2 sm:my-3">
              <p className="text-[#1E88E5]">
                {formatPrice(data?.sellingPrice)}
              </p>
              {data?.price && data?.sellingPrice < data?.price && (
                <p className="text-[#071952] opacity-70 line-through text-sm sm:text-base">
                  {formatPrice(data?.price)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 my-2 sm:my-3">
              <button className="border-2 border-[#1E88E5] px-3 sm:px-4 py-1 sm:py-2 min-w-[120px] text-[#1E88E5] font-medium hover:bg-[#1E88E5] hover:text-[#EBF4F6] rounded-lg shadow-md transition-all duration-200">
                Buy
              </button>
              <button
                className="border-2 border-[#1E88E5] px-3 sm:px-4 py-1 sm:py-2 min-w-[120px] text-[#EBF4F6] font-medium bg-[#1E88E5] hover:bg-[#EBF4F6] hover:text-[#071952] rounded-lg shadow-md transition-all duration-200"
                onClick={()=>handleAddToCart(e,data?._id)}
              >
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-[#071952] font-medium my-1 sm:my-2">
                Description:
              </p>
              <p className="text-[#071952] opacity-80">
                {data?.description || "No description available"}
              </p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Products"}
        />
      )}
    </div>
  );
};

export default ProductDetails;