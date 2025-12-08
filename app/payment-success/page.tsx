import dynamic from "next/dynamic";

const PaymentSuccessClient = dynamic(() => import("./client"), { ssr: false });

export default function Page() {
  return <PaymentSuccessClient />;
}
