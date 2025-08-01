"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  CompanyProfile,
  PasswordVisibility,
  ProfileFormData,
} from "@/app/common/types/types";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { ProfileFormSection } from "../ProfileFormSection/ProfileFromSection";
import { CompanyInfoSection } from "../CompanyInfoSection/CompanyInfoSection";
import { PasswordChangeSection } from "../PasswordChangeSection/PasswordChangeSection";
import { ActionButtonsSection } from "../ActionButtonSection/ActionButtonSection";
import { AdditionalInfoSection } from "../AdditionalInfoSection/AdditionalInfoSection";

const PASSWORD_MIN_LENGTH = 8;

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showPasswords, setShowPasswords] = useState<PasswordVisibility>({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    country: "",
    industry: "",
    mode: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/sign-in");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/current-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          Cookies.remove("authToken");
          router.push("/sign-in");
          return;
        }

        if (!res.ok) {
          const err = await res.json();
          setError(err.message || "Failed to load profile");
          setLoading(false);
          return;
        }

        const data: CompanyProfile = await res.json();
        setProfile(data);
        setFormData({
          name: data.name,
          country: data.country,
          industry: data.industry,
          mode: data.mode,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setLoading(false);
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        setError("Network error occurred. Please check your connection.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMessage("");
    setError("");
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMessage("");
    setError("");
  };

  const togglePasswordVisibility = (field: keyof PasswordVisibility) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const togglePasswordChange = () => {
    setIsChangingPassword(!isChangingPassword);
    if (isChangingPassword) {
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    }
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return "Company name is required.";
    }

    if (!formData.country) {
      return "Country is required.";
    }

    if (!formData.industry) {
      return "Industry is required.";
    }

    if (isChangingPassword) {
      if (!formData.currentPassword) {
        return "Current password is required.";
      }
      if (!formData.newPassword) {
        return "New password is required.";
      }
      if (formData.newPassword.length < PASSWORD_MIN_LENGTH) {
        return `New password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        return "New passwords do not match.";
      }
      if (formData.currentPassword === formData.newPassword) {
        return "New password must be different from current password.";
      }
    }

    return null;
  };

  const handleSave = async () => {
    const token = Cookies.get("authToken");
    if (!token || !profile) {
      setError("Authentication token missing. Please sign in again.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSaving(false);
      return;
    }

    const updatePayload: {
      name: string;
      country: string;
      industry: string;
      mode: string;
      currentPassword?: string;
      password?: string;
    } = {
      name: formData.name.trim(),
      country: formData.country,
      industry: formData.industry,
      mode: formData.mode,
    };

    if (
      isChangingPassword &&
      formData.currentPassword &&
      formData.newPassword
    ) {
      updatePayload.currentPassword = formData.currentPassword;
      updatePayload.password = formData.newPassword;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatePayload),
      });

      if (res.status === 401) {
        Cookies.remove("authToken");
        router.push("/sign-in");
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Failed to update profile");
        setSaving(false);
        return;
      }

      setSuccessMessage(
        isChangingPassword
          ? "Profile and password updated successfully!"
          : "Profile updated successfully!"
      );

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: updatePayload.name,
              country: updatePayload.country,
              industry: updatePayload.industry,
              mode: updatePayload.mode,
            }
          : prev
      );

      if (isChangingPassword) {
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }));
        setIsChangingPassword(false);
      }
    } catch (networkError) {
      console.error("Network error:", networkError);
      setError("Network error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  if (loading) {
    return <LoadingSpinner message="Loading company profile..." />;
  }

  if (error && !profile) {
    return (
      <ErrorPage
        error={error}
        onNavigateToSignIn={() => router.push("/sign-in")}
      />
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <main className="max-w-4xl mx-auto p-6 pt-24">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-3 text-3xl font-bold">
              <Building2 className="w-8 h-8" />
              <span>Company Profile</span>
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Manage your company information and subscription details
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 p-8">
            <CompanyInfoSection profile={profile} />

            <ProfileFormSection
              formData={formData}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
            />

            <PasswordChangeSection
              formData={formData}
              isChangingPassword={isChangingPassword}
              showPasswords={showPasswords}
              onInputChange={handleInputChange}
              onTogglePasswordChange={togglePasswordChange}
              onTogglePasswordVisibility={togglePasswordVisibility}
            />

            <AdditionalInfoSection profile={profile} />

            <ActionButtonsSection
              onSave={handleSave}
              onNavigateToDashboard={navigateToDashboard}
              saving={saving}
              error={error}
              successMessage={successMessage}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfilePage;
