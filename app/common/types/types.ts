export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  industry: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  country?: string;
  industry?: string;
}

export interface Message {
  type: "success" | "error" | "";
  text: string;
}

export interface SignUpResponse {
  message: string;
}

export interface ErrorResponse {
  message: string;
}

export interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  icon: React.ReactNode;
}

export interface PasswordFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  icon: React.ReactNode;
}

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  icon: React.ReactNode;
}

export interface MessageAlertProps {
  message: Message;
}

export interface TermsCheckboxProps {
  accepted: boolean;
  onChange: (accepted: boolean) => void;
}

export interface SubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}
export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignInFormErrors {
  email?: string;
  password?: string;
}

export interface Message {
  type: "success" | "error" | "";
  text: string;
}

export interface SignInResponse {
  token: string;
  status: string;
  message?: string;
}

export interface ErrorResponse {
  message: string;
}

export interface CompanyProfile {
  _id: string;
  name: string;
  email: string;
  country: string;
  industry: string;
  active: boolean;
  mode: string;
  subscriptionStartDate?: string;
  employees: string[];
  files: object[];
}

export interface ProfileFormData {
  name: string;
  country: string;
  industry: string;
  mode: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface PasswordVisibility {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

export interface ModeOption {
  value: string;
  label: string;
  color: string;
}

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  industry: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  country?: string;
  industry?: string;
}

export interface Message {
  type: "success" | "error" | "";
  text: string;
}

export interface SignUpResponse {
  message: string;
}

export interface ErrorResponse {
  message: string;
}

export interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  icon: React.ReactNode;
}

export interface PasswordFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  icon: React.ReactNode;
}

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  icon: React.ReactNode;
}

export interface MessageAlertProps {
  message: Message;
}

export interface TermsCheckboxProps {
  accepted: boolean;
  onChange: (accepted: boolean) => void;
}

export interface SubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignInFormErrors {
  email?: string;
  password?: string;
}

export interface SignInResponse {
  token: string;
  status: string;
  message?: string;
}

export type SignInMode = "company" | "employee";

export interface SignInInputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  icon: React.ReactNode;
}

export interface SignInPasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  icon: React.ReactNode;
}

export interface ModeToggleProps {
  signInMode: SignInMode;
  onModeChange: (mode: SignInMode) => void;
}

export interface SignInHeaderProps {
  signInMode: SignInMode;
}

export interface SignInMessageAlertProps {
  message: Message;
}

export interface SignInSubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export interface CompanyInfoSectionProps {
  profile: CompanyProfile;
}

export interface ProfileFormSectionProps {
  formData: ProfileFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export interface PasswordChangeSectionProps {
  formData: ProfileFormData;
  isChangingPassword: boolean;
  showPasswords: PasswordVisibility;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePasswordChange: () => void;
  onTogglePasswordVisibility: (field: keyof PasswordVisibility) => void;
}

export interface AdditionalInfoSectionProps {
  profile: CompanyProfile;
}

export interface ActionButtonsSectionProps {
  onSave: () => void;
  onNavigateToDashboard: () => void;
  saving: boolean;
  error: string;
  successMessage: string;
}
export interface SignInInputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  icon: React.ReactNode;
}

export interface SignInPasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  icon: React.ReactNode;
}

export interface ModeToggleProps {
  signInMode: SignInMode;
  onModeChange: (mode: SignInMode) => void;
}

export interface SignInHeaderProps {
  signInMode: SignInMode;
}

export interface SignInMessageAlertProps {
  message: Message;
}

export interface SignInSubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}
export interface DashCompanyProfile {
  _id: string;
  name: string;
  email: string;
  country: string;
  industry: string;
  active: boolean;
  mode: "free" | "basic" | "premium";
  subscriptionStartDate?: string;
  employees: { _id: string; name: string; email: string }[];
  files: DashCompanyFile[];
}

export interface DashCompanyFile {
  fileId: string;
  fileName: string;
  mimeType?: string;
  uploadedAt: string;
  size?: number;
}

export interface DashEmployeeFormData {
  name: string;
  email: string;
}

export interface DashSubscriptionLimits {
  maxFiles: number;
  maxEmployees: number | "unlimited";
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface DashPlanOption {
  name: string;
  mode: "free" | "basic" | "premium";
  price: string;
  priceDetail: string;
  maxFiles: number;
  maxEmployees: number | "unlimited";
  features: string[];
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  popular?: boolean;
}
export interface EmployeeFile {
  fileId: string;
  fileName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
}

export interface EmployeeDetail {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  active: boolean;
  files: EmployeeFile[];
  company: {
    _id: string;
    name: string;
  };
}

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  industry: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  country?: string;
  industry?: string;
}

export interface Message {
  type: "success" | "error" | "";
  text: string;
}

export interface SignUpResponse {
  message: string;
}

export interface ErrorResponse {
  message: string;
}

export interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  icon: React.ReactNode;
}

