import { Link } from "react-router-dom";
import PharmacyToolTipDropdown from "./common/PharmacyToolTipDropdown";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePhone } from "react-icons/hi2";
import InfoColumn from "./common/InfoColumn";
import { BsThreeDotsVertical } from "react-icons/bs";

const PrescriberCard: React.FC<any> = ({ prescriber, isAdmin, isDetails }) => {
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

    const pageLink = isAdmin ? `/admin/prescriber/${prescriber.prescriber.toLowerCase().trim()}/prescriber-details` : 
        `/pharmacy/prescriber/${prescriber.prescriber.toLowerCase().trim()}/prescriber-details`;

    return (
        <div className="bg-primary-white rounded-lg theme-shadow p-4 relative border-2 border-[#EBEBEB] w-full sm:w-[416px] max-w-full sm:max-w-md">
            <div className='flex justify-between items-start mb-4'>
                <div className='flex gap-4 items-start'>
                    <div className='flex flex-col'>
                        <Link to={pageLink}>
                            <img
                                src={prescriber?.pharmacyLogo || '/images/Abstergo Ltd..png'}
                                alt="Prescriber Logo"
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg"
                            />
                        </Link>
                        <Link to={pageLink}>
                            <h2 className='text-sm sm:text-base md:text-lg font-semibold text-primary-black leading-[110%] mt-3'>
                                {prescriber.prescriber}
                            </h2>
                        </Link>
                    </div>
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
                        <PharmacyToolTipDropdown />
                    )}
                </div>
            </div>

            {/* Mobile Layout - Single Column */}
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

            {/* Desktop Layout - Two Columns */}
            <div className="hidden md:grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <InfoColumn
                        icon={<img src="/requests.svg" alt="Requests" className="w-4 h-4" />}
                        label="Total Requests"
                        data={prescriber.totalRequests || "N/A"}
                    />
                    <InfoColumn
                        icon={<img src="/npi.svg" alt="NPI" className="w-4 h-4" />}
                        label="NPI"
                        data={prescriber.npi}
                    />
                    <InfoColumn
                        icon={<img src="/address.svg" alt="Address" className="w-4 h-4" />}
                        label="Address"
                        data={prescriber.prescriberAddress}
                    />
                </div>
                <div className="space-y-4">
                    <InfoColumn
                        icon={<HiOutlinePhone className="text-secondary-navy-blue" />}
                        label="Phone"
                        data={prescriber.prescriberPhone}
                    />
                    <InfoColumn
                        icon={<img src="/city.svg" alt="City" className="w-4 h-4" />}
                        label="City"
                        data={prescriber.prescriberCity}
                    />
                </div>
            </div>
            
            {/* Full-width horizontal separator with reduced spacing */}
            <div className="border-t border-[#EBEBEB] mt-4 -mx-4"></div>
            
            {/* View button with reduced padding and spacing */}
            <div className="flex justify-end px-4 pt-3">
                <button 
                    className="px-3 py-1 text-[#163066] border border-[#CBDAFF] rounded-lg hover:bg-[#F5F8FF] transition-colors font-medium text-sm" 
                >
                    View
                </button>
            </div>
        </div>
    );
};

export default PrescriberCard;