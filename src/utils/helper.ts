import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { reqStatusOptions } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusStyle = (status: string) => {
  let statusClass =
    "px-3 py-1 rounded-full text-xs sm:text-sm lg:text-base font-seccondary";
  switch (status?.toLowerCase()) {
    case "pending":
      statusClass += " !bg-warning-chip-bg-color !text-warning-chip";
      break;
    case "approved":
      statusClass += " !bg-success-chip-bg-color !text-success-chip";
      break;
    case "rejected":
      statusClass += " !bg-error-chip-bg-color !text-error-chip";
      break;
    case "in progress":
      statusClass += " !bg-information-chip-bg-color !text-information-chip";
      break;
    case "completed":
      statusClass += " !bg-success-chip-bg-color !text-success-chip";
      break;
    case "cancelled":
      statusClass += " !bg-secondary-background !text-tertiary-black";
      break;
    default:
      statusClass += " !bg-gray-100 !text-gray-800";
  }
  return statusClass;
};

export const getStatusTextColor = (status: string) => {
  let statusClass = "";
  switch (status?.toLowerCase()) {
    case "pending":
      statusClass += " !text-warning-chip";
      break;
    case "approved":
      statusClass += " !text-success-chip";
      break;
    case "rejected":
      statusClass += " !text-error-chip";
      break;
    case "in progress":
      statusClass += " !text-information-chip";
      break;
    case "completed":
      statusClass += " !text-success-chip";
      break;
    case "cancelled":
      statusClass += " !text-tertiary-black";
      break;
    default:
      statusClass += " !text-gray-800";
  }
  return statusClass;
};

export const getReqBgStatusStyle = (status: string) => {
  let statusClass =
    "px-3 py-1 rounded-full text-xs sm:text-sm lg:text-base font-seccondary";
  switch (status?.toLowerCase()) {
    case reqStatusOptions[0].value:
      statusClass += " !bg-warning-chip-bg-color !text-warning-chip";
      break;
    case reqStatusOptions[1].value:
      statusClass += " !bg-success-chip-bg-color !text-success-chip";
      break;
    case reqStatusOptions[2].value:
      statusClass += " !bg-error-chip-bg-color !text-error-chip";
      break;
    case reqStatusOptions[3].value:
      statusClass += " !bg-information-chip-bg-color !text-information-chip";
      break;
    default:
      statusClass += " !bg-gray-100 !text-gray-800";
  }
  return statusClass;
};

export const getReqStatusTextColor = (status: string) => {
  let statusClass = "";
  switch (status?.toLowerCase()) {
    case reqStatusOptions[0].value:
      statusClass += " !text-warning-chip";
      break;
    case reqStatusOptions[1].value:
      statusClass += " !text-success-chip";
      break;
    case reqStatusOptions[2].value:
      statusClass += " !text-error-chip";
      break;
    case reqStatusOptions[3].value:
      statusClass += " !text-information-chip";
      break;
    default:
      statusClass += " !text-gray-800";
  }
  return statusClass;
};

export const getCurrentBadgeColors = (status?: string) => {
  let activeBadge = "";
  switch (status) {
    case "error":
      activeBadge = "text-status-error-text-color bg-status-error-bg-color";
      break;
    case "warning":
      activeBadge = "text-status-warning-text-color bg-status-warning-bg-color";
      break;
    default:
      activeBadge = "text-status-success-text-color bg-status-success-bg-color";
      break;
  }
  return activeBadge;
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Criteria Met":
      return "bg-green-100 text-green-700";
    case "Criteria Partially Met":
      return "bg-yellow-100 text-yellow-700";
    case "Criteria Not Met":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function formatNumberWithUnits(value: any, decimalPlaces = 1) {
  if (value < 1000) return value.toString();

  const units = ["k", "M", "B", "T"];
  let unitIndex = -1;

  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex++;
  }

  return `${parseFloat(value.toFixed(decimalPlaces))}${units[unitIndex]}`;
}

