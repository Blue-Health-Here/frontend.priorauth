import { Link } from "react-router-dom";
import PharmacyToolTipDropdown from "./common/PharmacyToolTipDropdown";
import React, { useEffect, useRef, useState } from "react";
import InfoColumn from "./common/InfoColumn";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatPrescriberToUsername } from "@/utils/helper";
import ThemeButton from "./common/ThemeButton";

interface PrescriberCardProps {
  prescriber: {
    id: string;
    prescriber: string;
    pharmacyLogo?: string;
    totalRequests?: number;
    prescriberPhone: string;
    npi: string;
    prescriberAddress: string;
    prescriberCity: string;
    isArchived: boolean;
  };
  isAdmin: boolean;
  onArchiveToggle: (id: string, status: boolean) => void;
  showUnarchiveButton: boolean;
  isArchivedView?: boolean; 
}

const PrescriberCard: React.FC<PrescriberCardProps> = ({ 
  prescriber, 
  isAdmin, 
  onArchiveToggle,
  showUnarchiveButton 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const pageLink = isAdmin 
    ? `/admin/prescribers/${formatPrescriberToUsername(prescriber.prescriber)}/prescriber-details` 
    : `/pharmacy/prescribers/${formatPrescriberToUsername(prescriber.prescriber)}/prescriber-details`;

  return (
    <div className="bg-primary-white rounded-lg theme-shadow p-4 relative border-2 border-[#EBEBEB] w-full max-w-full sm:max-w-md">
      <div className='inline-flex justify-between gap-2 items-start mb-4 w-full'>
        <div className='inline-flex gap-2 flex-col items-start'>
          <img
            src={prescriber?.pharmacyLogo || '/images/Abstergo Ltd..png'}
            alt="Pharmacy logo"
            className="w-9 h-9 sm:w-14 sm:h-14 rounded-lg"
          />
          <h2 className='text-sm sm:text-base md:text-lg font-semibold text-primary-black leading-[110%] mt-3'>
            {prescriber.prescriber}
          </h2>
        </div>

        <div ref={dropdownRef} className='relative'>
          <button
            type='button'
            className="rounded-lg p-1.5 text-black cursor-pointer bg-[#F5F5F5] hover:bg-[#EBEBEB]"
            onClick={toggleDropdown}
          >
            <BsThreeDotsVertical className="text-sm" />
          </button>
          {isDropdownOpen && (
            <PharmacyToolTipDropdown 
              isArchived={prescriber.isArchived}
              onArchiveToggle={(status) => onArchiveToggle(prescriber.id, status)}
            />
          )}
        </div>
      </div>

      <div className="md:hidden space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Total Requests</span>
          <span className="text-sm font-medium">{prescriber.totalRequests || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Phone</span>
          <span className="text-sm font-medium">{prescriber.prescriberPhone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">NPI</span>
          <span className="text-sm font-medium">{prescriber.npi}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Address</span>
          <span className="text-sm font-medium">{prescriber.prescriberAddress}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">City</span>
          <span className="text-sm font-medium">{prescriber.prescriberCity}</span>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-2 gap-4">
        <InfoColumn
          icon={<img src={showUnarchiveButton ? "/archive-total-requests.svg" : "/requests.svg"} alt="Requests" />}
          label="Total Requests"
          data={prescriber.totalRequests || "N/A"}
          isArchived={showUnarchiveButton}
        />
        <InfoColumn
          icon={<img src={showUnarchiveButton ? "/archive-npi.svg" : "/npi.svg"} alt="NPI" />}
          label="NPI"
          data={prescriber.npi}
          isArchived={showUnarchiveButton}
        />
        <InfoColumn
          icon={<img src={showUnarchiveButton ? "/archive-phone.svg" : "/phone.svg"} alt="Phone" />}
          label="Phone"
          data={prescriber.prescriberPhone}
          isArchived={showUnarchiveButton}
        />
        <InfoColumn
          icon={<img src={showUnarchiveButton ? "/archive-city.svg" : "/city.svg"} alt="City" />}
          label="City"
          data={prescriber.prescriberCity}
          isArchived={showUnarchiveButton}
        />
        <InfoColumn
          icon={<img src={showUnarchiveButton ? "/archive-address.svg" : "/address.svg"} alt="Address" />}
          label="Address"
          data={prescriber.prescriberAddress}
          className="col-span-2"
          isArchived={showUnarchiveButton}
        />
      </div>
      
      <div className="border-t border-[#EBEBEB] mt-4 -mx-4"></div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Link to={pageLink}>
          <ThemeButton variant="tertiary">View</ThemeButton>
        </Link>
        {showUnarchiveButton && (
          <ThemeButton 
            variant="primary" 
            className="bg-primary-navy-blue text-primary-white"
            onClick={() => onArchiveToggle(prescriber.id, false)}
          >
            Unarchive
          </ThemeButton>
        )}
      </div>
    </div>
  );
};

export default PrescriberCard;