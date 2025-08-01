import { SelectFieldProps } from "@/app/common/types/types";
import React from "react";

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  icon,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 block">
        {icon}
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-md transition-all duration-200 bg-white ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        } focus:outline-none focus:ring-1 focus:ring-blue-500`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SelectField;
