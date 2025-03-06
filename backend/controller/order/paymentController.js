const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const user = await userModel.findById(req.userId);

    // ✅ Validate user exists
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // ✅ Validate cart items
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty or invalid" });
    }

   // console.log("cart items:",cartItems)

    // ✅ Define shipping charge (fixed at 50 INR)
    const shippingCharge = 50; // 50 INR (5000 paisa)

    // ✅ Prepare line items for Stripe
    const lineItems = cartItems.map(item => {
      if (!item.productId || !item.quantity || (!item.productId.sellingPrice && !item.productId.price)) {
        throw new Error(`Invalid cart item: ${JSON.stringify(item)}`);
      }

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productId.productName || "Unnamed Product",
            images: (item.productId.productImage?.filter(img => img && typeof img === "string") || []).slice(0, 5),
            metadata: {
              productId: item.productId._id,
            },
          },
          unit_amount: Math.round((item.productId.sellingPrice || item.productId.price) * 100), // Convert to paisa
        },
        quantity: item.quantity,
      };
    });

    // ✅ Calculate total amount (including shipping)
    const totalAmount = lineItems.reduce((sum, item) => sum + (item.price_data.unit_amount * item.quantity), 0) + (shippingCharge * 100);

    // ✅ Debugging Log: Check data before sending to Stripe
    /* console.log("🛒 Line Items Sent to Stripe:", JSON.stringify(lineItems, null, 2));
    console.log("📝 Metadata Sent:", {
      userId: req.userId,
      totalAmount,
      shippingCost: shippingCharge,
    }); */

    // ✅ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingCharge * 100, currency: "inr" },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      customer_email: user.email,
      metadata: {
        userId: req.userId,
        totalAmount,
        shippingCost: shippingCharge,
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`, // ✅ FIXED
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    // ✅ Debugging Log: Check session response
    console.log("✅ Stripe Checkout Session Created:", session);

    // ✅ Return session ID to frontend
    res.json({
      success: true,
      id: session.id,
      paymentDetails: {
        payment_method: "card",
        payment_id: session.id,
        payment_status: "pending",
      },
    });
  } catch (error) {
    // ✅ Improved error logging
    console.error("❌ Stripe Payment Error:", {
      message: error.message,
      stack: error.stack,
      raw: error.raw || {},
      httpStatus: error.statusCode || 500,
    });

    let message = "Payment processing failed";
    if (error.type === "StripeError") {
      message = `Stripe Error: ${error.message || "Invalid request"}`;
      if (error.code) message += ` (Code: ${error.code})`;
      if (error.param) message += ` (Param: ${error.param})`;
    }

    res.status(error.statusCode || 500).json({ success: false, message });
  }
};

module.exports = paymentController;
