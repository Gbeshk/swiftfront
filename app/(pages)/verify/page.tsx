import { VerifyForm } from "@/components/VerifyForm/VerifyForm";
import React, { Suspense } from "react";

function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyForm />
      </Suspense>
    </div>
  );
}

export default page;
