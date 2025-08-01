import React from "react";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet } from "lucide-react";
import { EmployeeDetail, EmployeeFile } from "@/app/common/types/types";

interface EmployeeFilesSectionProps {
  employee: EmployeeDetail;
  clearMessages: () => void;
}

const EmployeeFilesSection: React.FC<EmployeeFilesSectionProps> = ({
  employee,
  clearMessages,
}) => {
  const getFileIcon = (fileName?: string) => {
    if (!fileName || typeof fileName !== "string") {
      return <FileSpreadsheet className="w-5 h-5 text-slate-500" />;
    }

    const extension = fileName.toLowerCase().split(".").pop();
    const iconClass = "w-5 h-5";

    switch (extension) {
      case "csv":
        return <FileSpreadsheet className={`${iconClass} text-emerald-600`} />;
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className={`${iconClass} text-green-600`} />;
      default:
        return <FileSpreadsheet className={`${iconClass} text-slate-500`} />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openFileInNewTab = (fileId: string) => {
    window.open(`${process.env.NEXT_PUBLIC_CLOUD_FRONT}${fileId}`, "_blank");
    clearMessages();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-8 sm:justify-between sm:text-left text-center">
        <h3 className="text-2xl font-bold flex flex-wrap items-center justify-center text-slate-800 w-full sm:w-auto">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
            <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
          </div>
          Spreadsheet Files
          <span className="ml-3 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mt-2 sm:mt-0">
            {employee.files.length} total
          </span>
        </h3>
      </div>

      {employee.files.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-300">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileSpreadsheet className="w-10 h-10 text-slate-400" />
          </div>
          <div className="space-y-2">
            <p className="text-slate-600 text-xl font-semibold">
              No spreadsheet files uploaded yet
            </p>
            <p className="text-slate-400 max-w-md mx-auto">
              This employee hasn't uploaded any CSV, XLS, or XLSX files to their
              profile.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {employee.files.map((file: EmployeeFile) => (
            <div
              key={file.fileId}
              className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => openFileInNewTab(file.fileId)}
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
                        <span>
                          {file.fileName.split(".").pop()?.toUpperCase() ||
                            "Unknown"}
                        </span>
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
                      openFileInNewTab(file.fileId);
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

export default EmployeeFilesSection;
