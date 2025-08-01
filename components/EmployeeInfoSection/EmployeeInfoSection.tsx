import React from "react";
import {
  User,
  Mail,
  Building2,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { EmployeeDetail } from "@/app/common/types/types";

interface EmployeeInfoSectionProps {
  employee: EmployeeDetail;
}

const EmployeeInfoSection: React.FC<EmployeeInfoSectionProps> = ({
  employee,
}) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const infoItems = [
    {
      icon: User,
      label: "Full Name",
      value: employee.name,
      color: "blue",
    },
    {
      icon: Mail,
      label: "Email Address",
      value: employee.email,
      color: "emerald",
    },
    {
      icon: Building2,
      label: "Company",
      value: employee.company.name,
      color: "purple",
    },
    {
      icon: Calendar,
      label: "Member Since",
      value: formatDate(employee.createdAt),
      color: "amber",
    },
    {
      icon: FileText,
      label: "Total Files",
      value: `${employee.files.length} files`,
      color: "rose",
    },
    {
      icon: employee.active ? CheckCircle : XCircle,
      label: "Status",
      value: employee.active ? "Active" : "Inactive",
      color: employee.active ? "green" : "red",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200">
      <h3 className="text-2xl font-bold mb-6 flex items-center text-slate-800">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <User className="w-4 h-4 text-blue-600" />
        </div>
        Employee Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {infoItems.map((item, index) => (
          <div key={index} className="group">
            <p className="text-sm font-semibold text-slate-600 mb-2">
              {item.label}
            </p>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm group-hover:shadow-md transition-all duration-200">
              <div
                className={`w-10 h-10 bg-${item.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}
              >
                <item.icon className={`w-5 h-5 text-${item.color}-600`} />
              </div>
              <span className="text-slate-800 font-medium text-sm">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeInfoSection;
