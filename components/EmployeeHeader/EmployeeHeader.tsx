import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface EmployeeHeaderProps {
  router: ReturnType<typeof useRouter>;
}

const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({ router }) => {
  return (
    <main className="max-w-7xl mx-auto p-6 pt-8">
      <div className="mb-8">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white shadow-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Employee Profile
          </h1>
          <p className="text-slate-600 text-lg">
            Comprehensive file management and details
          </p>
        </div>
      </div>
    </main>
  );
};

export default EmployeeHeader;