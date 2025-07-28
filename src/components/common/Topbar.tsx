import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarProfileDropdown from './NavbarProfileDropdown';
import { handleLogout } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setIsSidebarCollapsed, setIsSidebarOpen } from '../../store/features/global/globalSlice';
import NavbarNotificationDropdown from './NavbarNotificationDropdown';
import { BreadCrumb } from 'primereact/breadcrumb';
import { generateBreadcrumbItems } from '@/utils/helper';
import { HiOutlineSlash } from "react-icons/hi2";
import { useTheme } from "@/hooks/useTheme";

interface UserData {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  pictureUrl: string | null;
}

const Topbar: React.FC<any> = ({ isAdmin }) => {
  const { isSidebarOpen, isSidebarCollapsed } = useSelector((state: RootState) => state.global);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    pictureUrl: null
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedData = JSON.parse(storedUser);
        setUserData({
          userName: parsedData.userName || '',
          email: parsedData.email || '',
          firstName: parsedData.firstName || '',
          lastName: parsedData.lastName || '',
          pictureUrl: parsedData.pictureUrl || null
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
    if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
      setIsNotifDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const breadcrumbItems = generateBreadcrumbItems(location.pathname);

  return (
    <div
      className={`fixed top-0 left-0 ${
        isSidebarCollapsed ? "lg:left-[80px]" : "lg:left-[280px]"
      } right-0 p-3 min-h-16 sm:p-3 z-60 bg-primary-white border-b border-gray-100 flex`}
    >
      <nav className={`flex justify-between w-full flex-1`}>
        <div className="flex items-center gap-2 flex-1">
          {isSidebarCollapsed && !isSidebarOpen && (
            <button
              onClick={() => dispatch(setIsSidebarCollapsed(false))}
              className="hidden lg:flex items-center justify-center w-9 h-9 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <img
                src="/sidebar.svg"
                alt="Expand sidebar"
                className="w-5 h-5 scale-[-1]"
              />
            </button>
          )}
          <div
            className="lg:hidden block"
            onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
          >
            <img
              src="/sidebar.svg"
              alt="Collapse sidebar"
              className="w-8 h-8 p-1.5 rounded-lg cursor-pointer"
            />
          </div>
          
          <BreadCrumb className='!text-lg !sm:text-xl !font-semibold !text-primary-black !p-0 !border-0' 
            model={breadcrumbItems} separatorIcon={<HiOutlineSlash />} />
        </div>
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="relative mx-2 w-[324px]">
            <input
              type="text"
              placeholder="Search here"
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-100 rounded-full text-sm focus:outline-none placeholder:text-[#9E9E9E] h-[40px]"
              style={{ lineHeight: "1.5" }}
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <img src="/search-icon.svg" alt="search icon" className="w-4 h-4" />
            </span>
          </div>
        </div>
        <div className="flex justify-end items-center gap-3.5 flex-1">
          <div className="relative h-full" ref={notifDropdownRef}>
            <button
              type="button"
              onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
              className="flex items-center justify-between cursor-pointer h-full rounded-lg border relative border-light-stroke items-center p-2 w-10 py-1 px-2 sm:p-2.5"
            >
              <img
                src="/notifications.png"
                alt="notification"
                className="w-4 h-4 sm:h-5 sm:w-5"
              />
              <span className='absolute hidden md:inline rounded-full w-2 h-2 bg-error-clip top-0.5 right-0.5'></span>
            </button>
            {isNotifDropdownOpen && <NavbarNotificationDropdown />}
          </div>

          <div
            className="pl-1.5 pr-0.5 hidden lg:block rounded-lg border border-quaternary-navy-blue bg-quaternary-navy-blue"
            ref={dropdownRef}
          >
            <div
              className="flex gap-1 items-center relative cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={userData.pictureUrl || "/images/profile-image.png"}
                alt="Profile"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
              />
              <div className="hidden sm:block py-1 pl-1 pr-3">
                <h2 className="text-primary-black font-semibold text-sm">
                  {userData.userName || `${userData.firstName} ${userData.lastName}`.trim() || 'User'}
                </h2>
                <p className="text-secondary-black text-xs">
                  {userData.email || 'No email'}
                </p>
              </div>
              <img
                src="/profile_chevron_down.svg"
                alt="Toggle dropdown"
                className="w-4 h-4 ml-[-4px]"
              />
            </div>
            {isDropdownOpen && (
              <NavbarProfileDropdown
                isAdmin={isAdmin}
                onClose={() => {
                  handleLogout();
                  navigate("/login");
                }}
              />
            )}
          </div>

          {/* Theme toggle button - added after profile section */}
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden lg:flex items-center justify-center cursor-pointer h-full rounded-lg border border-light-stroke p-2 w-10 py-1 px-2 sm:p-2.5"
          >
            {isDark ? <img src="/sun.svg" alt="sun icon" className="w-4 h-4 sm:h-5 sm:w-5" /> : 
              <img src="/theme-button.svg" alt="moon icon" className="w-4 h-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;