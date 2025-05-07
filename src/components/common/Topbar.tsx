import React, { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavbarProfileDropdown from './NavbarProfileDropdown';

const Topbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div className={`fixed top-0 left-0 right-0 p-4 z-60 transition-all duration-300 ${isScrolled ? 'bg-white border-b border-medium-stroke' : 'bg-transparent border-none'}`}>
      <nav
        className={`topbar flex justify-between items-center transition-all duration-300 pl-0 lg:pl-[264px] xl:pl-[276px]`}
      >
        <div className='hidden md:md:block'>
          <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-primary-black">Welcome back!</p>
          <p className='text-tertiary-black text-xs md:text-sm lg:text-base'>Dashboard</p>
        </div>
        <div className="md:hidden block">
          <FaBars size={22} className='text-primary-sky-blue block lg:hidden' />
        </div>
        <div className="flex justify-end items-center gap-x-4 pl-4 sm:pl-0 cursor-pointer">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className=" w-full md:w-96 pl-10 pr-4 py-2 border border-medium-stroke rounded-lg text-xs md:text-sm focus:outline-none placeholder:text-tertiary-white"
            />
            <span className="absolute left-3 top-2.5 text-gray-500 cursor-pointer">
              <img src="/search-icon.svg" alt="search icon" />
            </span>
          </div>
          <div className="border border-medium-stroke rounded-lg p-2 sm:block hidden">
            <Link to="/admin/notifications" className="cursor-pointer">
              <img src="/bell-icon.svg" alt="notification" className='h-5 w-5' />
            </Link>
          </div>
          <div className="relative" ref={dropdownRef}>

            <div
              onClick={toggleDropdown}
              className='rounded-full object-cover shadow-sm overflow-hidden w-9 h-9 md:w-12  md:h-12 flex items-center justify-center'>
              <img src="/images/profile-image.png" alt="" className='w-full h-full rounded-full' width={30} height={30} />
            </div>
            {isDropdownOpen && (
              <NavbarProfileDropdown onClose={() => setIsDropdownOpen(false)} />
            )}

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
