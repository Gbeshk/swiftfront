import React from "react";
import { FileText, File, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashCompanyProfile, DashSubscriptionLimits } from "@/app/common/types/types";

interface DashFilesSectionProps {
  profile: DashCompanyProfile;
  CLOUDFRONT_BASE_URL: string;
  handleFileClick: (fileId: string) => void;
}

const DashFilesSection: React.FC<DashFilesSectionProps> = ({ profile, CLOUDFRONT_BASE_URL, handleFileClick }) => {
  const getSubscriptionLimits = (mode: string): DashSubscriptionLimits => {
    switch (mode.toLowerCase()) {
      case "free":
        return { maxFiles: 10, maxEmployees: 1, description: "", icon: <File className="w-5 h-5" />, color: "text-slate-600" };
      case "basic":
        return { maxFiles: 100, maxEmployees: 10, description: "", icon: <File className="w-5 h-5" />, color: "text-blue-600" };
      case "premium":
        return { maxFiles: 1000, maxEmployees: "unlimited", description: "", icon: <File className="w-5 h-5" />, color: "text-violet-600" };
      default:
        return { maxFiles: 0, maxEmployees: 0, description: "", icon: <File className="w-5 h-5" />, color: "text-red-600" };
    }
  };

  const getFileIcon = (fileName?: string) => {
    if (!fileName || typeof fileName !== "string") {
      return <FileText className="w-5 h-5 text-slate-500" />;
    }

    const extension = fileName.toLowerCase().split(".").pop();
    const iconClass = "w-5 h-5";

    switch (extension) {
      case "csv":
        return <File className={`${iconClass} text-emerald-600`} />;
      case "xls":
      case "xlsx":
        return <File className={`${iconClass} text-green-600`} />;
      default:
        return <FileText className={`${iconClass} text-slate-500`} />;
    }
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const limits = getSubscriptionLimits(profile.mode);

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-8 sm:justify-between sm:text-left text-center">
        <h3 className="text-2xl font-bold flex flex-wrap items-center justify-center text-slate-800 w-full sm:w-auto">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
            <FileText className="w-4 h-4 text-indigo-600" />
          </div>
          Spreadsheet Files
          <span className="ml-3 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mt-2 sm:mt-0">
            {profile.files.length} total
          </span>
        </h3>
        {profile.files.length >= limits.maxFiles && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 shadow-sm">
            <p className="text-xs font-medium">File limit reached ({limits.maxFiles})</p>
          </div>
        )}
      </div>
      {profile.files.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-300">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-slate-400" />
          </div>
          <div className="space-y-2">
            <p className="text-slate-600 text-xl font-semibold">No spreadsheet files uploaded yet</p>
            <p className="text-slate-400 max-w-md mx-auto">No CSV, XLS, or XLSX files available to display.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {profile.files.map((file) => (
            <div
              key={file.fileId}
              className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleFileClick(file.fileId)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-50 transition-colors duration-200">
                    {getFileIcon(file.fileName)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <h4 className="text-lg font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors duration-200">
                      {file.fileName}
                    </h4>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>{formatFileSize(file.size)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span>{file.fileName.split(".").pop()?.toUpperCase() || "Unknown"}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <span>{formatDate(file.uploadedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 ml-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileClick(file.fileId);
                    }}
                    variant="outline"
                    size="sm"
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border-indigo-200 hover:border-indigo-300 shadow-sm"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Open
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashFilesSection;