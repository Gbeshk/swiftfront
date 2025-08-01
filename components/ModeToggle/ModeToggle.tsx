import React from "react";
import { Button } from "@/components/ui/button";
import { Building2, User } from "lucide-react";
import { ModeToggleProps } from "@/app/common/types/types";

const ModeToggle: React.FC<ModeToggleProps> = ({
  signInMode,
  onModeChange,
}) => {
  return (
    <div className="flex justify-center space-x-2 mb-4">
      <Button
        onClick={() => onModeChange("company")}
        className={`${
          signInMode === "company"
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        } font-semibold py-2 px-4 rounded-lg transition-all duration-200`}
      >
        <Building2 className="w-4 h-4 mr-2" />
        Company
      </Button>
      <Button
        onClick={() => onModeChange("employee")}
        className={`${
          signInMode === "employee"
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        } font-semibold py-2 px-4 rounded-lg transition-all duration-200`}
      >
        <User className="w-4 h-4 mr-2" />
        Employee
      </Button>
    </div>
  );
};

export default ModeToggle;
