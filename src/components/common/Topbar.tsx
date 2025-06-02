import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarProfileDropdown from './NavbarProfileDropdown';
import { handleLogout } from '../../services/authService';
import { getPageTitle } from '../../utils/getPageTitle';
import { FaBars } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setIsSidebarOpen } from '../../store/features/global/globalSlice';
import NavbarNotificationDropdown from './NavbarNotificationDropdown';

const Topbar: React.FC = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.global);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const dispatch = useDispatch();

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
    if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
      setIsNotifDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 lg:left-[250px] xl:left-[260px] right-0 p-4 sm:p-3.5 z-60 bg-white border-b border-gray-100`}>
      <nav className={`flex justify-between items-center w-full`}>
        <div className='flex items-center'>
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black whitespace-nowrap">
            {pageTitle}
          </p>
        </div>
        <div className="hidden lg:block relative mx-2">
          <input
            type="text"
            placeholder="Search here"
            className="w-[180px] lg:w-[220px] xl:w-[280px] 2xl:w-[350px] pl-9 pr-3 py-1.5 sm:py-2 border border-medium-stroke rounded-lg text-sm focus:outline-none placeholder:text-tertiary-white"
          />
          <span className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500">
            <img src="/search-icon.svg" alt="search icon" />
          </span>
        </div>
        {<div className="flex justify-end items-center gap-4">
          <div className='relative' ref={notifDropdownRef}>
            <button type='button' onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)} 
              className="md:flex hidden cursor-pointer rounded-lg border border-light-stroke items-center p-2 sm:p-2.5">
              <p className='relative'>
                <img src="/notifications.svg" alt="notification" className='w-4 h-4 sm:h-6 sm:w-6' />
                <span className='absolute rounded-full w-2 h-2 bg-error-clip top-0.5 right-0.5'></span>
              </p>
            </button>
            {isNotifDropdownOpen && <NavbarNotificationDropdown />}
          </div>
          <div className='px-1 hidden lg:block rounded-lg border border-quaternary-navy-blue bg-quaternary-navy-blue' ref={dropdownRef}>
            <div className="flex gap-3 items-center relative cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <img src="/images/profile-image.png" alt="Profile" className='w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full' />
              <div className='hidden sm:block py-0.5'>
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
          
          <div className="lg:hidden block" onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}>
            <FaBars size={22} className='text-primary-sky-blue block lg:hidden' />
          </div>
        </div>}
      </nav>
    </div>
  );
};

export default Topbar;