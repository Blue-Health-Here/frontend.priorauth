import React, { useState, useRef, useEffect } from "react";
import SummaryItem from "./summaryItem";

interface Pharmacy {
  id: string;
  firstName: string;
  lastName: string;
  pictureUrl?: string;
  phone: string;
  npi: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  location: string;
  prescriberCount?: number;
  totalRequests: number;
  approvedRequests: number;
  deniedRequests: number;
  pendingRequests: number;
  approvalRate?: number;
}

interface SummaryCardProps {
  pharmacy: Pick<
    Pharmacy,
    | "totalRequests"
    | "approvedRequests"
    | "deniedRequests"
    | "pendingRequests"
    | "approvalRate"
  >;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ pharmacy }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly"); // Changed default to Monthly
  const dropdownRef = useRef<HTMLDivElement>(null);

  const periods = ["Today", "Weekly", "Monthly", "Yearly"];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    setIsDropdownOpen(false);
  };

  if (!pharmacy) {
    return (
      <div className="p-4 text-red-500">Error: Pharmacy data not available</div>
    );
  }

  return (
    <div className="bg-primary-white rounded-lg border border-input-stroke p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-primary-black">Summary</h3>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="inline-flex justify-between items-center px-4 py-2 text-sm font-medium rounded-lg text-tabs-text border border-tabs-border bg-tabs-active-body"
            onClick={toggleDropdown}
          >
            {selectedPeriod}
            <svg
              className={`w-4 h-4 ml-2 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 w-full mt-1 origin-top-right bg-white rounded-lg shadow-lg z-10 border border-tabs-border overflow-hidden">
              <div className="py-1">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => handlePeriodSelect(period)}
                    className={`block w-full px-4 text-sm text-left transition-colors ${
                      selectedPeriod === period
                        ? "bg-tabs-active-body text-[#1E3A8A]"
                        : "hover:bg-tabs-active-body text-[#1E3A8A]"
                    }`}
                    style={{
                      paddingTop: "0.375rem", // 6px
                      paddingBottom: "0.375rem", // 6px
                      borderRadius: "0.5rem", // rounded-lg (8px)
                      margin: "0.125rem", 
                    }}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          )}{" "}
        </div>
      </div>

      <div className="space-y-2">
        <SummaryItem
          icon={<div className="w-7 h-7 rounded-md bg-quaternary-navy-blue flex items-center justify-center">
            <img src="/profile-email.svg" alt="Total" className="w-4 h-4" />
          </div>}
          label="Total Requests"
          value={pharmacy.totalRequests.toString()}
          status="neutral"
        />
        <SummaryItem
          icon={<div className="w-7 h-7 rounded-md bg-quaternary-navy-blue flex items-center justify-center">
            <img src="/approved.svg" alt="Approved" className="w-4 h-4" />
          </div>}
          label="Approved"
          value={`${pharmacy.approvedRequests}${
            pharmacy.approvalRate ? ` (${pharmacy.approvalRate}%)` : ""
          }`}
          status="approved"
        />
        <SummaryItem
          icon={<div className="w-7 h-7 rounded-md bg-quaternary-navy-blue flex items-center justify-center">
            <img src="/denied.svg" alt="Denied" className="w-4 h-4" />
          </div>}
          label="Denied"
          value={pharmacy.deniedRequests.toString()}
          status="denied"
        />
        <SummaryItem
          icon={<div className="w-7 h-7 rounded-md bg-quaternary-navy-blue flex items-center justify-center">
            <img src="/pending.svg" alt="Pending" className="w-4 h-4 bg-" />
          </div>}
          label="Pending"
          value={pharmacy.pendingRequests.toString()}
          status="pending"
        />
      </div>
    </div>
  );
};

export default SummaryCard;
