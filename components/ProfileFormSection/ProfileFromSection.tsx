import React from "react";
import { Globe, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModeOption, ProfileFormData } from "@/app/common/types/types";

interface ProfileFormSectionProps {
  formData: ProfileFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Georgia",
  "Germany",
  "France",
  "Japan",
  "South Korea",
  "Singapore",
  "Netherlands",
  "Sweden",
  "Switzerland",
  "Denmark",
  "Norway",
  "Finland",
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Real Estate",
  "Transportation",
  "Energy",
  "Agriculture",
  "Entertainment",
  "Consulting",
  "Marketing",
  "Construction",
  "Other",
];

const modes: ModeOption[] = [
  { value: "free", label: "Free", color: "text-gray-600" },
  { value: "basic", label: "Basic", color: "text-blue-600" },
  { value: "premium", label: "Premium", color: "text-purple-600" },
];

export const ProfileFormSection: React.FC<ProfileFormSectionProps> = ({
  formData,
  onInputChange,
  onSelectChange,
}) => {
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div className="space-y-2">
    <Label htmlFor="name" className="text-sm  font-semibold text-gray-800">
      Company Name <span className="text-red-500">*</span>
    </Label>
    <Input
      id="name"
      name="name"
      value={formData.name}
      onChange={onInputChange}
      className="h-12 border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg px-4"
      placeholder="Enter company name"
    />
  </div>

  <div className="space-y-2">
    <Label htmlFor="country" className="text-sm font-semibold text-gray-800">
      Country <span className="text-red-500">*</span>
    </Label>
    <Select
      value={formData.country}
      onValueChange={(value) => onSelectChange("country", value)}
    >
      <SelectTrigger className="h-12 border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg px-4 cursor-pointer">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent className="cursor-pointer">
        {countries.map((country) => (
          <SelectItem
            key={country}
            value={country}
            className="cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2 text-gray-500" />
              {country}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  <div className="space-y-2">
    <Label htmlFor="industry" className="text-sm font-semibold text-gray-800">
      Industry <span className="text-red-500">*</span>
    </Label>
    <Select
      value={formData.industry}
      onValueChange={(value) => onSelectChange("industry", value)}
    >
      <SelectTrigger className="h-12 border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg px-4 cursor-pointer">
        <SelectValue placeholder="Select an industry" />
      </SelectTrigger>
      <SelectContent className="cursor-pointer">
        {industries.map((industry) => (
          <SelectItem
            key={industry}
            value={industry}
            className="cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
              {industry}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  <div className="space-y-2">
    <Label htmlFor="mode" className="text-sm font-semibold text-gray-800">
      Subscription Mode
    </Label>
    <Select
      value={formData.mode}
      onValueChange={(value) => onSelectChange("mode", value)}
    >
      <SelectTrigger className="h-12 border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg px-4 cursor-pointer">
        <SelectValue placeholder="Select mode" />
      </SelectTrigger>
      <SelectContent className="cursor-pointer">
        {modes.map((mode) => (
          <SelectItem
            key={mode.value}
            value={mode.value}
            className="cursor-pointer hover:bg-gray-100"
          >
            <span className={`capitalize font-medium ${mode.color}`}>
              {mode.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</div>

  );
};
