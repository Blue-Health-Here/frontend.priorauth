import { ReactNode } from "react";

export interface Pharmacy {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  type?: string;
  pharmacyLogo?: string;
  phone?: string;
  phoneNumber?: string;
  lastRequests: {
    date: string;
    approved: number;
    denied: number;
  };
  firstName?: string;
  middleName?: string;
  lastName?: string;
  userName?: string;
  gender?: "other" | "male" | "female"; // You can adjust this based on other potential gender options
  pictureUrl?: string;
  dateOfBirth?: string; // Consider using Date type if you expect a valid date format
  status?: number;
  lastLogin?: string; // You can also change this to Date if it's a valid date
  lastOnline?: string; // Same as lastLogin, Date type might be more appropriate
  roleId?: string;
  roleCode?: string;
  companyId?: string;
  npi?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  faxNumber?: string;
  location?: string;
  active?: boolean;
  createdAt?: string; // Change to Date if you expect it to be a valid date
  createdBy?: string;
  createdById?: string;
}

export interface PharmacyCardProps {
  pharmacy: Pharmacy;
}

export interface DataTableProps {
  title: string;
  columns: any[];
  data: any[];
  location?: string;
  customHeader?: React.ReactNode;
  className?: string;
  paginator?: boolean;
  rows?: number;
  rowsPerPageOptions?: number[];
  isShadow?: boolean;
  customHeaderButtonText?: string;
  customHeaderButtonLink?: string;
  isPagination?: boolean;
  onStatusChange?: (rowData: any, newStatus: string) => void;
  headerComponent?: ReactNode
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  progress: number;
  url: string;
  status: "uploading" | "completed" | "error";
  fileTags: any[];
  showTagDropdown?: boolean;
  tag?: string;
}

export interface PasswordRequirement {
  label: string
  test: (password: string) => boolean
}

export type User = {
  roleCode: string;
};

export interface VncSession {
  sessionId: string;
  vncUrl: string;
  entityName: string;
};
