"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { verifyEmailThunk } from "@/redux/thunks/Auth";
import { AppDispatch } from "@/redux/store";

const VerifyEmailClient = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    if (!token) return;

    setVerifying(true);
    const resultAction = await dispatch(verifyEmailThunk(token));
    setVerifying(false);

    if (verifyEmailThunk.fulfilled.match(resultAction)) {
      router.push("/");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Xác thực email</h1>
      <p>Nhấn nút bên dưới để xác thực email của bạn.</p>
      <button onClick={handleVerify} disabled={verifying}>
        {verifying ? "Đang xác thực..." : "Về trang chủ"}
      </button>
    </div>
  );
};

export default VerifyEmailClient;
