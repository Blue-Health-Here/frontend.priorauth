import React, { useState } from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import InviteLinkModal from "@/pages/prescribers/InviteLinkModal";

interface PharmacyToolTipDropdownProps {
  onModify?: () => void;
  isArchived?: boolean;
  onArchiveToggle?: (status: boolean) => void;
  onGenerateCPA?: () => void;
  loadingGenerateCPA?: boolean;
  prescribers?: Array<{ id: string; name: string }>; // Add prescribers prop
}

const PharmacyToolTipDropdown: React.FC<PharmacyToolTipDropdownProps> = ({ 
  isArchived, 
  onArchiveToggle,
  onGenerateCPA,
  onModify, 
  loadingGenerateCPA,
  prescribers = [] // Default to empty array
}) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <>
      <div className="absolute right-0 top-full border border-light-stroke w-40 md:w-44 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
        {/* Modify Option */}
        <button
          className="group flex w-full items-center gap-x-1.5 px-3 py-2 cursor-pointer transition font-secondary text-secondary-black hover:bg-gray-50"
          onClick={() => onModify && onModify()}
        >
          <img src="/modify.svg" alt="modify icon" className="w-4 h-4" />
          <span className="text-xs md:text-sm">Modify</span>
        </button>

        {/* Generate CPA */}
        <button
          className="group flex w-full items-center gap-x-1.5 px-3 py-2 cursor-pointer transition font-secondary text-secondary-black hover:bg-gray-50"
          onClick={() => onGenerateCPA && onGenerateCPA()}
        >
          <img src="/generate-cpa.svg" alt="cpa icon" className="w-3 h-3" />
          <span className="text-xs md:text-sm">
            {loadingGenerateCPA ? "Generating..." : "Generate CPA"}
          </span>
        </button>
        
        <button
          className="group flex w-full items-center gap-x-1.5 px-3 py-2 cursor-pointer transition font-secondary text-secondary-black hover:bg-gray-50"
          onClick={() => setIsInviteModalOpen(true)}
        >
          <img src="/link (1).svg" alt="invite icon" className="w-4 h-4" />
          <span className="text-xs md:text-sm">Invite Link</span>
        </button>
        <div className="border-t border-light-stroke "></div>
        
        {/* Archive/Unarchive Option */}
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

      {/* Invite Link Modal */}
      {isInviteModalOpen && (
        <InviteLinkModal 
          onClose={() => setIsInviteModalOpen(false)} 
          prescribers={prescribers}
        />
      )}
    </>
  );
};

export default PharmacyToolTipDropdown;