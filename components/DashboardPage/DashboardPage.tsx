"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  DashCompanyProfile,
  DashEmployeeFormData,
} from "@/app/common/types/types";
import DashCard from "../DashCard/DashCard";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<DashCompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeForm, setEmployeeForm] = useState<DashEmployeeFormData>({
    name: "",
    email: "",
  });
  const [employeeError, setEmployeeError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [upgradingPlan, setUpgradingPlan] = useState<string | null>(null);

  const CLOUDFRONT_BASE_URL = process.env.NEXT_PUBLIC_CLOUD_FRONT || "";

  const fetchProfile = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/sign-in");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        Cookies.remove("authToken");
        router.push("/sign-in");
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to load dashboard");
      }

      const data: DashCompanyProfile = await res.json();
      setProfile(data);
    } catch (fetchError) {
      setError("Network error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const refetchProfile = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/sign-in");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        Cookies.remove("authToken");
        router.push("/sign-in");
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to refresh profile data");
      }

      const data: DashCompanyProfile = await res.json();
      setProfile(data);
    } catch (fetchError) {
      throw fetchError;
    }
  };

  const handleEmployeeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeForm((prev) => ({ ...prev, [name]: value }));
    setEmployeeError("");
    setSuccessMessage("");
  };

  const handleAddEmployee = async () => {
    if (!profile) return;

    const validationError = !employeeForm.name.trim()
      ? "Employee name is required."
      : !employeeForm.email.trim()
      ? "Employee email is required."
      : !/\S+@\S+\.\S+/.test(employeeForm.email)
      ? "Please enter a valid email address."
      : null;

    if (validationError) {
      setEmployeeError(validationError);
      return;
    }

    setSaving(true);
    setEmployeeError("");
    setSuccessMessage("");

    try {
      const token = Cookies.get("authToken");
      if (!token) throw new Error("Authentication token missing");

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/emploee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: employeeForm.name.trim(),
          email: employeeForm.email.trim(),
        }),
      });

      if (res.status === 401) {
        Cookies.remove("authToken");
        router.push("/sign-in");
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create employee");
      }

      const data = await res.json();
      setSuccessMessage(
        "Employee created successfully! A password setup email has been sent."
      );
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              employees: [
                ...prev.employees,
                {
                  _id: data.data._id,
                  name: data.data.name,
                  email: data.data.email,
                },
              ],
            }
          : prev
      );
      setEmployeeForm({ name: "", email: "" });
      setIsModalOpen(false);
    } catch (networkError) {
      setEmployeeError("Network error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;

    const token = Cookies.get("authToken");
    if (!token) {
      setError("Authentication token missing. Please sign in again.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/emploee/${employeeToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 401) {
        Cookies.remove("authToken");
        router.push("/sign-in");
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete employee");
      }

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              employees: prev.employees.filter(
                (emp) => emp._id !== employeeToDelete.id
              ),
            }
          : prev
      );
      setSuccessMessage("Employee deleted successfully!");
    } catch (networkError) {
      setError("Network error occurred. Please try again.");
    } finally {
      setSaving(false);
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
    }
  };

  const handleUpgradePlan = async (planMode: string) => {
    if (!profile) return;

    const token = Cookies.get("authToken");
    if (!token) {
      setError("Authentication token missing. Please sign in again.");
      return;
    }

    setUpgrading(true);
    setUpgradingPlan(planMode);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode: planMode }),
      });

      if (res.status === 401) {
        Cookies.remove("authToken");
        router.push("/sign-in");
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to upgrade plan");
      }

      await refetchProfile();
      setSuccessMessage(
        `Successfully upgraded to ${
          planMode.charAt(0).toUpperCase() + planMode.slice(1)
        } plan!`
      );
      setShowUpgradeModal(false);
    } catch (networkError) {
      setError("Network error occurred. Please try again.");
    } finally {
      setUpgrading(false);
      setUpgradingPlan(null);
    }
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    router.push("/sign-in");
  };

  const handleFileClick = (fileId: string) => {
    if (!CLOUDFRONT_BASE_URL) {
      setError("CloudFront URL is not configured. Please contact support.");
      return;
    }
    window.open(`${CLOUDFRONT_BASE_URL}${fileId}`, "_blank");
  };

  useEffect(() => {
    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
          <p className="text-slate-700 text-xl font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex flex-col items-center justify-center space-y-6 px-4">
        <div className="max-w-lg w-full border-l-4 border-red-500 bg-red-50 text-red-800 shadow-lg p-4 rounded-lg">
          <p className="ml-2 text-base">{error}</p>
        </div>
        <button
          onClick={() => router.push("/sign-in")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
      <main className="max-w-6xl mx-auto p-6 pt-24 space-y-8">
        <DashCard
          profile={profile}
          setProfile={setProfile}
          error={error}
          successMessage={successMessage}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          employeeForm={employeeForm}
          setEmployeeForm={setEmployeeForm}
          employeeError={employeeError}
          setEmployeeError={setEmployeeError}
          saving={saving}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          employeeToDelete={employeeToDelete}
          setEmployeeToDelete={setEmployeeToDelete}
          showUpgradeModal={showUpgradeModal}
          setShowUpgradeModal={setShowUpgradeModal}
          upgrading={upgrading}
          upgradingPlan={upgradingPlan}
          CLOUDFRONT_BASE_URL={CLOUDFRONT_BASE_URL}
          handleEmployeeInputChange={handleEmployeeInputChange}
          handleAddEmployee={handleAddEmployee}
          handleDeleteEmployee={handleDeleteEmployee}
          handleUpgradePlan={handleUpgradePlan}
          handleLogout={handleLogout}
          handleFileClick={handleFileClick}
        />
      </main>
    </div>
  );
};

export default DashboardPage;
