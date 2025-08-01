import { TermsCheckboxProps } from "@/app/common/types/types";
import React from "react";

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  accepted,
  onChange,
}) => {
  return (
    <div className="flex items-start space-x-2 pt-2">
      <input
        type="checkbox"
        id="acceptTerms"
        checked={accepted}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
      />
      <label
        htmlFor="acceptTerms"
        className="text-sm text-gray-600 cursor-pointer leading-5"
      >
        I accept the{" "}
        <a
          href="/terms"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Privacy Policy
        </a>
      </label>
    </div>
  );
};

export default TermsCheckbox;
