import React from "react";
import { Building2, CheckCircle, XCircle } from "lucide-react";
import { DashCompanyProfile } from "@/app/common/types/types";

interface DashCompanyOverviewProps {
  profile: DashCompanyProfile;
}

const DashCompanyOverview: React.FC<DashCompanyOverviewProps> = ({ profile }) => (
  <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-2xl border border-slate-200 shadow-lg">
    <h3 className="text-xl font-bold mb-6 flex items-center">
      <Building2 className="w-6 h-6 text-blue-600 mr-3" />
      Company Overview
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Company Name</p>
        <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
          <Building2 className="w-5 h-5 text-slate-500" />
          <span className="text-slate-800 font-semibold text-lg">{profile.name}</span>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Account Status</p>
        <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
          {profile.active ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
          <span className={`font-bold text-lg ${profile.active ? "text-emerald-600" : "text-red-600"}`}>{profile.active ? "Active" : "Inactive"}</span>
        </div>
      </div>
    </div>
  </div>
);

export default DashCompanyOverview;