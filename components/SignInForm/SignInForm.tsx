"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import {
  Message,
  SignInFormData,
  SignInFormErrors,
  SignInMode,
} from "@/app/common/types/types";
import SignInInputField from "../SignInInputField/SignInInputField";
import SignInPasswordField from "../SignInPasswordField/SignInPasswordField";
import SignInMessageAlert from "../SignInMessageAlert/SignInMessageAlert";
import ModeToggle from "../ModeToggle/ModeToggle";
import SignInSubmitButton from "../SignInSubmitButton/SignInSubmitButton";

interface SignInFormProps {
  formData: SignInFormData;
  errors: SignInFormErrors;
  message: Message;
  isLoading: boolean;
  showPassword: boolean;
  signInMode: SignInMode;
  onInputChange: (field: keyof SignInFormData, value: string) => void;
  onTogglePassword: () => void;
  onModeChange: (mode: SignInMode) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  formData,
  errors,
  message,
  isLoading,
  showPassword,
  signInMode,
  onInputChange,
  onTogglePassword,
  onModeChange,
  onSubmit,
  onKeyPress,
}) => {
  return (
    <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-semibold text-center text-gray-800">
          {signInMode === "company" ? "Company Sign In" : "Employee Sign In"}
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <ModeToggle signInMode={signInMode} onModeChange={onModeChange} />

        <SignInMessageAlert message={message} />

        <div className="space-y-4" onKeyPress={onKeyPress}>
          <SignInInputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(value) => onInputChange("email", value)}
            error={errors.email}
            autoComplete="email"
            icon={<Mail className="w-4 h-4 inline mr-2" />}
          />

          <SignInPasswordField
            id="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(value) => onInputChange("password", value)}
            error={errors.password}
            autoComplete="current-password"
            showPassword={showPassword}
            onToggleVisibility={onTogglePassword}
            icon={<Lock className="w-4 h-4 inline mr-2" />}
          />

          <div className="flex items-center justify-between">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <SignInSubmitButton onClick={onSubmit} isLoading={isLoading} />
        </div>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign up here
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