export function generateDatasetForCaseAnalysis(
  rows: number,
  cols: number,
  max = 2000
): number[][] {
  const dataset: number[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.floor(Math.random() * max) + 1); // 1 to max
    }
    dataset.push(row);
  }
  return dataset;
}

export const generateBreadcrumbItems = (pathname: string) => {
  const pathSegments = pathname
    .replace(/^\//, "")
    .split("/")
    .filter((segment) => segment);

  const allowedSegments = [
    "analytics",
    "requests",
    "request-details",
    "cmm-account-database",
    "pharmacies",
    "pharmacy-details",
    "permissions",
    "settings",
    "prescribers"
  ];

  const customLabels: Record<string, string> = {
    analytics: "Analytics",
    requests: "Requests",
    "request-details": "Request Details",
    "cmm-account-database": "CMM Account Database",
    pharmacies: "Pharmacies",
    "pharmacy-details": "Pharmacy Details",
    permissions: "Permissions",
    settings: "Settings",
    prescribers: "Prescribers",
    "prescriber-details": "Prescriber Details"
  };

  const items = pathSegments
    .filter((segment) => allowedSegments.includes(segment))
    .map((segment) => ({
      label:
        customLabels[segment] ||
        segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
    }));

  return items;
};

const STATUS_CLASS_MAP = [
  {
    keywords: ["APPROVED"],
    className: "bg-status-success-bg-color text-status-success-text-color",
  },
  {
    keywords: ["APPEAL", "REJECTED", "PROCESS_APPEAL", "QUEUED"],
    className: "bg-status-warning-bg-color text-status-error-text-color",
  },
  {
    keywords: ["NOT_ENROLLED", "ADDITIONAL_NOTES"],
    className: "bg-status-bg-lilac-sky text-status-text-lilac-sky",
  },
  {
    keywords: [
      "DENIED",
      "APPEAL-REJECTED",
      "AWAITING DENIAL LETTER",
      "DENIAL ALREADY ON FILE",
      "DENIED W/O PROGRESS NOTES",
      "DENIED-NEED DENIAL LETTER",
      "DENIED WITH PROGRESS NOTES",
      "DENIED - DENIAL LETTER RECEIVED",
      "DENIAL LETTER SENT TO MD BY INSURANCE",
    ],
    className: "bg-[#FEE2E2] text-[#B91C1C]",
  },
  {
    keywords: [
      "PA ON HOLD",
      "MEDICAID NY",
      "PLAN EXCLUSION",
      "PROCESS APPEAL",
      "PA CRITERIA NOT MET",
      "FAX FORM RECEIVED",
      "DUPLICATE PA REQUEST",
      "PROGRESS NOTES RECEIVED",
      "AWAITING FAX FORM FOR PA SUBMISSION",
    ],
    className: "bg-[#E2E8F0] text-[#1E293B]",
  },
  {
    keywords: [
      "ICD-10 CODE REQUIRED",
      "AWAITING PRESCRIBERS TAX ID",
      "NEED INS. NUMBER ON BACK OF PT. CARD",
      "PRESCRIBER'S TAX ID REQUIRED TO PROCEED",
      "AWAITING INS. NUMBER ON BACK OF PT. CARD",
      "PROCESSING",
      "INS. NUMBER ON BACK OF PT. CARD.",
      "PRESCRIBER’S TAX ID REQUIRED TO PROCEED"
    ],
    className: "bg-[#D1FAF9] text-[#0D9488]",
  },
  {
    keywords: [
      "PROGRESS NOTES REQUIRED",
      "NEED UPDATED PROGRESS NOTES",
      "UPDATED PROGRESS NOTES REQUIRED",
      "AWAITING PROGRESS NOTES FROM MD OFFICE",
    ],
    className: "bg-[#E0F2FE] text-[#0369A1]",
  },
  {
    keywords: [
      "INSURANCE CARD RECEIVED",
      "PATIENT INFORMATION MISSING – QUEUED FOR CALL",
      "PATIENT'S INSURANCE IS TERMINATED"
    ],
    className: "bg-[#E0E7FF] text-[#3730A3]",
  },
  {
    keywords: [
      "AWAITING SUBMISSION",
      "WORKING ON CLINICAL Q/A",
      "CASE PREPARED – AWAITING MD’S SUBMISSION",
    ],
    className: "bg-[#FFDDCF] text-[#92400E]",
  },
  {
    keywords: [
      "AWAITING APPEAL RESPONSE",
      "AWAITING INSURANCE RESPONSE",
      "FAX SENT – AWAITING INSURANCE RESPONSE",
    ],
    className: "bg-[#F3E8FF] text-[#6B21A8]",
  },
  {
    keywords: [
      "MEDICAL NECESSITY LETTER REQUIRED",
      "MEDICAL NECESSITY LETTER GENERATED",
      "(MNL) MEDICAL NECESSITY LETTER RECEIVED",
    ],
    className: "bg-[#FEF9C3] text-[#A16207]",
  },
  {
    keywords: [
      "NOT ENABLED FOR EPA",
      "ESI DOES NOT MANAGE THIS PATIENT",
      "ERROR IN INITIATION",
    ],
    className: "bg-[#FFFFC7] text-[#8E8106]",
  },
  {
    keywords: [
      "AWAITING MD’S SIGNATURE ON FAX FORM",
      "MEDICAL NECESSITY LETTER SENT FOR MD SIGNATURE",
    ],
    className: "bg-[#DBEAFE] text-[#1D4ED8]",
  },
  {
    keywords: [
      "EMR",
      "BENECARD",
      "PDMI CALL IN FORM",
      "LUVINIT CALL IN FORM",
      "SAV– RX CALL IN FORM",
      "DC-37 DRUG UNIT CALL IN FORM",
    ],
    className: "bg-[#D9F99D] text-[#3F6212]",
  },
  {
    keywords: [
      "COUPON USED",
      "CANCELLED BY MD",
      "CANCELLED BY PATIENT",
      "CANCELLED BY PHARMACY",
      "PA HANDLED INTERNALLY BY MD",
    ],
    className: "bg-[#FEE2F8] text-[#BE185D]",
  },
  {
    keywords: [
      "NOT ENROLLED IN THE BILLED PLAN",
      "PATIENT’S INSURANCE IS TERMINATED",
      "PRESCRIBER NOT ENROLLED/NPI NOT REGISTERED WITH INSURANCE",
    ],
    className: "bg-[#E0DEFF] text-[#2A1FB5]",
  },
];

export function getStatusClass(statusName = "") {
  const normalized = statusName.trim().toUpperCase();

  for (const entry of STATUS_CLASS_MAP) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.className;
    }
  }

  // Default fallback
  return "bg-default text-default";
}

