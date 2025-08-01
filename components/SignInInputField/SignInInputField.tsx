import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInInputFieldProps } from "@/app/common/types/types";

const SignInInputField: React.FC<SignInInputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  icon,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {icon}
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`transition-all duration-200 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "focus:border-blue-500"
        }`}
        autoComplete={autoComplete}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SignInInputField;
