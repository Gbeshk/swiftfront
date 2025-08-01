import React from 'react';
import { XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  error: string;
  onRetry?: () => void;
  onNavigateToSignIn?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ 
  error, 
  onRetry,
  onNavigateToSignIn 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col items-center justify-center space-y-4 px-4">
      <Alert className="max-w-lg w-full border-l-4 border-red-500 bg-red-50 text-red-800">
        <XCircle className="h-4 w-4" />
        <AlertDescription className="ml-2">{error}</AlertDescription>
      </Alert>
      
      <div className="flex space-x-4">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        )}
        
        {onNavigateToSignIn && (
          <Button
            onClick={onNavigateToSignIn}
            className="bg-red-600 hover:bg-red-700"
          >
            Go to Sign In
          </Button>
        )}
      </div>
    </div>
  );
};