export function transformPharmacyRequest(data: any) {
  return {
    id: data.id,
    patient: {
      name: data.patientName || 'Unknown Patient',
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" // static fallback
    },
    medication: data.medication || '-',
    prescriber: {
      name: data.prescriber || 'Unknown Prescriber',
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" // static fallback
    },
    submittedOn: data.createdAt?.split("T")[0] || '-', // Extract just the date
    request_status: data.statusId || '',
    statusName: data?.paStatus || '',
    notes: data.rejectionclaim || '–',
    lastModified: formatDateTime(data.createdAt), // Custom date formatting below
    statusClass: getStatusClass(data.statusId) // Assume you have this function elsewhere
  };
}

// Optional: Function to format ISO date into readable string
export function formatDateTime(isoString: string) {
  if (!isoString) return '-';
  const date = new Date(isoString);
  const options: any = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleString('en-US', options).replace(',', '');
}

export const groupRequestsByStatus = (data: any[], statuses: any[]) => {
  const grouped: any = {};

  data.forEach((item) => {
    const statusObj = statuses.find((s) => s.id === item.request_status);
    const statusName = statusObj?.name || 'Unknown';

    if (!grouped[statusName]) {
      grouped[statusName] = [];
    }

    grouped[statusName].push(item);
  });

  return Object.entries(grouped).map(([status, data]) => ({
    status,
    data,
  }));
};

