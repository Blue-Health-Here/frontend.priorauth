import React from "react";

interface ProfileToolTipDropdownProps {
  // You can add props here if needed in the future
}

const ProfileToolTipDropdown: React.FC<ProfileToolTipDropdownProps> = () => {
  return (
    <div className="absolute right-0 top-full border border-light-stroke w-40 md:w-44 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
      {/* Modify Option */}
      <button
        className="group flex w-full items-center gap-x-1.5 px-3 py-2 cursor-pointer transition font-secondary text-secondary-black hover:bg-gray-50"
      >
        <img src="/modify.svg" alt="modify icon" className="w-4 h-4" />
        <span className="text-xs md:text-sm">Modify</span>
      </button>

      {/* Archive Option */}
      <button
        className="group flex w-full items-center gap-x-1.5 px-3 py-2 cursor-pointer transition font-secondary text-secondary-black hover:bg-gray-50"
      >
        <img 
          src="/archive (2).svg" 
          alt="archive icon" 
          className="w-4 h-4" 
        />
        <span className="text-xs md:text-sm">Archive</span>
      </button>

      <div className="border-t border-light-stroke"></div>

      {/* Delete Option */}
      <button
        className="group flex items-center w-full gap-x-1.5 px-3 py-2 text-sm cursor-pointer transition hover:bg-gray-50"
      >
        <img 
          src="/delete (2).svg" 
          alt="delete icon" 
          className="w-4 h-4" 
        />
        <span className="text-xs md:text-sm text-[#FF2E37]">
          Delete
        </span>
      </button>
    </div>
  );
};

export default ProfileToolTipDropdown;