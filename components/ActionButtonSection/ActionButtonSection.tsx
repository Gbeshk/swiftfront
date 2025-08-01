import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ActionButtonsSectionProps {
  onSave: () => void;
  onNavigateToDashboard: () => void;
  saving: boolean;
  error: string;
  successMessage: string;
}

interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  loadingText,
  text,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-14 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span>{loadingText}</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <span>{text}</span>
        </div>
      )}
    </Button>
  );
};

export const ActionButtonsSection: React.FC<ActionButtonsSectionProps> = ({
  onSave,
  onNavigateToDashboard,
  saving,
  error,
  successMessage,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <ActionButton
        onClick={onSave}
        disabled={saving}
        loading={saving}
        loadingText="Saving Changes..."
        text="Save Changes"
      />
      
      <ActionButton
        onClick={onNavigateToDashboard}
        disabled={saving}
        text="Continue to Dashboard"
      />

      {error && (
        <Alert className="border-l-4 border-red-500 bg-red-50 text-red-800">
          <XCircle className="h-4 w-4" />
          <AlertDescription className="ml-2">{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="border-l-4 border-green-500 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="ml-2">{successMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};