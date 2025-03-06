const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  payment: {
    id: { type: String, required: true },
    method: { type: String, required: true },
    status: { type: String, required: true, enum: ["pending", "completed", "failed"], default: "pending" },
  },
  shipping: {
    cost: { type: Number, default: 50 }, // Fixed shipping charge
  },
  totalAmount: { type: Number, required: true }, // Includes products + shipping
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});
 
const orderModel= mongoose.model("Order", orderSchema);
module.exports=orderModel
