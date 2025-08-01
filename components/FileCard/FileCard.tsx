import { FileCardProps } from "@/app/common/types/types";
import { Download, File, FileText, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export const FileCard: React.FC<FileCardProps> = ({
  file,
  showDelete = false,
  onFileClick,
  onDeleteFile,
  deletingFileId,
}) => {
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

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => onFileClick(file.fileId)}
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
                  {file.fileName.split(".").pop()?.toUpperCase() || "Unknown"}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span>{formatDate(file.uploadedAt)}</span>
              </div>
              {file.whoCanSee && file.whoCanSee.length > 0 && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Shared with {file.whoCanSee.length} employee(s)</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 ml-4">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onFileClick(file.fileId);
            }}
            variant="outline"
            size="sm"
            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border-indigo-200 hover:border-indigo-300 shadow-sm"
          >
            <Download className="w-4 h-4 mr-1" />
            Open
          </Button>
          {showDelete && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFile(file.fileId, file.fileName);
              }}
              disabled={deletingFileId === file._id}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 shadow-sm"
            >
              {deletingFileId === file._id ? (
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
