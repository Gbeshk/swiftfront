import React from "react";
import { Calendar, Users, FileText } from "lucide-react";
import { CompanyProfile } from "@/app/common/types/types";

interface AdditionalInfoSectionProps {
  profile: CompanyProfile;
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value }) => {
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-gray-800 font-semibold">{value}</p>
      </div>
    </div>
  );
};

export const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  profile,
}) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Additional Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profile.subscriptionStartDate && (
          <InfoCard
            icon={<Calendar className="w-5 h-5 text-purple-600" />}
            title="Subscription Start"
            value={new Date(profile.subscriptionStartDate).toLocaleDateString()}
          />
        )}

        <InfoCard
          icon={<Users className="w-5 h-5 text-indigo-600" />}
          title="Employees"
          value={`${profile.employees.length} registered`}
        />

        <InfoCard
          icon={<FileText className="w-5 h-5 text-green-600" />}
          title="Files"
          value={`${profile.files.length} uploaded`}
        />
      </div>
    </div>
  );
};
