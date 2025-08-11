import { Link } from "react-router-dom";
import PharmacyToolTipDropdown from "./common/PharmacyToolTipDropdown";
import React, { useEffect, useRef, useState } from "react";
import InfoColumn from "./common/InfoColumn";
import { BsThreeDotsVertical } from "react-icons/bs";
import ThemeButton from "./common/ThemeButton";
import { useTheme } from "@/hooks/useTheme";
import RequestsIcon from "./icons/RequestsIcon";
import { IoCloseOutline } from "react-icons/io5";
import { LuLoader } from "react-icons/lu";

interface PrescriberCardProps {
  prescriber: {
    id: string;
    prescriber: string;
    pictureUrl?: string;
    isActive?: boolean;
    totalRequests?: number;
    approvedPercent?: number;
    deniedPercent?: number;
    pendingPercent?: number;
    prescriberPhone: string;
    npi: string;
    prescriberAddress: string;
    prescriberCity: string;
    isArchived: boolean;
    active?: boolean;
  };
  isAdmin: boolean;
  onArchiveToggle: (id: any, status: boolean) => void;
  onModify: () => void;
  onGenerateCPA?: () => void;
  loadingGenerateCPA?: boolean;
  onInviteClick?: () => void;
}

const PrescriberCard: React.FC<PrescriberCardProps> = ({
  prescriber,
  isAdmin,
  onArchiveToggle,
  onModify,
  onGenerateCPA,
  loadingGenerateCPA,
  onInviteClick
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  // Fallback values if not provided in API
  const totalRequests = prescriber.totalRequests ?? 528;
  const approvedPercentage = prescriber.approvedPercent ?? 56;
  const deniedPercentage = prescriber.deniedPercent ?? 10;
  const pendingPercentage = prescriber.pendingPercent ?? 34;

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
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const pageLink = isAdmin
    ? `/admin/prescribers/${prescriber.id}/prescriber-details`
    : `/pharmacy/prescribers/${prescriber.id}/prescriber-details`;

  return (
    <div className="bg-primary-white rounded-lg relative border border-quaternary-navy-blue w-full">
      <div className="p-4">
        <div className='inline-flex justify-between gap-2 items-start mb-4 w-full'>
          <div className='inline-flex gap-1 flex-col items-start'>
            <img
              src={prescriber?.pictureUrl || '/images/Abstergo Ltd..png'}
              alt="Pharmacy logo"
              className="w-9 h-9 sm:w-14 sm:h-14 rounded-full"
            />
            <h2 className='text-sm sm:text-base md:text-lg font-semibold text-primary-black leading-[110%] uppercase mt-2'>
              {prescriber.prescriber}
            </h2>
            <p className="text-secondary-black text-sm font-medium">{prescriber.npi}</p>
          </div>

          <div ref={dropdownRef} className='relative'>
            <button
              type='button'
              className="rounded-lg p-2 text-black cursor-pointer bg-tabs-active-body hover:bg-tabs-active-body"
              onClick={toggleDropdown}
            >
              <BsThreeDotsVertical className="text-sm text-tabs-text" />
            </button>
            {isDropdownOpen && (
              <PharmacyToolTipDropdown
                isArchived={prescriber.isArchived}
                onModify={onModify}
                onArchiveToggle={() => {
                  onArchiveToggle(prescriber, false)
                  setIsDropdownOpen(false)
                }}
                onGenerateCPA={onGenerateCPA}
                loadingGenerateCPA={loadingGenerateCPA}
                onInviteClick={onInviteClick}
              />
            )}
          </div>
        </div>

        <div className="md:hidden space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Total Requests</span>
            <span className="text-sm font-medium">{totalRequests}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Approved</span>
            <span className="text-sm font-medium">{approvedPercentage}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Denied</span>
            <span className="text-sm font-medium">{deniedPercentage}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Pending</span>
            <span className="text-sm font-medium">{pendingPercentage}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Phone</span>
            <span className="text-sm font-medium">{prescriber.prescriberPhone}</span>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-4">
          <InfoColumn
            icon={<RequestsIcon color={isDark ? "#fff" : prescriber.isActive ? "#3961B2" : "#525252"} />}
            label="Total Requests"
            data={totalRequests}
            isArchived={!prescriber.isActive}
          />
          <InfoColumn
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.6666 4.33398L5.66659 11.6673L3.33325 9.33398"
                stroke={isDark ? "#fff" : !prescriber.isActive ? "#525252" : "#3961B2"}
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
            label="Approved"
            data={`${approvedPercentage}%`}
            isArchived={!prescriber.isActive}
          />
          <InfoColumn
            icon={<IoCloseOutline size={18} className={`${isDark ? "text-icon-group-icon" : !prescriber.isActive ? "#525252" : "text-icon-group-icon"}`} />}
            label="Denied"
            data={`${deniedPercentage}%`}
            isArchived={!prescriber.isActive}
          />
          <InfoColumn
            icon={<LuLoader size={16} className={`${isDark ? "text-icon-group-icon" : !prescriber.isActive ? "#525252" : "text-icon-group-icon"}`} />}
            label="Pending"
            data={`${pendingPercentage}%`}
            isArchived={!prescriber.isActive}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 p-4 border-t border-quaternary-navy-blue">
        <Link
          to={pageLink}
          state={{ prescriberName: prescriber.prescriber }}
        >
          <ThemeButton variant="tertiary">View</ThemeButton>
        </Link>
        {(!prescriber.isActive || !prescriber.active) && prescriber.isArchived && (
          <ThemeButton
            variant="primary"
            className="bg-primary-navy-blue text-primary-white"
            onClick={() => onArchiveToggle(prescriber, true)}
          >
            Unarchive
          </ThemeButton>
        )}
      </div>
    </div>
  );
};

export default PrescriberCard;