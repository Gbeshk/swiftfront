import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="relative h-16 w-16">
          <div className="animate-spin rounded-full h-full w-full border-4 border-slate-200"></div>
          <div className="animate-spin rounded-full h-full w-full border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
        </div>
        <div className="space-y-2">
          <p className="text-slate-700 text-xl font-semibold">
            Loading Employee Details
          </p>
          <p className="text-slate-500">
            Please wait while we fetch the information...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;