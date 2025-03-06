const stripe = require("../../config/stripe");
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

const webhooks = async (request, response) => {
  console.log("⚡ Webhook triggered");
  console.log("📌 Headers received:", request.headers);

  // Ensure stripe-signature exists
  const sig = req.headers["stripe-signature"];
  console.log("sig",sig);
  if (!sig) {
    console.error("❌ No stripe-signature header received.");
    return res.status(400).send("Webhook Error: Missing stripe-signature header");
  }

  let event;
  try {
    // ✅ Verify webhook signature with Stripe
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("✅ Webhook verified successfully:", event.type);
  } catch (err) {
    console.error("❌ Webhook Signature Verification Failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle Different Stripe Events
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("🟢 Checkout Session Completed:", JSON.stringify(session, null, 2));

      try {
        // ✅ Retrieve line items
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        console.log("📦 Line Items:", JSON.stringify(lineItems.data, null, 2));

        // ✅ Process Payment (Save Order in DB if needed)
        console.log("✅ Order Processing Logic Here...");
      } catch (err) {
        console.error("❌ Error Retrieving Line Items:", err.message);
      }

      break;

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  response.status(200).send();
};

module.exports = webhooks;
