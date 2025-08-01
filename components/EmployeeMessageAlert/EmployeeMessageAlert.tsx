import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { XCircle } from "lucide-react";

interface MessageAlertProps {
  error: string;
}

const EmployeeMessageAlert: React.FC<MessageAlertProps> = ({ error }) => {
  return (
    <Alert className="border-l-4 border-red-500 bg-red-50 text-red-800">
      <XCircle className="h-4 w-4" />
      <AlertDescription className="ml-2">{error}</AlertDescription>
    </Alert>
  );
};

export default EmployeeMessageAlert;