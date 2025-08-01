import React from "react";
import { Mail, CheckCircle, XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { CompanyProfile } from "@/app/common/types/types";

interface CompanyInfoSectionProps {
  profile: CompanyProfile;
}

export const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
  profile,
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Mail className="w-5 h-5 text-blue-600 mr-2" />
        Company Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">
            Email Address
          </Label>
          <div className="flex items-center space-x-2 p-2 sm:p-3 bg-white rounded-lg border w-full max-w-full">
            <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-800 font-medium text-sm sm:text-base truncate">
              {profile.email}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">
            Account Status
          </Label>
          <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border">
            {profile.active ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600" />
            )}
            <span
              className={`font-semibold ${
                profile.active ? "text-green-600" : "text-red-600"
              }`}
            >
              {profile.active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
