const razorpayInstance = require("../../config/razorpay");
const Order = require("../../models/orderModel");

const paymentController = async (req, res) => {
  try {
    const { cartItems, totalAmount, paymentMethod, userId, email } = req.body;
    const user = req.userId;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    if (!userId || !email || !paymentMethod) {
      return res.status(400).json({ success: false, message: "Missing required user details" });
    }

    const shippingAddress = {
      fullName: "John Doe",
      address: "123 Dummy Street",
      city: "Demo City",
      state: "Test State",
      postalCode: "123456",
      phoneNumber: "9876543210",
    };

    const newOrder = new Order({
      userId,
      email,
      products: cartItems.map((item) => ({
        name: item.productId.productName,
        image: item.productId.productImage[0],
        seller: item.productId.brandName,
        price: item.productId.sellingPrice,
        quantity: item.quantity,
      })),
      shippingAddress,
      totalAmount,
      paymentMethod,
      paymentStatus: "Pending",
    });

    const savedOrder = await newOrder.save();
    const orderId = newOrder._id;

    const paymentLinkRequest = {
      amount: totalAmount * 100,
      currency: "INR",
      customer: {
        name: user.name || "Unknown",
        email: user.email || email,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `http://localhost:5173/success?orderId=${savedOrder._id}`,
      callback_method: "get",
      notes: {
        orderId: orderId?.toString(),
        userId: user._id?.toString(),
      },
    };

    let paymentLink;
    try {
      paymentLink = await razorpayInstance.paymentLink.create(paymentLinkRequest);
    } catch (razorpayError) {
      throw new Error("Razorpay payment link creation failed");
    }

    if (!paymentLink || !paymentLink.short_url) {
      throw new Error("Invalid payment link response from Razorpay");
    }

    newOrder.razorpayOrderId = paymentLink.id;
    await newOrder.save();

    const response = {
      success: true,
      orderId: newOrder._id,
      paymentLink: paymentLink.short_url,
      amount: paymentLink.amount,
      currency: paymentLink.currency,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment initiation failed" });
  }
};

module.exports = paymentController;