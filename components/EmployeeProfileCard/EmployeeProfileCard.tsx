import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { User } from "lucide-react";
import { EmployeeDetail } from "@/app/common/types/types";
import EmployeeFilesSection from "../EmployeeFilesSection/EmployeeFilesSection";
import EmployeeMessageAlert from "../EmployeeMessageAlert/EmployeeMessageAlert";
import EmployeeInfoSection from "../EmployeeInfoSection/EmployeeInfoSection";

interface EmployeeProfileCardProps {
  employee: EmployeeDetail;
  error: string;
  clearMessages: () => void;
}

const EmployeeProfileCard: React.FC<EmployeeProfileCardProps> = ({
  employee,
  error,
  clearMessages,
}) => {
  return (
    <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <CardTitle className="flex items-center space-x-3 text-3xl font-bold">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <span>{employee.name}</span>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                employee.active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {employee.active ? "Active" : "Inactive"}
            </div>
          </CardTitle>
          <CardDescription className="text-blue-100 text-lg mt-2">
            {employee.company.name} • {employee.files.length} files uploaded
          </CardDescription>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full"></div>
      </CardHeader>

      <CardContent className="p-8 space-y-8">
        <EmployeeInfoSection employee={employee} />
        <EmployeeFilesSection
          employee={employee}
          clearMessages={clearMessages}
        />
        {error && <EmployeeMessageAlert error={error} />}
      </CardContent>
    </Card>
  );
};

export default EmployeeProfileCard;
