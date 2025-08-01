import React from "react";
import { AlertTriangle, Trash2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DashDeleteEmployeeModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  employeeToDelete: { id: string; name: string } | null;
  setEmployeeToDelete: React.Dispatch<
    React.SetStateAction<{ id: string; name: string } | null>
  >;
  saving: boolean;
  handleDeleteEmployee: () => void;
}

const DashDeleteEmployeeModal: React.FC<DashDeleteEmployeeModalProps> = ({
  isOpen,
  setIsOpen,
  employeeToDelete,
  setEmployeeToDelete,
  saving,
  handleDeleteEmployee,
}) => {
  const handleClose = () => {
    setIsOpen(false);
    setEmployeeToDelete(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-0 p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-red-600 via-red-600 to-red-700 px-8 py-6">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-bold text-white">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              Delete Employee
            </DialogTitle>
            <p className="text-red-100 mt-2 text-sm">
              This action cannot be undone and will permanently remove the employee
            </p>
          </DialogHeader>
        </div>

        <div className="px-8 py-6 space-y-6">
          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-lg">
            <div className="flex items-start">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-red-800 mb-1">
                  Warning: Permanent Action
                </h3>
                <p className="text-sm text-red-700">
                  This will permanently delete the employee account and cannot be reversed.
                </p>
              </div>
            </div>
          </div>

          {/* Employee Details */}
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">
                Employee to be deleted:
              </h4>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {employeeToDelete?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Employee ID: {employeeToDelete?.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consequences Info */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">This will immediately:</p>
                <ul className="text-red-600 space-y-1">
                  <li>• Revoke all account access</li>
                  <li>• Remove from all projects and teams</li>
                  <li>• Delete all associated data</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-8 py-6 bg-slate-50 border-t border-slate-200">
          <div className="flex justify-end space-x-3 w-full">
            <Button
              variant="outline"
              onClick={handleClose}
              className="h-11 px-6 rounded-xl border-2 border-slate-300 hover:border-slate-400 font-medium transition-all duration-200"
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteEmployee}
              disabled={saving}
              className="h-11 px-8 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Deleting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Employee</span>
                </div>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashDeleteEmployeeModal;