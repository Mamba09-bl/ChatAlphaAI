// app/api/checkout-session/route.js
import Stripe from "stripe";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const SECRET = "MY_SUPER_SECRET_123";

export async function POST(req) {
  // Get the JWT token from cookieszzzzz
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Decode user info
  let decoded;
  try {
    decoded = jwt.verify(token, SECRET);
  } catch (err) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  const email = decoded.email;
  console.log("Creating Stripe session for:", email);

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email, // REQUIRED for webhook
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "AlphaPlus Subscription" },
          unit_amount: 4999,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/payment-success?email=${email}&amount=49.99`,
    cancel_url: `${process.env.NEXTAUTH_URL}/plus`,
  });

  return Response.json({ url: session.url });
}
