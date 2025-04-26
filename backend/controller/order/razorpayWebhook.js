const razorpayInstance = require("../../config/razorpay");
const Order = require("../../models/orderModel");

const razorpayWebhookController = async (req, res) => {
  try {
    console.log("Webhook Triggered:", req.body);

    const event = req.body.event;
    const payload = req.body.payload;

    if (event === "payment_link.paid") {
      const paymentId = payload.payment_link.entity.payment_id;
      const paymentLinkId = payload.payment_link.entity.id;
      console.log("Payment Successful! Payment ID:", paymentId);

      //  Fetch full payment link details from Razorpay
      const paymentDetails = await fetchRazorpayPaymentLink(paymentLinkId);
      if (!paymentDetails) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Payment Link" });
      }

      //  Extract Order ID from Notes
      const orderId = paymentDetails.notes?.orderId;
      if (!orderId) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Order ID not found in Payment Notes",
          });
      }

      //  Update MongoDB Order as Paid
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus: "Paid", razorpayPaymentId: paymentId },
        { new: true }
      );

      if (!updatedOrder) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found in DB" });
      }

      console.log(" Order Updated:", updatedOrder);
      return res
        .status(200)
        .json({
          success: true,
          message: "Payment verified & Order updated",
          order: updatedOrder,
        });
    }

    res.status(400).json({ success: false, message: "Unhandled event" });
  } catch (error) {
    console.error(" Webhook Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Webhook processing failed" });
  }
};

//  Fetch Payment Link Details from Razorpay
const fetchRazorpayPaymentLink = async (paymentLinkId) => {
  try {
    const paymentLink = await razorpayInstance.paymentLink.fetch(paymentLinkId);
    return paymentLink;
  } catch (error) {
    console.error(" Error Fetching Payment Link:", error);
    return null;
  }
};

module.exports = razorpayWebhookController;
