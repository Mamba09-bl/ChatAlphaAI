"use client";
import { useSearchParams } from "next/navigation";


// its is what it is 
export default function PaymentSuccessClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const email = params.get("email");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0f15] px-4">
      <div className="bg-[#1a1c23] border border-gray-700 rounded-xl p-8 shadow-xl max-w-md w-full text-center">
        
        <h1 className="text-3xl font-bold text-white mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-300 mb-6">
          Thank you for upgrading to <span className="text-indigo-400">ALPHA PLUS</span>.
        </p>

        {sessionId && (
          <p className="text-gray-500 text-sm mb-6">
            Session ID: {sessionId}
          </p>
        )}

        <a
          href="/chat"
          className="inline-block w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
        >
          Continue to Chat
        </a>
      </div>
    </div>
  );
}
