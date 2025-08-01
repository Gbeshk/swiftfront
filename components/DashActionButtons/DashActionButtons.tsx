import React from "react";
import { useRouter } from "next/navigation";
import { Building2, LogOut, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";

interface DashActionButtonsProps {
  error: string;
  successMessage: string;
  handleLogout: () => void;
}

const DashActionButtons: React.FC<DashActionButtonsProps> = ({
  error,
  successMessage,
  handleLogout,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-3 w-full">
        <Button
          onClick={() => router.push("/profile")}
          className="h-12 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-lg transition-colors px-6 flex-1 sm:flex-initial cursor-pointer border border-indigo-100 hover:border-indigo-200"
        >
          <Building2 className="w-5 h-5 mr-2 text-indigo-600" />
          <span>Go to Profile</span>
        </Button>

        <Button
          onClick={handleLogout}
          className="h-12 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium rounded-lg transition-colors px-6 flex-1 sm:flex-initial cursor-pointer border border-rose-100 hover:border-rose-200"
        >
          <LogOut className="w-5 h-5 mr-2 text-rose-600" />
          <span>Log Out</span>
        </Button>
      </div>

      <div className="w-full space-y-2">
        {error && (
          <Alert className="border border-rose-200 bg-rose-50 rounded-lg cursor-default">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-rose-600 cursor-pointer" />
              <AlertDescription className="ml-2 text-sm text-rose-700 cursor-pointer">
                {error}
              </AlertDescription>
            </div>
          </Alert>
        )}

        {successMessage && (
          <Alert className="border border-emerald-200 bg-emerald-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <AlertDescription className="text-sm text-emerald-700">
                {successMessage}
              </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DashActionButtons;
