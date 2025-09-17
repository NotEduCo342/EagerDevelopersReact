// Project-related types
export interface Project {
  id: string;
  addres: string; // Note: keeping original spelling for compatibility
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

// Form-related types
export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean; // New field for remember me functionality
}

export interface RegistrationFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface LogoutFormValues {
  allDevices?: boolean;
}

// Authentication-related types
export interface User {
  id: string; // Backend uses CUID (string), not number
  email: string;
  username: string;
  avatar?: string | null;
  isAdmin: boolean; // Backend has admin field
  failedLoginAttempts: number; // Backend security field
  lockedUntil?: string | null; // Backend lockout field (ISO string)
  lastLoginAt?: string | null; // Backend activity tracking
  lastActiveAt?: string | null; // Backend activity tracking
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  user: User;
  message: string;
}

export interface UserSession {
  id: string;
  userAgent?: string;
  ipAddress: string;
  location?: string;
  isActive: boolean;
  lastUsed: string;
  expiresAt: string;
}

// Component prop types
export interface ProjectCardProps {
  project: Project;
}

export interface PasswordStrengthMeterProps {
  password: string;
}

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Tech stack types
export interface TechItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

// Password criteria types
export interface PasswordCriterion {
  id: number;
  text: string;
  regex: RegExp;
}

// Navigation types
export interface NavLink {
  title: string;
  href: string;
  submenu?: SubMenuItem[];
}

export interface SubMenuItem {
  title: string;
  href: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Error types
export interface AppError {
  message: string;
  code?: string | number;
  details?: Record<string, unknown>;
}

// Animation variants for Framer Motion
export interface AnimationVariants {
  [key: string]: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      staggerChildren?: number;
    };
  };
}

// Theme types
export type ThemeMode = 'light' | 'dark';

// Language types
export type Language = 'fa' | 'en';

// Form field types
export type FormFieldType = 'text' | 'email' | 'password' | 'textarea' | 'select';

// Status types
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

// Component size variants
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

// Modal types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ComponentSize;
}

// Toast notification types
export interface ToastOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Event handler types
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;

// Social media link types
export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  label: string;
}

// Navigation footer link types
export interface FooterLink {
  title: string;
  href: string;
}

// Route types
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  protected?: boolean;
  title?: string;
  description?: string;
}

// Form validation types
export interface FormErrors {
  [field: string]: string;
}

// API error types
export interface ValidationError {
  field: string;
  message: string;
}

// Programming info types for the tree component
export interface ProgrammingInfo {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  position: 'left' | 'right';
}

// Error Boundary types
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorId: string | null;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  isolate?: boolean; // Whether this boundary should isolate errors
}

export interface ErrorFallbackProps {
  error: Error;
  errorInfo: React.ErrorInfo;
  resetError: () => void;
  errorId: string;
}

// Error logging types
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorLogEntry {
  id: string;
  message: string;
  stack?: string;
  severity: ErrorSeverity;
  timestamp: Date;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId?: string;
  additionalInfo?: Record<string, unknown>;
}

export interface ErrorLogger {
  logError: (error: Error, severity: ErrorSeverity, additionalInfo?: Record<string, unknown>) => string;
  logErrorBoundary: (error: Error, errorInfo: React.ErrorInfo, severity?: ErrorSeverity) => string;
}
