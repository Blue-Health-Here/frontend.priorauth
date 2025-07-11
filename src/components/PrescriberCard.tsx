import { Link } from "react-router-dom";
import PharmacyToolTipDropdown from "./common/PharmacyToolTipDropdown";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePhone } from "react-icons/hi2";
import InfoColumn from "./common/InfoColumn";
import { RiVipDiamondLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { PiCityLight } from "react-icons/pi";
import ThemeButton from "./common/ThemeButton";
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
        `/pharmacy/prescriber/${prescriber.prescriber.toLowerCase().trim()}/prescriber-details`

    return (
        <div className="bg-primary-white rounded-lg theme-shadow p-4 relative border-2 border-quaternary-navy-blue flex flex-col gap-4">
            <div className='inline-flex justify-between gap-2 items-start'>
                <div className='inline-flex gap-4 flex-col items-start'>
                    <Link to={pageLink}>
                        <img
                            src={prescriber?.pharmacyLogo || '/images/Abstergo Ltd..png'}
                            alt=""
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg"
                        />
                    </Link>
                    <Link to={pageLink}>
                        <h2 className='text-sm sm:text-base md:text-lg font-semibold text-primary-black leading-[110%]'>
                            {prescriber.prescriber}
                        </h2>
                    </Link>
                </div>

                <div ref={dropdownRef} className='relative'>
                    <button
                        type='button'
                        className="rounded-lg p-2 text-black cursor-pointer bg-secondary-background"
                        onClick={toggleDropdown}
                    >
                        <BsThreeDotsVertical />
                    </button>
                    {isDropdownOpen && (
                        <PharmacyToolTipDropdown />
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-between sm:justify-center gap-2 sm:gap-4">
                <InfoColumn
                    icon={<HiOutlinePhone className="text-secondary-navy-blue" />}
                    label="Phone"
                    data={prescriber.prescriberPhone}
                />
                <InfoColumn
                    icon={<RiVipDiamondLine className="text-secondary-navy-blue" />}
                    label="NPI"
                    data={prescriber.npi}
                />
                <InfoColumn
                    icon={<CiLocationOn className="text-secondary-navy-blue" />}
                    label="Address"
                    data={prescriber.prescriberAddress}
                />
                <InfoColumn
                    icon={<PiCityLight className="text-secondary-navy-blue" />}
                    label="City"
                    data={prescriber.prescriberCity}
                />
            </div>
            {isDetails && (
                <ThemeButton variant="secondary">
                    View Details
                </ThemeButton>
            )}
        </div>
    );
};

export default PrescriberCard;