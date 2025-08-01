import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { SignInSubmitButtonProps } from "@/app/common/types/types";

const SignInSubmitButton: React.FC<SignInSubmitButtonProps> = ({
  onClick,
  isLoading,
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Signing In...
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </div>
      )}
    </Button>
  );
};

export default SignInSubmitButton;
