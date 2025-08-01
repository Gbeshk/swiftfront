"use client";

import {
  ErrorResponse,
  FormData,
  FormErrors,
  Message,
  SignUpResponse,
} from "@/app/common/types/types";
import React, { useState } from "react";
import SignUpForm from "../SignUpForm/SignUpForm";
import Header from "../Header/Header";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    industry: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ type: "", text: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Georgia",
    "Germany",
    "France",
    "Japan",
    "South Korea",
    "Singapore",
    "Netherlands",
    "Sweden",
    "Switzerland",
    "Denmark",
    "Norway",
    "Finland",
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Real Estate",
    "Transportation",
    "Energy",
    "Agriculture",
    "Entertainment",
    "Consulting",
    "Marketing",
    "Construction",
    "Other",
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Company name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Company name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.industry) {
      newErrors.industry = "Industry is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    if (!acceptedTerms) {
      setMessage({
        type: "error",
        text: "Please accept the Terms of Service to continue",
      });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          country: formData.country,
          industry: formData.industry,
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
          text: errorData.message || `HTTP ${response.status}: Sign up failed`,
        });
        return;
      }

      const data: SignUpResponse = await response.json();

      setMessage({
        type: "success",
        text:
          data.message ||
          "Registration successful! Check your email to activate your account.",
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        industry: "",
      });
      setAcceptedTerms(false);
    } catch (error) {
      console.error("Sign up error:", error);

      let errorMessage =
        "An error occurred during registration. Please try again.";

      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        errorMessage =
          "Unable to connect to server. Please check your internet connection and try again.";
      } else if (error instanceof Error) {
        if (error.message.includes("Company already exists")) {
          errorMessage =
            "An account with this email already exists. Please use a different email or sign in.";
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

  const handleInputChange = (field: keyof FormData, value: string): void => {
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
      <div className="w-full max-w-lg">
        <Header />
        <SignUpForm
          formData={formData}
          errors={errors}
          message={message}
          isLoading={isLoading}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          acceptedTerms={acceptedTerms}
          countries={countries}
          industries={industries}
          onInputChange={handleInputChange}
          onTogglePassword={() => setShowPassword(!showPassword)}
          onToggleConfirmPassword={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
          onAcceptTerms={setAcceptedTerms}
          onSubmit={handleSubmit}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SignUp;
