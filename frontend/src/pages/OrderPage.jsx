import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/orderSlice"; // Import fetchOrders

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders()); //Fetch orders when component loads
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#071952] mb-8 text-center">
        Your Orders
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading orders...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No orders found.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) =>
            order.products.map((product, idx) => (
              <div key={`${index}-${idx}`} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">Seller: {product.seller}</p>
                  <p className="text-gray-700 font-semibold">₹{product.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
