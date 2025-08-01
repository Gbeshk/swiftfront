"use client";

import React from "react";
import { Building2, User } from "lucide-react";
import { SignInHeaderProps } from "@/app/common/types/types";

const SignInHeader: React.FC<SignInHeaderProps> = ({ signInMode }) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
        {signInMode === "company" ? (
          <Building2 className="w-8 h-8 text-white" />
        ) : (
          <User className="w-8 h-8 text-white" />
        )}
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {signInMode === "company" ? "Welcome Back" : "Employee Sign In"}
      </h1>
      <p className="text-gray-600">
        Sign in to your {signInMode === "company" ? "company" : "employee"}{" "}
        account
      </p>
    </div>
  );
};

export default SignInHeader;
