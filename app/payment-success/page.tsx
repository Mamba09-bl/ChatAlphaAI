import { Suspense } from "react";
import PaymentSuccessClient from "./client";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}
