"use client";

import { FormData, FormErrors, Message } from "@/app/common/types/types";
import React from "react";
import InputField from "../InputField/InputField";
import MessageAlert from "../MessageAlert/MessageAlert";
import SelectField from "../SelectedField/SelectedField";
import PasswordField from "../PasswordField/PasswordField";
import SubmitButton from "../SubmitButton/SubmitButton";
import TermsCheckbox from "../TermsCheckBox/TermsCheckBox";

interface SignUpFormProps {
  formData: FormData;
  errors: FormErrors;
  message: Message;
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  acceptedTerms: boolean;
  countries: string[];
  industries: string[];
  onInputChange: (field: keyof FormData, value: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onAcceptTerms: (accepted: boolean) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  formData,
  errors,
  message,
  isLoading,
  showPassword,
  showConfirmPassword,
  acceptedTerms,
  countries,
  industries,
  onInputChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onAcceptTerms,
  onSubmit,
  onKeyPress,
}) => {
  const companyIcon = (
    <svg
      className="w-4 h-4 inline mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );

  const emailIcon = (
    <svg
      className="w-4 h-4 inline mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const countryIcon = (
    <svg
      className="w-4 h-4 inline mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const industryIcon = (
    <svg
      className="w-4 h-4 inline mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0v.5A3.5 3.5 0 0011.5 10h1A3.5 3.5 0 0016 6.5V6M8 14h.01M12 14h.01M16 14h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
      />
    </svg>
  );

  const lockIcon = (
    <svg
      className="w-4 h-4 inline mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );

  return (
    <div className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-lg">
      <div className="space-y-1 pb-6 p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Company Registration
        </h2>
        <p className="text-center text-gray-600">
          Fill in your company details to get started
        </p>
      </div>

      <div className="space-y-4 px-6 pb-6">
        <MessageAlert message={message} />

        <div className="space-y-4" onKeyPress={onKeyPress}>
          <InputField
            label="Company Name"
            type="text"
            placeholder="Enter your company name"
            value={formData.name}
            onChange={(value) => onInputChange("name", value)}
            error={errors.name}
            autoComplete="organization"
            icon={companyIcon}
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter your company email"
            value={formData.email}
            onChange={(value) => onInputChange("email", value)}
            error={errors.email}
            autoComplete="email"
            icon={emailIcon}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Country"
              value={formData.country}
              onChange={(value) => onInputChange("country", value)}
              options={countries}
              placeholder="Select country"
              error={errors.country}
              icon={countryIcon}
            />

            <SelectField
              label="Industry"
              value={formData.industry}
              onChange={(value) => onInputChange("industry", value)}
              options={industries}
              placeholder="Select industry"
              error={errors.industry}
              icon={industryIcon}
            />
          </div>

          <PasswordField
            label="Password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(value) => onInputChange("password", value)}
            error={errors.password}
            autoComplete="new-password"
            showPassword={showPassword}
            onToggleVisibility={onTogglePassword}
            icon={lockIcon}
          />

          <PasswordField
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(value) => onInputChange("confirmPassword", value)}
            error={errors.confirmPassword}
            autoComplete="new-password"
            showPassword={showConfirmPassword}
            onToggleVisibility={onToggleConfirmPassword}
            icon={lockIcon}
          />

          <TermsCheckbox accepted={acceptedTerms} onChange={onAcceptTerms} />

          <SubmitButton onClick={onSubmit} isLoading={isLoading} />
        </div>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
