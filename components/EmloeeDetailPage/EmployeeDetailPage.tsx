"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, useParams } from "next/navigation";
import { EmployeeDetail } from "@/app/common/types/types";
import LoadingState from "../LoadingState/LoadingState";
import ErrorState from "../ErrorState/ErrorState";
import EmployeeHeader from "../EmployeeHeader/EmployeeHeader";
import EmployeeProfileCard from "../EmployeeProfileCard/EmployeeProfileCard";

const EmployeeDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const employeeId = params?.id as string;

  const [employee, setEmployee] = useState<EmployeeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const clearMessages = () => {
    setError("");
  };

  const fetchEmployeeDetails = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/sign-in");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/emploee/${employeeId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        Cookies.remove("authToken");
        router.push("/sign-in");
        return;
      }

      if (response.status === 404) {
        setError("Employee not found");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to load employee details");
        setLoading(false);
        return;
      }

      const data: EmployeeDetail = await response.json();
      setEmployee(data);
      setLoading(false);
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      setError("Network error occurred. Please check your connection.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!employeeId) {
      setError("Employee ID is required");
      setLoading(false);
      return;
    }

    fetchEmployeeDetails();
  }, [employeeId, router]);

  if (loading) {
    return <LoadingState />;
  }

  if (error && !employee) {
    return <ErrorState error={error} router={router} />;
  }

  if (!employee) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
      <EmployeeHeader router={router} />
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <EmployeeProfileCard
          employee={employee}
          error={error}
          clearMessages={clearMessages}
        />
      </main>
    </div>
  );
};

export default EmployeeDetailPage;
