import React, { useEffect, useRef, useState } from 'react';
import { PharmacyCardProps } from '../../../utils/types';
import { Link } from 'react-router-dom';
import PharmacyToolTipDropdown from '@/components/common/PharmacyToolTipDropdown';

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
    <div className="bg-primary-white rounded-xl shadow-xs p-4 sm:p-6 relative">
      <div className="flex flex-col gap-3">
        <div className='flex justify-between gap-2 items-center'>
          <div className='flex gap-2 items-center'>
            <Link to={`/admin/pharmacies/${pharmacy.id}/pharmacy-details`}>
              <img 
                src={pharmacy.pharmacyLogo || '/images/Abstergo Ltd..png'} 
                alt="" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl" 
              />
            </Link>
            <div>
              <Link to={`/admin/pharmacies/${pharmacy.id}/pharmacy-details`}>
                <h2 className='text-sm sm:text-base md:text-lg font-semibold text-primary-black leading-[110%]'>
                  {pharmacy.name}
                </h2>
              </Link>
              <span className='text-secondary-black text-xs sm:text-sm'>{pharmacy.phone}</span>
            </div>
          </div>
          
          <div ref={dropdownRef} className='relative'>
            <button 
              type='button' 
              className="rounded-lg p-2 sm:p-3 text-black cursor-pointer bg-secondary-background" 
              onClick={toggleDropdown}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            {isDropdownOpen && (
              <PharmacyToolTipDropdown />
            )}
          </div>
        </div>

        <div className="space-y-3 flex flex-wrap justify-between sm:justify-center gap-2 sm:gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;