import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Users, Crown, Star } from "lucide-react";
import {
  DashCompanyProfile,
  DashSubscriptionLimits,
} from "@/app/common/types/types";

interface DashSubscriptionPlanProps {
  profile: DashCompanyProfile;
  setShowUpgradeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashSubscriptionPlan: React.FC<DashSubscriptionPlanProps> = ({
  profile,
  setShowUpgradeModal,
}) => {
  const getSubscriptionLimits = (mode: string): DashSubscriptionLimits => {
    switch (mode.toLowerCase()) {
      case "free":
        return {
          maxFiles: 10,
          maxEmployees: 1,
          description: "Free tier - 10 files per month, 1 user",
          icon: <Star className="w-5 h-5" />,
          color: "text-slate-600",
        };
      case "basic":
        return {
          maxFiles: 100,
          maxEmployees: 10,
          description:
            "Basic tier - 100 files per month, up to 10 users ($5/user/month)",
          icon: <Star className="w-5 h-5" />,
          color: "text-blue-600",
        };
      case "premium":
        return {
          maxFiles: 1000,
          maxEmployees: "unlimited",
          description:
            "Premium tier - 1000 files per month, unlimited users ($300/month)",
          icon: <Crown className="w-5 h-5" />,
          color: "text-violet-600",
        };
      default:
        return {
          maxFiles: 0,
          maxEmployees: 0,
          description: "Unknown subscription tier",
          icon: <Star className="w-5 h-5" />,
          color: "text-red-600",
        };
    }
  };

  const canAddEmployee = (
    limits: DashSubscriptionLimits,
    currentEmployees: number
  ): boolean =>
    limits.maxEmployees === "unlimited" ||
    currentEmployees < (limits.maxEmployees as number);

  const canUploadFiles = (
    limits: DashSubscriptionLimits,
    currentFiles: number
  ): boolean => currentFiles < limits.maxFiles;

  const limits = getSubscriptionLimits(profile.mode);
  const usage = {
    filesUsed: profile.files.length,
    employeesUsed: profile.employees.length,
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-violet-50 p-6 rounded-2xl border border-indigo-200 shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        {limits.icon}
        <span className={`ml-3 ${limits.color}`}>
          {profile.mode.charAt(0).toUpperCase() + profile.mode.slice(1)} Plan
        </span>
      </h3>
      <p className="text-slate-700 mb-6">{limits.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/90 p-5 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600">
              Files This Month
            </span>
            <FileText className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-slate-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  usage.filesUsed >= limits.maxFiles
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : "bg-gradient-to-r from-emerald-500 to-green-600"
                }`}
                style={{
                  width: `${Math.min(
                    (usage.filesUsed / limits.maxFiles) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <span className="text-sm font-bold text-slate-800">
              {usage.filesUsed}/{limits.maxFiles}
            </span>
          </div>
        </div>
        <div className="bg-white/90 p-5 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600">
              Team Members
            </span>
            <Users className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-slate-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  limits.maxEmployees !== "unlimited" &&
                  usage.employeesUsed >= (limits.maxEmployees as number)
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600"
                }`}
                style={{
                  width:
                    limits.maxEmployees === "unlimited"
                      ? "50%"
                      : `${Math.min(
                          (usage.employeesUsed /
                            (limits.maxEmployees as number)) *
                            100,
                          100
                        )}%`,
                }}
              ></div>
            </div>
            <span className="text-sm font-bold text-slate-800">
              {usage.employeesUsed}/
              {limits.maxEmployees === "unlimited" ? "∞" : limits.maxEmployees}
            </span>
          </div>
        </div>
      </div>
      {(!canUploadFiles(limits, profile.files.length) ||
        !canAddEmployee(limits, profile.employees.length)) && (
        <div className="mt-6">
          <Button
            onClick={() => setShowUpgradeModal(true)}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Crown className="h-5 w-5 mr-2" />
            Upgrade Plan - Limits Reached
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashSubscriptionPlan;
