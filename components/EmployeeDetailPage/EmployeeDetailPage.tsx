"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { FileSection } from "../FileSection/FileSection";
import { Alert, AlertDescription } from "../ui/alert";
import { useEffect, useRef, useState } from "react";
import {
  CompanyEmployeeData,
  EmployeeDetailData,
} from "@/app/common/types/types";
import {
  ArrowLeft,
  CheckCircle,
  File,
  FileText,
  User,
  XCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { UploadModal } from "../UploadModal/UploadModal";
import { HeaderActions } from "../HeaderActions/HeaderActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EmployeeInfo } from "../EmployeeInfo/EmployeeInfo";

export const EmployeeDetailPage: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [employee, setEmployee] = useState<EmployeeDetailData | null>(null);
  const [companyEmployees, setCompanyEmployees] = useState<
    CompanyEmployeeData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

  const CLOUDFRONT_BASE_URL =
    process.env.NEXT_PUBLIC_CLOUD_FRONT ||
    "https://d1nshd8pmp2wxx.cloudfront.net";

  const FILE_LIMITS = {
    free: 10,
    basic: 100,
    premium: 1000,
  };

  const ALLOWED_MIME_TYPES = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const getFileIcon = (fileName?: string) => {
    if (!fileName || typeof fileName !== "string") {
      return <FileText className="w-5 h-5 text-slate-500" />;
    }

    const extension = fileName.toLowerCase().split(".").pop();
    const iconClass = "w-5 h-5";

    switch (extension) {
      case "csv":
        return <File className={`${iconClass} text-emerald-600`} />;
      case "xls":
      case "xlsx":
        return <File className={`${iconClass} text-green-600`} />;
      default:
        return <FileText className={`${iconClass} text-slate-500`} />;
    }
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const clearMessages = () => {
    setError("");
    setSuccessMessage("");
  };

  const getTotalFiles = () => {
    if (!employee?.company) return 0;
    return employee.company.totalFiles ?? employee.company.files?.length ?? 0;
  };

  const canUploadFile = () => {
    if (!employee?.company) return false;
    const mode = employee.company.mode ?? "free";
    const totalFiles = getTotalFiles();
    return totalFiles < FILE_LIMITS[mode];
  };

  const getRemainingFiles = () => {
    if (!employee?.company) return 0;
    const mode = employee.company.mode ?? "free";
    const totalFiles = getTotalFiles();
    return Math.max(0, FILE_LIMITS[mode] - totalFiles);
  };

  const getPlanLimitMessage = () => {
    if (!employee?.company) return "No plan information available";
    const mode = employee.company.mode ?? "free";
    const totalFiles = getTotalFiles();
    return `${
      mode.charAt(0).toUpperCase() + mode.slice(1)
    } plan: ${totalFiles}/${
      FILE_LIMITS[mode]
    } files used (${getRemainingFiles()} remaining)`;
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    router.push("/sign-in");
  };

  const fetchEmployeeDetails = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/sign-in");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/emploee/current`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Failed to load employee details");
        setLoading(false);
        return;
      }

      const data: EmployeeDetailData = await res.json();
      setEmployee(data);
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      setError("Network error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyEmployees = async () => {
    const token = Cookies.get("authToken");
    if (!token || !employee?.company?._id) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/company/${employee.company._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Failed to load company employees");
        return;
      }

      const data = await res.json();
      const employees: CompanyEmployeeData[] = Array.isArray(data.employees)
        ? data.employees
        : [];
      setCompanyEmployees(
        employees.filter((emp: CompanyEmployeeData) => emp._id !== employee._id)
      );
    } catch (fetchError) {
      console.error("Fetch company employees error:", fetchError);
      setError("Network error occurred while fetching company employees.");
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, [router]);

  useEffect(() => {
    if (employee) {
      fetchCompanyEmployees();
    }
  }, [employee]);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return `File ${file.name} has an unsupported type. Allowed types: CSV, XLS, XLSX`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File ${file.name} exceeds 10MB limit`;
    }
    if (!canUploadFile()) {
      return `Cannot upload file: Company has reached its ${
        employee?.company.mode || "free"
      } plan limit of ${FILE_LIMITS[employee?.company.mode || "free"]} files`;
    }
    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setSelectedEmployeeIds([]);
    setShowUploadModal(true);
  };

  const handleEmployeeToggle = (employeeId: string) => {
    setSelectedEmployeeIds((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleUploadFile = async () => {
    if (!selectedFile || !employee) return;

    const token = Cookies.get("authToken");
    if (!token) {
      setError("Authentication token missing. Please sign in again.");
      return;
    }

    if (!canUploadFile()) {
      setError(
        `Cannot upload file: Company has reached its ${
          employee.company.mode || "free"
        } plan limit of ${FILE_LIMITS[employee.company.mode || "free"]} files`
      );
      return;
    }

    setUploading(true);
    clearMessages();

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("whoCanSee", JSON.stringify(selectedEmployeeIds));

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/emploee/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Failed to upload file");
        return;
      }

      await fetchEmployeeDetails();

      setSuccessMessage("File uploaded successfully!");
      setSelectedFile(null);
      setSelectedEmployeeIds([]);
      setShowUploadModal(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (networkError) {
      console.error("Upload error:", networkError);
      setError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileClick = (fileId: string) => {
    window.open(`${CLOUDFRONT_BASE_URL}${fileId}`, "_blank");
  };

  const handleDeleteFile = async (fileId: string, fileName: string) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${fileName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    const token = Cookies.get("authToken");
    if (!token) {
      setError("Authentication token missing. Please sign in again.");
      return;
    }

    setDeletingFileId(fileId);
    clearMessages();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/emploee/files/${encodeURIComponent(fileId)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Failed to delete file");
        return;
      }

      const result = await res.json();

      setEmployee((prev) =>
        prev
          ? {
              ...prev,
              files: prev.files.filter((file) => file.fileId !== fileId),
              filesICanSee: prev.filesICanSee.filter(
                (file) => file.fileId !== fileId
              ),
              company: {
                ...prev.company,
                totalFiles: Math.max(
                  0,
                  (prev.company.totalFiles ?? prev.company.files?.length ?? 0) -
                    1
                ),
                files:
                  prev.company.files?.filter(
                    (file) => file.fileId !== fileId
                  ) ?? [],
              },
            }
          : prev
      );

      setSuccessMessage(
        `File "${result.fileName || fileName}" deleted successfully!`
      );
    } catch (networkError) {
      console.error("Delete error:", networkError);
      setError("Network error occurred. Please try again.");
    } finally {
      setDeletingFileId(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setSelectedEmployeeIds([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (error && !employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col items-center justify-center space-y-4 px-4">
        <Alert className="max-w-lg w-full border-l-4 border-red-500 bg-red-50 text-red-800">
          <XCircle className="h-4 w-4" />
          <AlertDescription className="ml-2">{error}</AlertDescription>
        </Alert>
        <div className="flex space-x-3">
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (!employee) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <UploadModal
        isOpen={showUploadModal}
        onClose={handleCloseUploadModal}
        selectedFile={selectedFile}
        companyEmployees={companyEmployees}
        selectedEmployeeIds={selectedEmployeeIds}
        uploading={uploading}
        canUploadFile={canUploadFile()}
        onEmployeeToggle={handleEmployeeToggle}
        onUpload={handleUploadFile}
        formatFileSize={formatFileSize}
        getFileIcon={getFileIcon}
      />

      <main className="max-w-6xl mx-auto p-6 pt-24 space-y-8">
        <HeaderActions onBack={() => router.back()} onLogout={handleLogout} />

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center space-x-3 text-2xl font-bold">
              <User className="w-7 h-7" />
              <span>Employee Profile</span>
            </CardTitle>
            <CardDescription className="text-blue-100">
              {employee.name} - File Management Dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 p-8">
            <EmployeeInfo employee={employee} formatDate={formatDate} />

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept=".csv,.xls,.xlsx"
            />

            <FileSection
              title="My Uploaded Files"
              files={employee.files}
              employee={employee}
              showUploadButton={true}
              showDeleteButtons={true}
              onFileClick={handleFileClick}
              onDeleteFile={handleDeleteFile}
              onUploadClick={handleUploadClick}
              deletingFileId={deletingFileId}
              canUploadFile={canUploadFile()}
              getRemainingFiles={getRemainingFiles}
              getPlanLimitMessage={getPlanLimitMessage}
              formatFileSize={formatFileSize}
              getFileIcon={getFileIcon}
              gradientColors="bg-gradient-to-r from-indigo-50 to-purple-50"
              iconBgColor="bg-indigo-100"
              iconColor="text-indigo-600"
            />

            <FileSection
              title="Files Shared With Me"
              files={employee.filesICanSee}
              employee={employee}
              showUploadButton={false}
              showDeleteButtons={false}
              onFileClick={handleFileClick}
              onDeleteFile={handleDeleteFile}
              deletingFileId={deletingFileId}
              formatFileSize={formatFileSize}
              getFileIcon={getFileIcon}
              gradientColors="bg-gradient-to-r from-teal-50 to-cyan-50"
              iconBgColor="bg-teal-100"
              iconColor="text-teal-600"
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
                <AlertDescription className="ml-2">
                  {successMessage}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
