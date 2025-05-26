import React, { useEffect, useRef, useState } from 'react';
import { PharmacyCardProps } from '../../../utils/types';
import { Link } from 'react-router-dom';
import PharmacyToolTipDropdown from '../../../components/common/PharmacyToolTipDropdown';

const PharmacyCard: React.FC<PharmacyCardProps> = ({ pharmacy }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Function to toggle the dropdown
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
    <div className="bg-primary-white rounded-xl shadow-xs p-6 relative">
      <div className="flex flex-col gap-3">
        <div className='inline-flex justify-between gap-2 items-center'>
          <div className='inline-flex gap-2 items-center'>
            <Link to={`/admin/pharmacies/${pharmacy.id}`}>
              <img src={pharmacy.pharmacyLogo || '/images/Abstergo Ltd..png'} alt="" className="w-12 h-12 rounded-2xl" />
            </Link>
            <div>
              <Link to={`/admin/pharmacies/${pharmacy.id}`}>
                <h2 className='text-sm md:text-lg font-semibold text-primary-black leading-[110%]'>{pharmacy.name}</h2>
              </Link>
              <span className='text-secondary-black text-xs md:text-sm'>{pharmacy.phone}</span>
            </div>
          </div>
          
          <div ref={dropdownRef} className='relative'>
            <button type='button' className="rounded-lg p-3 text-black cursor-pointer bg-secondary-background" onClick={toggleDropdown}>
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

        <div className="space-y-3 flex flex-wrap justify-center gap-2">
          <div className='flex flex-col gap-2 items-center px-1'>
            <h2 className='text-error-clip text-2xl font-semibold'>42</h2>
            <p className='text-quaternary-white'>Denied Requests</p>
          </div>
          <div className='flex flex-col gap-2 items-center px-1'>
            <h2 className='text-success-chip text-2xl font-semibold'>42</h2>
            <p className='text-quaternary-white'>Approve Requests</p>
          </div>
          <div className='flex gap-2 items-center justify-between flex-1 px-1'>
            <p className='text-tertiary-white'>Last Requests</p>
            <h2 className='text-lg text-tertiary-white font-semibold'>31/03/2025</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;

