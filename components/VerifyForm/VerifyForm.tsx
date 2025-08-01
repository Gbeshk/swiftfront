"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, AlertCircle } from "lucide-react";

export function VerifyForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Account successfully activated!");
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
      setMessage("Token is missing.");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full text-center bg-white shadow-md rounded-lg p-6">
        {status === "loading" && <p className="text-gray-600">Verifying...</p>}

        {status === "success" && (
          <>
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-green-700 mb-2">Success</h2>
            <p className="text-gray-700">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">Verification Failed</h2>
            <p className="text-gray-700">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}