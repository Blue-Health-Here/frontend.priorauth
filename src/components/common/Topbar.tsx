import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavbarProfileDropdown from './NavbarProfileDropdown';
import { handleLogout } from '../../services/authService';
import { getPageTitle } from '../../utils/getPageTitle';

const Topbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

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
    <div className={`fixed top-0 left-0 lg:left-[250px] xl:left-[260px] right-0 p-2 sm:p-3.5 z-60 bg-white border-b border-gray-100`}>
      <nav className={`flex justify-between items-center w-full`}>
        <div className='flex items-center'>
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black whitespace-nowrap">
            {pageTitle}
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:block relative mx-2">
            <input
              type="text"
              placeholder="Search here"
              className="w-[180px] lg:w-[220px] xl:w-[280px] 2xl:w-[350px] pl-9 pr-3 py-1.5 sm:py-2 border border-medium-stroke rounded-lg text-sm focus:outline-none placeholder:text-tertiary-white"
            />
            <span className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500">
              <img src="/search-icon.svg" alt="search icon" className="w-4 h-4" />
            </span>
          </div>

          <Link to="/admin/notifications" className="flex rounded-lg border border-light-stroke items-center p-2 sm:p-2.5">
            <img src="/notifications.svg" alt="notification" className='w-4 h-4 sm:w-5 sm:h-5' />
          </Link>

          <div className='rounded-lg border border-light-stroke' ref={dropdownRef}>
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer p-1 sm:p-1.5" onClick={toggleDropdown}>
              <img 
                src="/images/profile-image.png" 
                alt="Profile" 
                className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full' 
              />
              <div className='hidden sm:block'>
                <h2 className='text-primary-black font-bold text-sm md:text-base'>John Doe</h2>
                <p className='text-secondary-black text-xs md:text-sm'>johndoe@mail.com</p>
              </div>
              <img 
                src='/profile_chevron_down.svg' 
                alt='Toggle dropdown' 
                className='w-4 h-4 sm:w-5 sm:h-5' 
              />
            </div>
            {isDropdownOpen && (
              <NavbarProfileDropdown onClose={() => {
                handleLogout();
                navigate("/login");
              }} />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;