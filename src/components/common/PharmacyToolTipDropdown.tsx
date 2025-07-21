import { NavLink } from "react-router-dom";
import React from "react";

interface PharmacyToolTipDropdownProps {
  isArchived?: boolean;
  onArchiveToggle?: (status: boolean) => void;
}

const PharmacyToolTipDropdown: React.FC<PharmacyToolTipDropdownProps> = ({ 
  isArchived, 
  onArchiveToggle 
}) => {
  return (
    <div className="absolute right-0 top-full border border-light-stroke w-40 md:w-44 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
      <NavLink
        to="/admin/pharmacies/modify"
        className={({ isActive }) =>
          `group flex w-full items-center gap-x-1.5 px-3 py-2 cursor-pointer transition font-secondary ${
            isActive
              ? "text-secondary-black"
              : "text-secondary-black hover:bg-gray-50"
          }`
        }
      >
        <img src="/modify.svg" alt="modify icon" className="w-4 h-4" />
        <span className="text-xs md:text-sm">Modify</span>
      </NavLink>

      <button
        className="group flex items-center w-full gap-x-1.5 px-3 py-2 text-sm cursor-pointer transition hover:bg-gray-50"
        onClick={() => onArchiveToggle && onArchiveToggle(!isArchived)}
      >
        <img 
          src={isArchived ? "/archive.svg" : "/archive.svg"} 
          alt={isArchived ? "unarchive icon" : "archive icon"} 
          className="w-4 h-4" 
        />
        <span className={`text-xs md:text-sm ${isArchived ? "text-primary-blue" : "text-[#FF2E37]"}`}>
          {isArchived ? "Unarchive" : "Archive"}
        </span>
      </button>
    </div>
  );
};

export default PharmacyToolTipDropdown;