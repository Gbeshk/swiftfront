"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  ErrorResponse,
  Message,
  SignInFormData,
  SignInFormErrors,
  SignInMode,
  SignInResponse,
} from "@/app/common/types/types";
import SignInForm from "../SignInForm/SignInForm";
import SignInHeader from "../SignInHeader/SignInHeader";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ type: "", text: "" });
  const [errors, setErrors] = useState<SignInFormErrors>({});
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [signInMode, setSignInMode] = useState<SignInMode>("company");
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: SignInFormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const endpoint =
        signInMode === "company"
          ? `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-in`
          : `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-in-emploee`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}. Please check if the API endpoint is correct.`
        );
      }

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        setMessage({
          type: "error",
          text: errorData.message || `HTTP ${response.status}: Sign in failed`,
        });
        return;
      }

      const data: SignInResponse = await response.json();

      if (data.status === "unverified") {
        setMessage({
          type: "error",
          text:
            data.message || "Email is not verified. Activation email resent.",
        });
        return;
      }

      if (data.status === "success") {
        Cookies.set("authToken", data.token, {
          ...(rememberMe && { expires: 7 }),
          secure: true,
          sameSite: "Strict",
          path: "/",
        });

        setMessage({
          type: "success",
          text: "Sign in successful! Redirecting...",
        });

        setFormData({
          email: "",
          password: "",
        });

        router.push(
          signInMode === "company" ? "/profile" : "/employee/dashboard"
        );
      }
    } catch (error) {
      console.error("Sign in error:", error);

      let errorMessage = "An error occurred during sign in. Please try again.";

      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        errorMessage =
          "Unable to connect to server. Please check your internet connection and try again.";
      } else if (error instanceof Error) {
        if (error.message.includes("invalid credentials")) {
          errorMessage =
            "Invalid email or password. Please check your credentials and try again.";
        } else if (error.message.includes("verify email")) {
          errorMessage =
            "Please verify your email address before signing in. Check your inbox for the activation link.";
        } else {
          errorMessage = error.message;
        }
      }

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof SignInFormData,
    value: string
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignInHeader signInMode={signInMode} />
        <SignInForm
          formData={formData}
          errors={errors}
          message={message}
          isLoading={isLoading}
          showPassword={showPassword}
          signInMode={signInMode}
          onInputChange={handleInputChange}
          onTogglePassword={() => setShowPassword(!showPassword)}
          onModeChange={setSignInMode}
          onSubmit={handleSubmit}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SignIn;
