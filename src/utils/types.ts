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
  showTagDropdown?: boolean
}

