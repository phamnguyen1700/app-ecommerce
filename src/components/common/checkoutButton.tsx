// components/CheckoutButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { checkoutOrderThunk } from "@/redux/thunks/Order";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutButtonProps {
  isPaid: boolean;
  orderId: string;
  clientSecret: string | null;
  setClientSecret: (secret: string | null) => void;
}

export default function CheckoutButton({
  orderId,
  clientSecret,
  setClientSecret,
  isPaid,
}: CheckoutButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(checkoutOrderThunk(orderId)).unwrap();
      setClientSecret(res.clientSecret);
      console.log("Checkout success:", res);
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isPaid ? (
        // Nếu đã thanh toán, hiển thị nút "Đã thanh toán" và vô hiệu hóa
        <div className="flex justify-end">
          <Button
            disabled
            className="bg-gray-300 text-gray-700 border-2 border-gray-500 cursor-not-allowed"
          >
            Đã thanh toán
          </Button>
        </div>
      ) : !clientSecret ? (
        <div className="flex justify-end">
          <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className="bg-white text-black border-2 border-black hover:border-r-4 hover:border-b-4 hover:border-black hover:bg-white"
          >
            {isLoading ? "Đang xử lý..." : "Thanh toán"}
          </Button>
        </div>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      )}
    </div>
  );
}
