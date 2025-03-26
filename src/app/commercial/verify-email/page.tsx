import React, { Suspense } from "react";
import VerifyEmailClient from "@/components/common/verifyEmail";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailClient />
    </Suspense>
  );
};

export default Page;
