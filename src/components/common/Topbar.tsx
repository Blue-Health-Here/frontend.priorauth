import React, { useEffect, useRef, useState } from 'react';
// import { FaBars } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavbarProfileDropdown from './NavbarProfileDropdown';
import { handleLogout } from '../../services/authService';
import { getPageTitle } from '../../utils/getPageTitle';

const Topbar: React.FC = () => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 0);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

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
    <div className={`fixed top-0 left-[250px] xl:left-[260px] right-0 p-3.5 z-60 transition-all duration-300 bg-white border-b border-gray-100`}>
      <nav
        //  lg:pl-[264px] xl:pl-[276px]
        className={`topbar flex justify-between items-center transition-all duration-300 pl-0`}
      >
        <div className='hidden md:md:block'>
          <p className="text-lg md:text-xl lg:text-2xl font-semibold text-primary-black">
            {pageTitle}
          </p>
        </div>
        {/* <div className="md:hidden block">
          <FaBars size={22} className='text-primary-sky-blue block lg:hidden' />
        </div> */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search here"
            className=" w-full md:w-96 pl-10 pr-4 py-2 border border-medium-stroke rounded-lg text-xs md:text-sm focus:outline-none placeholder:text-tertiary-white"
          />
          <span className="absolute left-3 top-2.5 text-gray-500 cursor-pointer">
            <img src="/search-icon.svg" alt="search icon" />
          </span>
        </div>
        <div className="flex justify-end gap-4">
          <Link to="/admin/notifications" className="flex rounded-lg border border-light-stroke items-center p-2.5">
            <img src="/notifications.svg" alt="notification" className='h-6 w-6' />
          </Link>
          <div className='px-1 rounded-lg border border-light-stroke' ref={dropdownRef}>
            <div className="flex gap-3 items-center relative cursor-pointer" onClick={toggleDropdown}>
              <img src="/images/profile-image.png" alt="" className='w-10 h-10 rounded-full' />
              <div className='py-0.5'>
                <h2 className='text-primary-black font-bold'>John Doe</h2>
                <p className='text-secondary-black'>johndoe@mail.com</p>
              </div>
              <img src='/profile_chevron_down.svg' alt='profile chevron down' className='w-6 h-6' />
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
