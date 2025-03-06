import React, { useContext, useEffect, useState } from "react";
import{loadStripe} from '@stripe/stripe-js'
import SummaryApi from "../../../common";
import Context from "../../context";
import { formatPrice } from "../../helpers/displayCurrency";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.countCartProduct).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const dataResponse = await fetch(SummaryApi.viewAddToCart.url, {
        method: SummaryApi.viewAddToCart.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!dataResponse.ok) throw new Error("Failed to fetch cart");
      const dataApi = await dataResponse.json();
      console.log("Cart Fetch Response:", dataApi); // Debug response

      if (dataApi.success) {
        setData(dataApi?.data || []);
        console.log("Fetch data updated");
      } else {
        toast.error(dataApi.message || "Failed to load cart");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("An error occurred while fetching the cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    context.fetchAddToCartCount();
  }, []);

  const increaseQty = async (id, quantity) => {
    try {
      const dataResponse = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, quantity: quantity + 1 }),
      });
      if (!dataResponse.ok) throw new Error("Failed to increase quantity");
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        fetchData();
        context.fetchAddToCartCount();
      } else {
        toast.error(dataApi.message || "Failed to update quantity");
      }
    } catch (err) {
      console.error("Increase Qty Error:", err);
      toast.error("An error occurred while increasing quantity");
    }
  };

  const decreaseQty = async (id, quantity) => {
    if (quantity >= 2) {
      try {
        const dataResponse = await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: id, quantity: quantity - 1 }),
        });
        if (!dataResponse.ok) throw new Error("Failed to decrease quantity");
        const dataApi = await dataResponse.json();
        if (dataApi.success) {
          fetchData();
          context.fetchAddToCartCount();
        } else {
          toast.error(dataApi.message || "Failed to update quantity");
        }
      } catch (err) {
        console.error("Decrease Qty Error:", err);
        toast.error("An error occurred while decreasing quantity");
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      const dataResponse = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      if (!dataResponse.ok) throw new Error("Failed to delete product");
      const dataApi = await dataResponse.json();
      console.log("Delete Response:", dataApi);
      if (dataApi.success) {
        fetchData();
        context.fetchAddToCartCount();
      } else {
        toast.error(dataApi.message || "Failed to delete product");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("An error occurred while deleting the product");
    }
  };

const handlePayment = async () => {
  console.log("key",import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  console.log(stripePromise)
  if (!stripePromise) {
    console.error("Stripe failed to load.");
    return;
  }

  console.log("Stripe initialized:", stripePromise);

  let response = await fetch(SummaryApi.payment.url, {
    method: SummaryApi.payment.method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cartItems: data,
    }),
  });

  console.log("response",response);

  const responseData = await response.json();
  console.log("Payment API Response:", responseData);

  if (responseData?.id) {
    console.log("Redirecting to Stripe Checkout...");
    const { error } = await stripePromise.redirectToCheckout({
      sessionId: responseData.id,
    });

    if (error) {
      console.error("Stripe Checkout Error:", error);
    }
  } else {
    console.error("Payment session ID not received:", responseData);
  }
};


  const calculateTotal = () => {
    return data.reduce((total, product) => {
      const price = parseFloat(
        product?.productId?.sellingPrice || product?.productId?.price || 0
      );
      const qty = product?.quantity || 1;
      return total + price * qty;
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-[80px] min-h-screen bg-[#EBF4F6]">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#071952] mb-2 sm:mb-4 text-center">
        Your Cart
      </h1>

      {/* Empty Cart Message */}
      <div className="text-center my-4">
        {data.length === 0 && !loading && (
          <p className="bg-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md text-[#071952] text-base sm:text-lg inline-block opacity-80">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Cart Items Loading */}
            <div className="w-full lg:w-2/3">
              {loadingCart.map((_, index) => (
                <div
                  key={index}
                  className="w-full bg-gray-100 h-24 sm:h-28 md:h-36 my-2 sm:my-3 rounded-lg shadow-md animate-pulse"
                />
              ))}
            </div>
            {/* Summary Loading */}
            <div className="w-full lg:w-1/3 max-w-md mx-auto lg:mx-0">
              <div className="h-48 sm:h-56 bg-gray-100 rounded-lg shadow-md animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3">
              {data.map((product, index) => (
                <div
                  key={product?._id + index}
                  className="w-full bg-white my-2 sm:my-3 rounded-lg shadow-md border border-[#071952] border-opacity-20 grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] md:grid-cols-[150px_1fr_auto] lg:grid-cols-[200px_1fr_auto] gap-2 sm:gap-3 p-3 sm:p-4 hover:shadow-xl transition-shadow duration-200"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-28 md:w-36 lg:w-48 h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-center bg-[#EBF4F6] rounded-lg overflow-hidden mx-auto sm:mx-0">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col gap-1 sm:gap-2 justify-center">
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#071952] truncate">
                      {product?.productId?.productName}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#071952] opacity-80 capitalize">
                      {product?.productId?.category}
                    </p>
                    <p className="text-sm sm:text-md font-medium text-[#1E88E5]">
                      {formatPrice(
                        product?.productId?.sellingPrice ||
                          product?.productId?.price
                      )}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                        className="p-1 bg-[#EBF4F6] rounded-full hover:bg-[#1E88E5] hover:text-[#EBF4F6] transition-colors duration-200"
                      >
                        <FaMinus className="text-xs text-[#071952]" />
                      </button>
                      <span className="text-sm font-medium text-[#071952]">
                        {product?.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                        className="p-1 bg-[#EBF4F6] rounded-full hover:bg-[#1E88E5] hover:text-[#EBF4F6] transition-colors duration-200"
                      >
                        <FaPlus className="text-xs text-[#071952]" />
                      </button>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="flex items-center justify-center sm:justify-end">
                    <button
                      onClick={() => deleteProduct(product?._id)}
                      className="p-2 text-[#D32F2F] hover:text-red-700 transition-colors duration-200"
                    >
                      <FaTrash className="text-base sm:text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section (Right Side on lg) */}
            {data.length > 0 && (
              <div className="w-full lg:w-1/3 max-w-md mx-auto lg:mx-0">
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-[#071952] border-opacity-20">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#071952] mb-2 sm:mb-3">
                    Order Summary
                  </h2>
                  <div className="flex justify-between text-xs sm:text-sm text-[#071952] opacity-80 mb-1 sm:mb-2">
                    <span>Subtotal ({data.length} items)</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-[#071952] opacity-80 mb-1 sm:mb-2">
                    <span>Shipping</span>
                    <span className="text-[#1E88E5]">Free</span>
                  </div>
                  <div className="border-t border-[#071952] border-opacity-20 my-1 sm:my-2"></div>
                  <div className="flex justify-between text-base sm:text-lg font-semibold text-[#071952]">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                  <button className="w-full mt-2 sm:mt-4 bg-[#1E88E5] text-[#EBF4F6] py-2 sm:py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105" onClick={handlePayment}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
