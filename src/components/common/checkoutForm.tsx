// components/CheckoutForm.tsx
"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updatePaidStatusThunk } from "@/redux/thunks/Order";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

interface CheckoutFormProps {
  orderId: string;
}

export default function CheckoutForm({ orderId }: CheckoutFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      console.error("Thanh toán thất bại:", error);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log("paymentIntentId gửi lên BE:", paymentIntent.id); // In ra để kiểm tra

      await dispatch(
        updatePaidStatusThunk({ orderId, paymentIntentId: paymentIntent.id })
      );

      console.log("Thanh toán thành công!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="flex flex-col items-end">
        <Button
          className="bg-white border-2 border-black text-black hover:border-b-4 hover:border-r-4 hover:bg-white mt-4 "
          type="submit"
          disabled={!stripe || loading}
        >
          {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
        </Button>
      </div>
    </form>
  );
}
