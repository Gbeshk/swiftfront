import { SubmitButtonProps } from "@/app/common/types/types";
import React from "react";
const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  isLoading,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Creating Account...
        </div>
      ) : (
        <div className="flex items-center justify-center cursor-pointer">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          Create Account
        </div>
      )}
    </button>
  );
};

export default SubmitButton;
