"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { SignInPasswordFieldProps } from "@/app/common/types/types";

const SignInPasswordField: React.FC<SignInPasswordFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  showPassword,
  onToggleVisibility,
  icon,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {icon}
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`pr-10 transition-all duration-200 ${
            error
              ? "border-red-500 focus:border-red-500"
              : "focus:border-blue-500"
          }`}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SignInPasswordField;
