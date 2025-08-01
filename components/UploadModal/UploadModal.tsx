import { UploadModalProps } from "@/app/common/types/types";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  selectedFile,
  companyEmployees,
  selectedEmployeeIds,
  uploading,
  canUploadFile,
  onEmployeeToggle,
  onUpload,
  formatFileSize,
  getFileIcon,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg font-semibold text-gray-900">
            <Upload className="w-5 h-5 text-indigo-600 mr-2" />
            Upload File
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {selectedFile && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Selected file</p>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
                {getFileIcon(selectedFile.name)}
                <div>
                  <p className="text-sm font-medium truncate max-w-48">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Share with</p>
            <div className="max-h-48 overflow-y-auto border rounded-lg bg-white">
              {companyEmployees.length === 0 ? (
                <p className="text-sm text-gray-500 p-4">
                  No other employees found in the company.
                </p>
              ) : (
                companyEmployees.map((emp) => (
                  <div
                    key={emp._id}
                    className="flex items-center space-x-2 p-3 hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <Checkbox
                      id={`emp-${emp._id}`}
                      checked={selectedEmployeeIds.includes(emp._id)}
                      onCheckedChange={() => onEmployeeToggle(emp._id)}
                    />
                    <label
                      htmlFor={`emp-${emp._id}`}
                      className="flex-1 text-sm text-gray-800 cursor-pointer"
                    >
                      {emp.name} ({emp.email})
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onUpload}
            disabled={uploading || !canUploadFile}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {uploading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