export interface PasswordFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  icon: React.ReactNode;
}

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  icon: React.ReactNode;
}

export interface MessageAlertProps {
  message: Message;
}

export interface TermsCheckboxProps {
  accepted: boolean;
  onChange: (accepted: boolean) => void;
}

export interface SubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignInFormErrors {
  email?: string;
  password?: string;
}

export interface SignInResponse {
  token: string;
  status: string;
  message?: string;
}

export interface SignInInputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  icon: React.ReactNode;
}

export interface SignInPasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  icon: React.ReactNode;
}

export interface ModeToggleProps {
  signInMode: SignInMode;
  onModeChange: (mode: SignInMode) => void;
}

export interface SignInHeaderProps {
  signInMode: SignInMode;
}

export interface SignInMessageAlertProps {
  message: Message;
}

export interface SignInSubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export interface CompanyProfile {
  _id: string;
  name: string;
  email: string;
  country: string;
  industry: string;
  active: boolean;
  mode: string;
  subscriptionStartDate?: string;
  employees: string[];
  files: object[];
}

export interface ProfileFormData {
  name: string;
  country: string;
  industry: string;
  mode: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface PasswordVisibility {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

export interface ModeOption {
  value: string;
  label: string;
  color: string;
}

export interface CompanyInfoSectionProps {
  profile: CompanyProfile;
}

export interface ProfileFormSectionProps {
  formData: ProfileFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export interface PasswordChangeSectionProps {
  formData: ProfileFormData;
  isChangingPassword: boolean;
  showPasswords: PasswordVisibility;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePasswordChange: () => void;
  onTogglePasswordVisibility: (field: keyof PasswordVisibility) => void;
}

export interface AdditionalInfoSectionProps {
  profile: CompanyProfile;
}

export interface ActionButtonsSectionProps {
  onSave: () => void;
  onNavigateToDashboard: () => void;
  saving: boolean;
  error: string;
  successMessage: string;
}

export interface DashCompanyProfile {
  _id: string;
  name: string;
  email: string;
  country: string;
  industry: string;
  active: boolean;
  mode: "free" | "basic" | "premium";
  subscriptionStartDate?: string;
  employees: { _id: string; name: string; email: string }[];
  files: DashCompanyFile[];
}

export interface DashCompanyFile {
  fileId: string;
  fileName: string;
  mimeType?: string;
  uploadedAt: string;
  size?: number;
}

export interface DashEmployeeFormData {
  name: string;
  email: string;
}

export interface DashSubscriptionLimits {
  maxFiles: number;
  maxEmployees: number | "unlimited";
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface DashPlanOption {
  name: string;
  mode: "free" | "basic" | "premium";
  price: string;
  priceDetail: string;
  maxFiles: number;
  maxEmployees: number | "unlimited";
  features: string[];
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  popular?: boolean;
}
export interface EmployeeDetailFile {
  _id: string;
  fileId: string;
  fileName: string;
  mimeType?: string;
  uploadedAt: string;
  size?: number;
  whoCanSee?: string[];
}

export interface EmployeeDetailData {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  active: boolean;
  files: EmployeeDetailFile[];
  filesICanSee: EmployeeDetailFile[];
  company: {
    _id: string;
    name: string;
    mode?: "free" | "basic" | "premium";
    totalFiles?: number;
    files?: EmployeeDetailFile[];
  };
}

export interface CompanyEmployeeData {
  _id: string;
  name: string;
  email: string;
}

export interface FileCardProps {
  file: EmployeeDetailFile;
  showDelete?: boolean;
  onFileClick: (fileId: string) => void;
  onDeleteFile: (fileId: string, fileName: string) => void;
  deletingFileId: string | null;
}

export interface EmployeeInfoProps {
  employee: EmployeeDetailData;
  formatDate: (dateString: string) => string;
}

export interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFile: File | null;
  companyEmployees: CompanyEmployeeData[];
  selectedEmployeeIds: string[];
  uploading: boolean;
  canUploadFile: boolean;
  onEmployeeToggle: (employeeId: string) => void;
  onUpload: () => void;
  formatFileSize: (bytes?: number) => string;
  getFileIcon: (fileName?: string) => React.ReactNode;
}

export interface FileSectionProps {
  title: string;
  files: EmployeeDetailFile[];
  employee: EmployeeDetailData;
  showUploadButton?: boolean;
  showDeleteButtons?: boolean;
  onFileClick: (fileId: string) => void;
  onDeleteFile: (fileId: string, fileName: string) => void;
  onUploadClick?: () => void;
  deletingFileId: string | null;
  canUploadFile?: boolean;
  getRemainingFiles?: () => number;
  getPlanLimitMessage?: () => string;
  formatFileSize: (bytes?: number) => string;
  getFileIcon: (fileName?: string) => React.ReactNode;
  gradientColors: string;
  iconBgColor: string;
  iconColor: string;
}

export interface HeaderActionsProps {
  onBack: () => void;
  onLogout: () => void;
}
