"use client";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const email = params.get("email");

  return (
    <div className="min-h-screen ...">
      <div className="...">
        <h1>Payment Successful!</h1>
        <p>Thank you for upgrading to ALPHA PLUS.</p>
        {sessionId && <p>Session ID: {sessionId}</p>}
        <a href="/chat" className="btn">Back to Chat</a>
      </div>
    </div>
  );
}
