import { FileSectionProps } from "@/app/common/types/types";
import { FileCard } from "../FileCard/FileCard";
import { FileText, Upload } from "lucide-react";
import { Button } from "../ui/button";

export const FileSection: React.FC<FileSectionProps> = ({
  title,
  files,
  employee,
  showUploadButton = false,
  showDeleteButtons = false,
  onFileClick,
  onDeleteFile,
  onUploadClick,
  deletingFileId,
  canUploadFile,
  getRemainingFiles,
  getPlanLimitMessage,
  formatFileSize,
  getFileIcon,
  gradientColors,
  iconBgColor,
  iconColor,
}) => {
  const FILE_LIMITS = { free: 10, basic: 100, premium: 1000 };
  const limits = FILE_LIMITS[employee.company.mode || "free"];

  const EmptyState = () => (
    <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-300">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileText className="w-10 h-10 text-slate-400" />
      </div>
      <div className="space-y-2">
        <p className="text-slate-600 text-xl font-semibold">
          {showUploadButton 
            ? "No spreadsheet files uploaded yet"
            : "No files shared with you yet"
          }
        </p>
        {showUploadButton && getRemainingFiles && (
          <p className="text-slate-400 mb-2">
            {getRemainingFiles()} files remaining
          </p>
        )}
        <p className="text-slate-400 max-w-md mx-auto mb-6">
          {showUploadButton 
            ? "Upload your first CSV, XLS, or XLSX file to get started."
            : "Files shared by colleagues will appear here."
          }
        </p>
      </div>
      {showUploadButton && onUploadClick && (
        <Button
          onClick={onUploadClick}
          className="bg-indigo-600 hover:bg-indigo-700"
          disabled={!canUploadFile}
          title={
            canUploadFile && getPlanLimitMessage
              ? ""
              : `File limit reached (${getPlanLimitMessage?.()})`
          }
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload File
        </Button>
      )}
    </div>
  );

  return (
    <div className={`${gradientColors} p-8 rounded-2xl border border-indigo-200`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-8 sm:justify-between sm:text-left text-center">
        <h3 className="text-2xl font-bold flex flex-wrap items-center justify-center text-slate-800 w-full sm:w-auto">
          <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center mr-3`}>
            <FileText className={`w-4 h-4 ${iconColor}`} />
          </div>
          {title}
          <span className={`ml-3 px-3 py-1 ${iconBgColor} ${iconColor} rounded-full text-sm font-medium mt-2 sm:mt-0`}>
            {files.length} total
          </span>
        </h3>
        {showUploadButton && (
          <div className="flex items-center space-x-4">
            {getRemainingFiles && (
              <p className="text-sm text-slate-600">
                {getRemainingFiles()} files remaining
              </p>
            )}
            {files.length >= limits && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 shadow-sm">
                <p className="text-xs font-medium">
                  File limit reached ({limits})
                </p>
              </div>
            )}
            {onUploadClick && (
              <Button
                onClick={onUploadClick}
                className="bg-indigo-600 hover:bg-indigo-700"
                disabled={!canUploadFile}
                title={
                  canUploadFile && getPlanLimitMessage
                    ? ""
                    : `File limit reached (${getPlanLimitMessage?.()})`
                }
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            )}
          </div>
        )}
      </div>

      {files.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {files.map((file, index) => (
            <FileCard
              key={`${showDeleteButtons ? 'uploaded' : 'shared'}-${file._id}-${index}`}
              file={file}
              showDelete={showDeleteButtons}
              onFileClick={onFileClick}
              onDeleteFile={onDeleteFile}
              deletingFileId={deletingFileId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
