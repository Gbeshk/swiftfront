import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Users, User, UserPlus, Trash2 } from "lucide-react";
import {
  DashCompanyProfile,
  DashSubscriptionLimits,
} from "@/app/common/types/types";

interface DashEmployeesSectionProps {
  profile: DashCompanyProfile;
  setProfile: React.Dispatch<React.SetStateAction<DashCompanyProfile | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  employeeToDelete: { id: string; name: string } | null;
  setEmployeeToDelete: React.Dispatch<
    React.SetStateAction<{ id: string; name: string } | null>
  >;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  saving: boolean;
}

const DashEmployeesSection: React.FC<DashEmployeesSectionProps> = ({
  profile,
  setProfile,
  setIsModalOpen,
  employeeToDelete,
  setEmployeeToDelete,
  setShowDeleteModal,
  saving,
}) => {
  const router = useRouter();

  const getSubscriptionLimits = (mode: string): DashSubscriptionLimits => {
    switch (mode.toLowerCase()) {
      case "free":
        return {
          maxFiles: 10,
          maxEmployees: 1,
          description: "",
          icon: <User className="w-5 h-5" />,
          color: "text-slate-600",
        };
      case "basic":
        return {
          maxFiles: 100,
          maxEmployees: 10,
          description: "",
          icon: <User className="w-5 h-5" />,
          color: "text-blue-600",
        };
      case "premium":
        return {
          maxFiles: 1000,
          maxEmployees: "unlimited",
          description: "",
          icon: <User className="w-5 h-5" />,
          color: "text-violet-600",
        };
      default:
        return {
          maxFiles: 0,
          maxEmployees: 0,
          description: "",
          icon: <User className="w-5 h-5" />,
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

  const limits = getSubscriptionLimits(profile.mode);

  return (
    <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 p-6 rounded-2xl border border-violet-200 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <Users className="w-6 h-6 text-violet-600 mr-3" />
          Team Members ({profile.employees.length})
        </h3>
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={!canAddEmployee(limits, profile.employees.length)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>
      {!canAddEmployee(limits, profile.employees.length) && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl shadow-sm">
          <p className="text-amber-800 text-sm font-medium">
            You've reached the maximum number of employees (
            {limits.maxEmployees}) for your {profile.mode} plan.
            {profile.mode === "free" &&
              " Upgrade to Basic or Premium to add more team members."}
            {profile.mode === "basic" &&
              " Upgrade to Premium for unlimited team members."}
          </p>
        </div>
      )}
      <div className="bg-white/90 rounded-xl border border-slate-200 p-6 shadow-md">
        {profile.employees.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg font-medium">
              No employees registered yet
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Add your first team member to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {profile.employees.map((employee, index) => (
              <div
                key={employee._id}
                className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all duration-300 group cursor-pointer hover:shadow-md"
                onClick={() => router.push(`/employees/${employee._id}`)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 font-semibold text-lg group-hover:text-blue-800 transition-colors">
                      {employee.name}
                    </p>
                    <p className="text-slate-500 group-hover:text-slate-700 transition-colors">
                      {employee.email}
                    </p>
                    <p className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-1 font-medium">
                      Click to view employee details →
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 ml-4">
                  <div className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full font-medium">
                    #{index + 1}
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEmployeeToDelete({
                        id: employee._id,
                        name: employee.name,
                      });
                      setShowDeleteModal(true);
                    }}
                    disabled={saving}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-105"
                  >
                    {saving && employeeToDelete?.id === employee._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashEmployeesSection;
