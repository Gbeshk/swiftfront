import React from "react";
import { UserPlus, XCircle } from "lucide-react";
import { DashEmployeeFormData } from "@/app/common/types/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DashAddEmployeeModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  employeeForm: DashEmployeeFormData;
  setEmployeeForm: React.Dispatch<React.SetStateAction<DashEmployeeFormData>>;
  employeeError: string;
  setEmployeeError: React.Dispatch<React.SetStateAction<string>>;
  saving: boolean;
  handleEmployeeInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddEmployee: () => void;
  successMessage?: string; // Added to handle success state
  setSuccessMessage?: React.Dispatch<React.SetStateAction<string>>; // Added to clear success message
}

const DashAddEmployeeModal: React.FC<DashAddEmployeeModalProps> = ({
  isOpen,
  setIsOpen,
  employeeForm,
  setEmployeeForm,
  employeeError,
  setEmployeeError,
  saving,
  handleEmployeeInputChange,
  handleAddEmployee,
  successMessage,
  setSuccessMessage,
}) => {
  const handleClose = () => {
    setIsOpen(false);
    setEmployeeForm({ name: "", email: "" });
    setEmployeeError("");
    if (setSuccessMessage) setSuccessMessage(""); // Clear success message on close
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-0 p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-8 py-6">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-bold text-white">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              Add New Employee
            </DialogTitle>
            <p className="text-blue-100 mt-2 text-sm">
              Create a new employee account for your organization
            </p>
          </DialogHeader>
        </div>

        <div className="px-8 py-6 space-y-6">
          {employeeError && (
            <Alert className="border-l-4 border-red-500 bg-red-50 text-red-800">
              <XCircle className="h-4 w-4" />
              <AlertDescription className="ml-2">{employeeError}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert className="border-l-4 border-green-500 bg-green-50 text-green-800">
              <AlertDescription className="ml-2">{successMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-5">
            <div className="space-y-3">
              <Label
                htmlFor="employeeName"
                className="text-sm font-semibold text-slate-700 flex items-center"
              >
                Full Name
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="employeeName"
                  name="name"
                  value={employeeForm.name}
                  onChange={handleEmployeeInputChange}
                  className="h-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl text-base transition-all duration-200 pl-4"
                  placeholder="Enter employee's full name"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="employeeEmail"
                className="text-sm font-semibold text-slate-700 flex items-center"
              >
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="employeeEmail"
                  name="email"
                  type="email"
                  value={employeeForm.email}
                  onChange={handleEmployeeInputChange}
                  className="h-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl text-base transition-all duration-200 pl-4"
                  placeholder="Enter employee's email address"
                />
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Account Creation</p>
                <p className="text-blue-600">
                  The employee will receive an email invitation to set up their account and password.
                </p>
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
              onClick={handleAddEmployee}
              disabled={saving || !employeeForm.name.trim() || !employeeForm.email.trim()}
              className="h-11 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Create Employee</span>
                </div>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashAddEmployeeModal;