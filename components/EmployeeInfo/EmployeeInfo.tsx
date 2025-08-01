import { EmployeeInfoProps } from "@/app/common/types/types";
import {
  Building2,
  Calendar,
  CheckCircle,
  FileText,
  Mail,
  User,
  XCircle,
} from "lucide-react";

export const EmployeeInfo: React.FC<EmployeeInfoProps> = ({
  employee,
  formatDate,
}) => {
  const getPlanLimitMessage = () => {
    if (!employee?.company) return "No plan information available";
    const mode = employee.company.mode ?? "free";
    const totalFiles =
      employee.company.totalFiles ?? employee.company.files?.length ?? 0;
    const FILE_LIMITS = { free: 10, basic: 100, premium: 1000 };
    const remaining = Math.max(0, FILE_LIMITS[mode] - totalFiles);
    return `${
      mode.charAt(0).toUpperCase() + mode.slice(1)
    } plan: ${totalFiles}/${
      FILE_LIMITS[mode]
    } files used (${remaining} remaining)`;
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
        <User className="w-5 h-5 text-blue-600 mr-2" />
        Employee Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: User, label: "Full Name", value: employee.name },
          { icon: Mail, label: "Email Address", value: employee.email },
          {
            icon: Building2,
            label: "Company",
            value: employee.company.name,
          },
          {
            icon: Calendar,
            label: "Member Since",
            value: formatDate(employee.createdAt),
          },
          {
            icon: FileText,
            label: "Total Files",
            value: `${employee.files.length} files`,
          },
          {
            icon: employee.active ? CheckCircle : XCircle,
            label: "Status",
            value: employee.active ? "Active" : "Inactive",
            color: employee.active ? "text-green-600" : "text-red-600",
          },
          {
            icon: FileText,
            label: "Company Plan",
            value: getPlanLimitMessage(),
            color: "text-blue-600",
          },
        ].map((item, index) => (
          <div key={index} className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{item.label}</p>
            <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border shadow-sm">
              <item.icon
                className={`w-4 h-4 ${item.color || "text-gray-500"}`}
              />
              <span className={`font-medium ${item.color || "text-gray-800"}`}>
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
