import Stripe from "stripe";
import { connectDB } from "@/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { email } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
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
    success_url: `${
      process.env.NEXTAUTH_URL
    }/payment-success?email=${encodeURIComponent(email)}&amount=49.99`,
    cancel_url: `${process.env.NEXTAUTH_URL}/plus`,
  });

  return new Response(JSON.stringify({ url: session.url }), { status: 200 });
}
