/**
 * TypeScript Type Definitions for Arunya Foundation
 */

/**
 * Loading Page Configuration Interface
 */
export interface ILoadingConfig {
  duration?: number;
  images?: string[];
  onComplete?: () => void;
  autoStart?: boolean;
}

/**
 * Brand Information
 */
export interface IBrand {
  name: string;
  tagline: string;
  description: string;
  logo: string;
}

/**
 * Navigation Item
 */
export interface INavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: INavItem[];
}

/**
 * Social Media Links
 */
export interface ISocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  github?: string;
}

/**
 * Contact Information
 */
export interface IContactInfo {
  email: string;
  phone: string;
  address: string;
}

/**
 * Team Member
 */
export interface ITeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: ISocialLinks;
}

/**
 * Project/Impact Item
 */
export interface IProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  impact: string;
  link?: string;
}

/**
 * Blog Post
 */
export interface IBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  readTime: number;
}

/**
 * Gallery Image
 */
export interface IGalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  category: string;
}

/**
 * API Response
 */
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: number;
}

/**
 * Pagination Info
 */
export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

/**
 * Paginated Response
 */
export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  pagination: IPagination;
}

/**
 * Form Data
 */
export interface IFormData {
  [key: string]: string | number | boolean | File | null;
}

/**
 * Form Error
 */
export interface IFormError {
  field: string;
  message: string;
}

/**
 * User/Member
 */
export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'volunteer' | 'guest';
  joinDate: string;
  bio?: string;
}

/**
 * Event
 */
export interface IEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  capacity: number;
  registered: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  link?: string;
}

/**
 * Donation
 */
export interface IDonation {
  id: string;
  amount: number;
  currency: string;
  donor: string;
  email: string;
  message?: string;
  date: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
}

/**
 * Statistics
 */
export interface IStatistics {
  totalDonations: number;
  totalBeneficiaries: number;
  projectsCompleted: number;
  volunteers: number;
  communities: number;
}

/**
 * Theme Colors
 */
export interface IThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  textLight: string;
  textMuted: string;
  glassBg: string;
  glassBorder: string;
  glassBorderBright: string;
  [key: string]: string;
}

/**
 * Animation Configuration
 */
export interface IAnimationConfig {
  duration: number;
  delay?: number;
  timingFunction?: string;
  repeat?: boolean;
  repeatCount?: number;
}

/**
 * Viewport Size
 */
export interface IViewportSize {
  width: number;
  height: number;
}

/**
 * Toast Notification
 */
export interface IToast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    callback: () => void;
  };
}

/**
 * Modal Configuration
 */
export interface IModalConfig {
  title: string;
  content: string;
  buttons?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }[];
  onClose?: () => void;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Logger Interface
 */
export interface ILogger {
  debug: (message: string, data?: any) => void;
  info: (message: string, data?: any) => void;
  warn: (message: string, data?: any) => void;
  error: (message: string, error?: Error | any) => void;
}

// Type definitions are exported above and used for type checking only
