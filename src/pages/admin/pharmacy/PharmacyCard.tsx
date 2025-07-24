import React, { useEffect, useRef, useState } from 'react';
import { PharmacyCardProps } from '../../../utils/types';
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import InfoColumn from '@/components/common/InfoColumn';
import { FiMail } from 'react-icons/fi';
// import PharmacyToolTipDropdown from '@/components/common/PharmacyToolTipDropdown';

const PharmacyCard: React.FC<PharmacyCardProps> = ({ pharmacy }) => {
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

  return (
    <div className="bg-primary-white rounded-lg theme-shadow p-4 relative border-2 border-[#EBEBEB] relative">
      <div className="flex flex-col gap-3">
        <div className='flex justify-between gap-2 items-start'>
          <div className='flex gap-2 items-center'>
            <Link to={`/admin/pharmacies/${pharmacy.id}/pharmacy-details`}>
              <img
                src={pharmacy.pictureUrl || '/images/Abstergo Ltd..png'}
                alt=""
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl"
              />
            </Link>
            <div>
              <Link to={`/admin/pharmacies/${pharmacy.id}/pharmacy-details`}>
                <h2 className='text-sm sm:text-base md:text-lg font-semibold text-primary-black leading-[110%]'>
                  {pharmacy.firstName + " " + pharmacy.lastName}
                </h2>
              </Link>
              <span className='text-secondary-black text-xs sm:text-sm'>{pharmacy.phone}</span>
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
            {/* {isDropdownOpen && (
              <PharmacyToolTipDropdown />
            )} */}
          </div>
        </div>

        {/* <div className="space-y-3 flex flex-wrap justify-between sm:justify-center gap-2 sm:gap-4">
          <div className='flex flex-col gap-1 sm:gap-2 items-center px-1'>
            <h2 className='text-error-clip text-xl sm:text-2xl font-semibold'>42</h2>
            <p className='text-quaternary-white text-xs sm:text-sm'>Denied Requests</p>
          </div>
          <div className='flex flex-col gap-1 sm:gap-2 items-center px-1'>
            <h2 className='text-success-chip text-xl sm:text-2xl font-semibold'>42</h2>
            <p className='text-quaternary-white text-xs sm:text-sm'>Approve Requests</p>
          </div>
          <div className='flex gap-1 sm:gap-2 items-center justify-between flex-1 sm:flex-initial px-1'>
            <p className='text-tertiary-white text-xs sm:text-sm'>Last Requests</p>
            <h2 className='text-base sm:text-lg text-tertiary-white font-semibold'>31/03/2025</h2>
          </div>
        </div> */}
        <div className="grid grid-cols-2 gap-4">
          <InfoColumn
            icon={<FiMail />}
            label="Email"
            data={pharmacy.email || "N/A"}
            className='col-span-2'
          />
          <InfoColumn
            icon={<img src="/npi.svg" alt="NPI" />}
            label="NPI"
            data={pharmacy.npi}
          />
          <InfoColumn
            icon={<img src="/phone.svg" alt="Phone" />}
            label="Phone"
            data={pharmacy.phone}
          />
          <InfoColumn
            icon={<img src="/address.svg" alt="Address" />}
            label="Address"
            data={pharmacy.address}
            className="col-span-2"
          />
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;