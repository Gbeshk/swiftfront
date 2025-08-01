import { SetPasswordForm } from "@/components/SetPasswordForm/SetPasswordForm";
import { Suspense } from "react";

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetPasswordForm />
    </Suspense>
  );
}