// import Stripe from "stripe";
// import userModel from "@/modules/user";

// // NEW required exports:
// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";
// export const preferredRegion = "auto";
// export const bodyParser = false; // stripe needs raw body

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   const body = await req.text();
//   const signature = req.headers.get("stripe-signature");

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   if (event.type === "payment_intent.succeeded") {
//     const paymentIntent = event.data.object;

//     console.log("EVENT DATA:", paymentIntent);

//     const customerEmail = paymentIntent.metadata.email;

//     console.log("Email from metadata:", customerEmail);

//     if (!customerEmail) {
//       console.log("NO EMAIL FOUND! CANNOT UPDATE USER.");
//       return new Response(null, { status: 200 });
//     }

//     await userModel.findOneAndUpdate(
//       { email: customerEmail },
//       { hasPaid: true, freeMessagesUsed: 0 }
//     );

//     console.log("Payment Success → user upgraded:", customerEmail);
//   }

//   return new Response(null, { status: 200 });
// }

import Stripe from "stripe";
import { connectDB } from "@/lib/mongodb";
import userModel from "@/modules/user";

export const runtime = "nodejs";
export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response("Webhook signature verification failed", {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_email;
    if (email) {
      await userModel.findOneAndUpdate(
        { email },
        { $set: { hasPaid: true, freeMessagesUsed: 0 } }
      );
      console.log("Marked user paid:", email);
    } else {
      console.warn("No customer_email on session:", session.id);
    }
  }

  return new Response("ok", { status: 200 });
}
