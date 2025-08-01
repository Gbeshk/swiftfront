import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import {
  DashCompanyProfile,
  DashEmployeeFormData,
} from "@/app/common/types/types";
import DashSubscriptionPlan from "../DashSubscriptionPlan/DashSubscriptionPlan";
import DashCompanyOverview from "../DashCompanyOverview/DashCompanyOverview";
import DashEmployeesSection from "../DashEmploeesSection/DashEmploeeysSection";
import DashFilesSection from "../DashFilesSection/DashFilesSection";
import DashActionButtons from "../DashActionButtons/DashActionButtons";
import DashAddEmployeeModal from "../DashAddEmploeeModal/DashAddEmploeeModal";
import DashDeleteEmployeeModal from "../DashDeleteEmploeeModal/DashDeleteEmploeeModal";
import DashUpgradePlanModal from "../DashUpgradePlanModal/DashUpgradePlanModal";

interface DashCardProps {
  profile: DashCompanyProfile;
  setProfile: React.Dispatch<React.SetStateAction<DashCompanyProfile | null>>;
  error: string;
  successMessage: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  employeeForm: DashEmployeeFormData;
  setEmployeeForm: React.Dispatch<React.SetStateAction<DashEmployeeFormData>>;
  employeeError: string;
  setEmployeeError: React.Dispatch<React.SetStateAction<string>>;
  saving: boolean;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  employeeToDelete: { id: string; name: string } | null;
  setEmployeeToDelete: React.Dispatch<
    React.SetStateAction<{ id: string; name: string } | null>
  >;
  showUpgradeModal: boolean;
  setShowUpgradeModal: React.Dispatch<React.SetStateAction<boolean>>;
  upgrading: boolean;
  upgradingPlan: string | null;
  CLOUDFRONT_BASE_URL: string;
  handleEmployeeInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddEmployee: () => void;
  handleDeleteEmployee: () => void;
  handleUpgradePlan: (planMode: string) => void;
  handleLogout: () => void;
  handleFileClick: (fileId: string) => void;
}

const DashCard: React.FC<DashCardProps> = ({
  profile,
  setProfile,
  error,
  successMessage,
  isModalOpen,
  setIsModalOpen,
  employeeForm,
  setEmployeeForm,
  employeeError,
  setEmployeeError,
  saving,
  showDeleteModal,
  setShowDeleteModal,
  employeeToDelete,
  setEmployeeToDelete,
  showUpgradeModal,
  setShowUpgradeModal,
  upgrading,
  upgradingPlan,
  CLOUDFRONT_BASE_URL,
  handleEmployeeInputChange,
  handleAddEmployee,
  handleDeleteEmployee,
  handleUpgradePlan,
  handleLogout,
  handleFileClick,
}) => {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white">
        <CardTitle className="flex items-center space-x-3 text-3xl font-bold">
          <Building2 className="w-8 h-8" />
          <span>Company Dashboard</span>
        </CardTitle>
        <CardDescription className="text-blue-100 text-lg mt-2">
          Manage your company, employees, and files
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        <DashSubscriptionPlan
          profile={profile}
          setShowUpgradeModal={setShowUpgradeModal}
        />
        <DashCompanyOverview profile={profile} />
        <DashEmployeesSection
          profile={profile}
          setProfile={setProfile}
          setIsModalOpen={setIsModalOpen}
          employeeToDelete={employeeToDelete}
          setEmployeeToDelete={setEmployeeToDelete}
          setShowDeleteModal={setShowDeleteModal}
          saving={saving}
        />
        <DashFilesSection
          profile={profile}
          CLOUDFRONT_BASE_URL={CLOUDFRONT_BASE_URL}
          handleFileClick={handleFileClick}
        />
        <DashActionButtons
          error={error}
          successMessage={successMessage}
          handleLogout={handleLogout}
        />
        <DashAddEmployeeModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          employeeForm={employeeForm}
          setEmployeeForm={setEmployeeForm}
          employeeError={employeeError}
          setEmployeeError={setEmployeeError}
          saving={saving}
          handleEmployeeInputChange={handleEmployeeInputChange}
          handleAddEmployee={handleAddEmployee}
        />
        <DashDeleteEmployeeModal
          isOpen={showDeleteModal}
          setIsOpen={setShowDeleteModal}
          employeeToDelete={employeeToDelete}
          setEmployeeToDelete={setEmployeeToDelete}
          saving={saving}
          handleDeleteEmployee={handleDeleteEmployee}
        />
        <DashUpgradePlanModal
          isOpen={showUpgradeModal}
          setIsOpen={setShowUpgradeModal}
          profile={profile}
          upgrading={upgrading}
          upgradingPlan={upgradingPlan}
          handleUpgradePlan={handleUpgradePlan}
        />
      </CardContent>
    </Card>
  );
};

export default DashCard;
