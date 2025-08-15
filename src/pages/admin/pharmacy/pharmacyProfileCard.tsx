import React, { useRef, useState, useEffect } from "react";
import InfoColumn from "@/components/common/InfoColumn";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileToolTipDropdown from "./profileToolTipDropdown";

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
  isArchived?: boolean;
}

// Add this interface definition
interface PharmacyProfileCardProps {
  pharmacy: Pharmacy;
}

const PharmacyProfileCard: React.FC<PharmacyProfileCardProps> = ({
  pharmacy,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // const formatEmail = (email: string) => {
  //   if (!email) return "-";
  //   const atIndex = email.indexOf("@");
  //   if (atIndex === -1) return email;
  //   return `${email.substring(0, atIndex)}\n@${email.substring(atIndex + 1)}`;
  // };
  console.log(pharmacy, "pharmacy");

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

  return (
    <div className="bg-primary-white rounded-lg border border-navbar-stroke p-4 relative">
      <div className="flex justify-between gap-4">
        <div className="text-lg font-medium text-primary-black">
          Profile
        </div>

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            className="rounded-lg p-2 text-black cursor-pointer bg-tabs-active-body hover:bg-tabs-active-body"
            onClick={toggleDropdown}
          >
            <BsThreeDotsVertical className="text-sm text-tabs-text" />
          </button>
          {isDropdownOpen && <ProfileToolTipDropdown />}
        </div>
      </div>

      <div className="flex items-center py-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mr-2 overflow-hidden">
          <img
            src={pharmacy.pictureUrl || "/pharmacy-profile-logo.svg"}
            alt="Pharmacy logo"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-md font-bold text-primary-black">
            {pharmacy.firstName} {pharmacy.lastName}
          </h2>
          <p className="text-stroke-900 text-sm">{pharmacy.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <InfoColumn
          icon={
            <div className="w-7 h-7 rounded-md bg-quaternary-navy-blue flex items-center justify-center">
              <img src="/profile-email.svg" alt="Email" className="w-4 h-4 text-white" />
            </div>
          }
          label="Email"
          data={pharmacy.email}
          className="whitespace-pre-line"
        />

        <InfoColumn
          icon={
            <div className="w-7 h-7 rounded-md bg-quaternary-navy-blue flex items-center justify-center">
              <img src="/phone.svg" alt="Phone" className="w-4 h-4 text-white" />
            </div>
          }
          label="Phone Number"
          data={pharmacy.phone || "-"}
        />

        <InfoColumn
          icon={
            <div className="w-7 h-7 rounded-md bg-quaternary-navy-blue flex items-center justify-center">
              <img src="/prescribers.svg" alt="Prescribers" className="w-4 h-4 text-white" />
            </div>
          }
          label="No of Prescribers"
          data={pharmacy.prescriberCount?.toString() || "0"}
        />

        <InfoColumn
          icon={
            <div className="w-7 h-7 rounded-md bg-quaternary-navy-blue flex items-center justify-center">
              <img src="/profile-location.svg" alt="Location" className="w-4 h-4 text-white" />
            </div>
          }
          label="Location"
          data={pharmacy.location || "-"}
        />

        <InfoColumn
          icon={
            <div className="w-7 h-7 rounded-md bg-quaternary-navy-blue flex items-center justify-center">
              <img src="/address.svg" alt="Address" className="w-4 h-4 text-white" />
            </div>
          }
          label="Full Address"
          data={`${pharmacy.address || "-"}`}
          className="col-span-2"
        />
      </div>
    </div>
  );
};

export default PharmacyProfileCard;