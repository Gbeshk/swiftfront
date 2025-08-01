import React from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordVisibility, ProfileFormData } from "@/app/common/types/types";

interface PasswordChangeSectionProps {
  formData: ProfileFormData;
  isChangingPassword: boolean;
  showPasswords: PasswordVisibility;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePasswordChange: () => void;
  onTogglePasswordVisibility: (field: keyof PasswordVisibility) => void;
}

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onToggleVisibility: () => void;
  autoComplete?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  onToggleVisibility,
  autoComplete,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="h-12 border-2 focus:border-blue-500 pr-10"
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export const PasswordChangeSection: React.FC<PasswordChangeSectionProps> = ({
  formData,
  isChangingPassword,
  showPasswords,
  onInputChange,
  onTogglePasswordChange,
  onTogglePasswordVisibility,
}) => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 sm:p-6 rounded-xl border-l-4 border-yellow-400">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-semibold flex items-center">
          <Lock className="w-5 h-5 text-yellow-600 mr-2" />
          Password Settings
        </h3>
        <Button
          type="button"
          variant="outline"
          onClick={onTogglePasswordChange}
          className="text-xs sm:text-sm cursor-pointer"
        >
          {isChangingPassword ? "Cancel Password Change" : "Change Password"}
        </Button>
      </div>

      {isChangingPassword && (
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <PasswordField
            id="currentPassword"
            name="currentPassword"
            label="Current Password *"
            placeholder="Enter current password"
            value={formData.currentPassword}
            onChange={onInputChange}
            showPassword={showPasswords.current}
            onToggleVisibility={() => onTogglePasswordVisibility("current")}
            autoComplete="current-password"
          />

          <PasswordField
            id="newPassword"
            name="newPassword"
            label="New Password *"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={onInputChange}
            showPassword={showPasswords.new}
            onToggleVisibility={() => onTogglePasswordVisibility("new")}
            autoComplete="new-password"
          />

          <PasswordField
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="Confirm New Password *"
            placeholder="Confirm new password"
            value={formData.confirmNewPassword}
            onChange={onInputChange}
            showPassword={showPasswords.confirm}
            onToggleVisibility={() => onTogglePasswordVisibility("confirm")}
            autoComplete="new-password"
          />
        </div>
      )}
    </div>
  );
};
