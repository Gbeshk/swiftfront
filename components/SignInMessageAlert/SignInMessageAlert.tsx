import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { SignInMessageAlertProps } from "@/app/common/types/types";

const SignInMessageAlert: React.FC<SignInMessageAlertProps> = ({ message }) => {
  if (!message.text) return null;

  return (
    <Alert
      className={`border-l-4 ${
        message.type === "success"
          ? "border-green-500 bg-green-50 text-green-800"
          : "border-red-500 bg-red-50 text-red-800"
      }`}
    >
      {message.type === "success" ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertDescription className="font-medium">
        {message.text}
      </AlertDescription>
    </Alert>
  );
};

export default SignInMessageAlert;
