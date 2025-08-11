import React from "react";
import InfoColumn from "@/components/common/InfoColumn";
import { BsThreeDotsVertical } from "react-icons/bs";
import ThemeButton from "@/components/common/ThemeButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { getUserRequests } from "@/services/adminService";
import { useNavigate } from "react-router-dom";

interface PharmacyCardProps {
  pharmacy: {
    id: string;
    firstName: string;
    lastName: string;
    pictureUrl?: string;
    isActive?: boolean;
    totalRequests?: number;
    approvedPercent?: number;
    deniedPercent?: number;
    pendingPercent?: number;
    phone: string;
    npi: string;
    address: string;
    city: string;
  };
  isAdmin: boolean;
  onModify: () => void;
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({
  pharmacy,
  isAdmin,
  onModify,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Fallback values if not provided in API
  const totalRequests = pharmacy.totalRequests ?? 0;
  const approvedPercentage = pharmacy.approvedPercent ?? 0;
  const deniedPercentage = pharmacy.deniedPercent ?? 0;
  const pendingPercentage = pharmacy.pendingPercent ?? 0;

  const pageLink = isAdmin
    ? `/admin/pharmacies/${pharmacy.id}/pharmacy-details`
    : `/pharmacy/pharmacies/${pharmacy.id}/pharmacy-details`;

  const handleViewClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await getUserRequests(dispatch, pharmacy.id);
      navigate(pageLink, {
        state: {
          pharmacyData: pharmacy // Pass the entire pharmacy object
        }
      });
    } catch (error) {
      console.error("Failed to fetch user requests:", error);
      navigate(pageLink, {
        state: { pharmacyData: pharmacy } // Still pass data even if API fails
      });
    }
  };
  return (
    <div className="bg-primary-white rounded-lg relative border border-quaternary-navy-blue w-full">
      <div className="p-4">
        <div className='inline-flex justify-between gap-2 items-start mb-4 w-full'>
          <div className='inline-flex gap-1 flex-col items-start flex-1 min-w-0'>
            <img
              src={pharmacy?.pictureUrl || '/images/Abstergo Ltd..png'}
              alt="Pharmacy logo"
              className="w-9 h-9 sm:w-14 sm:h-14 rounded-full"
            />
            <div className="w-full min-w-0">
              <h2 className='text-sm sm:text-base md:text-lg font-semibold text-primary-black leading-[110%] uppercase mt-2 whitespace-nowrap overflow-hidden text-ellipsis w-full'>
                {pharmacy.firstName} {pharmacy.lastName}
              </h2>
            </div>
            <p className="text-secondary-black text-sm font-medium">{pharmacy.npi}</p>
          </div>

          <button
            type='button'
            className="rounded-lg p-2 text-black cursor-pointer bg-tabs-active-body hover:bg-tabs-active-body flex-shrink-0"
            onClick={onModify}
          >
            <BsThreeDotsVertical className="text-sm text-tabs-text" />
          </button>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/requests.svg" alt="Total" className="w-4 h-4" />
              <span className="text-sm text-gray-500">Total Requests</span>
            </div>
            <span className="text-sm font-medium">{totalRequests}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/approved.svg" alt="Approved" className="w-4 h-4" />
              <span className="text-sm text-gray-500">Approved</span>
            </div>
            <span className="text-sm font-medium">{approvedPercentage}%</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/denied.svg" alt="Denied" className="w-4 h-4" />
              <span className="text-sm text-gray-500">Denied</span>
            </div>
            <span className="text-sm font-medium">{deniedPercentage}%</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/pending.svg" alt="Pending" className="w-4 h-4" />
              <span className="text-sm text-gray-500">Pending</span>
            </div>
            <span className="text-sm font-medium">{pendingPercentage}%</span>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-2 gap-4">
          <InfoColumn
            icon={<img src="/requests.svg" alt="Requests" className="w-4 h-4" />}
            label="Total Requests"
            data={totalRequests}
          />
          <InfoColumn
            icon={<img src="/approved.svg" alt="Approved" className="w-4 h-4" />}
            label="Approved"
            data={`${approvedPercentage}%`}
          />
          <InfoColumn
            icon={<img src="/denied.svg" alt="Denied" className="w-4 h-4" />}
            label="Denied"
            data={`${deniedPercentage}%`}
          />
          <InfoColumn
            icon={<img src="/pending.svg" alt="Pending" className="w-4 h-4" />}
            label="Pending"
            data={`${pendingPercentage}%`}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 p-4 border-t border-quaternary-navy-blue">
        <ThemeButton
          variant="tertiary"
          onClick={handleViewClick}
        >
          View
        </ThemeButton>
      </div>
    </div>
  );
};

export default PharmacyCard;