export const groupByField = (data: any, fieldPath: any) => {
  const result: any = {};
  data.forEach((item: any) => {
    const value = fieldPath.includes('.')
      ? fieldPath.split('.').reduce((acc: any, key: any) => acc?.[key], item)?.name
      : fieldPath === "prescriber" || fieldPath === "patient" ? item[fieldPath].name : item[fieldPath];
    if (!result[value]) {
      result[value] = [];
    }
    result[value].push(item);
  });
  return Object.entries(result).map(([key, value]) => ({
    status: key,
    data: value
  }));
}

export const getFilterLabel = (field: string): string => {
  const labelMap: Record<string, string> = {
    'patient': 'Name',
    'medication': 'Medication',
    'prescriber': 'Prescriber',
    'statusName': 'Status',
    'submittedOn': 'Submitted On',
    'lastModified': 'Last Modified',
    'name': "Name",
    'officeEmail': 'Office Email',
    'officePassword': 'Office Password',
    'faxNumber': 'Fax Number',
    'contactPhone': 'Contact Phone',
    'cmmUsername': 'Cmm Username',
    'appPassword': 'App Password',
    'address': 'Address', 'city': 'City', 'state': 'State',
    'zipCode': 'Zip Code'
  };

  return labelMap[field] || field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

export const filterRequestsByStatus = (data: any, statusFilters: any) => {
  return data.map((group: any) => {
    const filteredData = group.data.filter((item: any) => statusFilters.includes(item.statusName));
    return {
      ...group,
      data: filteredData
    };
  }).filter((group: any) => group.data.length > 0); // remove groups with no matching items
}

export const transformRequestDetails = (data: any) => {
  return [
    {
      label: "Medication",
      data: [
        { label: "Medication Name",  value: data.medication },
        { label: "Rx Number", value: data.rxNumber || "-" },
        { label: "NDC", value: data.ndc || "-" },
        { label: "Days", value: data.days || "-" },
        { label: "Qty", value: data.qty || "-" },
        { label: "Medication Dosing", value: data.medicationDosing || "-" },
        { label: "Drug Dosage Form", value: data.drugDosageForm || "-" }
      ]
    },
    {
      label: "Patient",
      data: [
        { label: "Patient Name", value: data.patientName || "-" },
        { label: "Member ID", value: data.memberId || "-" },
        { label: "DOB", value: data.dob || "-" },
        { label: "Patient Address", value: data.patientAddress || "-" },
        { label: "Patient City", value: data.patientCity || "-" },
        { label: "Patient ZipCode", value: data.zipCode || "-" }
      ]
    },
    {
      label: "Insurance",
      data: [
        { label: "Insurance", value: data.insurance || "-" },
        { label: "FORM", value: data.form || "-" },
        { label: "Insurance Phone", value: data.insurancePhone || "-" },
        { label: "Help Desk Number", value: data.helpDeskNumber || "-" },
        { label: "PCN", value: data.pcn || "-" },
        { label: "BIN", value: data.bin || "-" },
        { label: "Group", value: data.group || "-" }
      ]
    },
    {
      label: "Prescriber",
      data: [
        { label: "Pharmacy", value: data.pharmacy || "-" },
        { label: "Prescriber", value: data.prescriber || "-" },
        { label: "NPI", value: data.npi || "-" },
        { label: "Prescriber Address", value: data.prescriberAddress || "-" },
        { label: "Prescriber City", value: data.prescriberCity || "-" },
        { label: "Prescriber ZipCode", value: data.prescriberZipCode || "-" },
        { label: "Prescriber Phone", value: data.prescriberPhone || "-" },
        { label: "Prescriber Fax", value: data.prescriberFax || "-" }
      ]
    }
  ];
};

export const timeAgo = (date: any) => {
  const dateObj = new Date(date);
  const diff = (Date.now() - dateObj.getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}