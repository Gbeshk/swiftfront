import React from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft, XCircle } from "lucide-react";

interface ErrorStateProps {
  error: string;
  router: ReturnType<typeof useRouter>;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, router }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-100 flex flex-col items-center justify-center space-y-6 px-4">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-red-800">
            Oops! Something went wrong
          </h1>
          <p className="text-red-600 max-w-md">{error}</p>
        </div>
      </div>

      <Alert className="max-w-lg w-full border-l-4 border-red-500 bg-red-50 text-red-800">
        <XCircle className="h-4 w-4" />
        <AlertDescription className="ml-2">{error}</AlertDescription>
      </Alert>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="border-slate-300 hover:bg-slate-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;