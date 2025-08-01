import { HeaderActionsProps } from "@/app/common/types/types";
import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  onBack,
  onLogout,
}) => {
  return (
    <div className="flex justify-between items-center">
      <Button
        onClick={onBack}
        variant="outline"
        className="bg-white/80 backdrop-blur-sm hover:bg-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go To Sign-in
      </Button>
      <Button
        onClick={onLogout}
        variant="outline"
        className="bg-white/80 backdrop-blur-sm hover:bg-white text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  );
};