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
import { InputText } from "primereact/inputtext";

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
      } right-0 z-60 bg-navbar-bg border-b border-navbar-stroke flex`}
    >
      {/* Mobile View (lg:hidden) - Completely separate from desktop */}
      <div className="lg:hidden flex items-center justify-between w-full p-2 h-[100px]">
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <button
            onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
            className="flex-shrink-0 w-7 h-9 p-1.5 rounded-lg cursor-pointer"
          >
            <img
              src="/sidebar.svg"
              alt="Collapse sidebar"
              className="w-5 h-5"
            />
          </button>
          
          <div className="min-w-0 overflow-hidden">
            <BreadCrumb 
              className="!text-sm !font-semibold !text-primary-black !p-0 !border-0 !whitespace-nowrap overflow-hidden text-ellipsis" 
              model={breadcrumbItems} 
              separatorIcon={<HiOutlineSlash className="text-xs" />} 
            />
          </div>
        </div>

        <div className="flex items-center  flex-shrink-0">
          <div className="relative" ref={notifDropdownRef}>
            <button
              onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
              className="w-9 h-9 p-1.5 rounded-lg cursor-pointer"
            >
              <img
                src="/notifications.png"
                alt="notification"
                className="w-4.5 h-4.5"
              />
            </button>
            {isNotifDropdownOpen && <NavbarNotificationDropdown />}
          </div>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 p-1.5 rounded-lg cursor-pointer"
          >
            <img src="/moon.svg" alt="moon icon" className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Desktop View (hidden on mobile) - EXACTLY as it was originally */}
      <div className="hidden lg:flex items-center justify-between w-full p-3">
        <div className="flex items-center gap-2 flex-1">
          {isSidebarCollapsed && !isSidebarOpen && (
            <button
              onClick={() => dispatch(setIsSidebarCollapsed(false))}
              className="flex items-center justify-center w-9 h-9 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <img
                src="/sidebar.svg"
                alt="Expand sidebar"
                className="w-5 h-5 scale-[-1]"
              />
            </button>
          )}
          
          <BreadCrumb 
            className='!text-lg !sm:text-xl !font-semibold !text-primary-black !p-0 !border-0' 
            model={breadcrumbItems} 
            separatorIcon={<HiOutlineSlash />} 
          />
        </div>

        <div className="flex items-center justify-center flex-1">
          <div className="relative mx-2 w-[324px]">
            <InputText
              placeholder={"Search here"}
              className="!pl-10 !rounded-full !bg-input-bg !border-input-stroke !text-sm w-full"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <img src="/search-icon.svg" alt="search icon" className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-3.5 flex-1">
          <div className="relative" ref={notifDropdownRef}>
            <button
              onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
              className="flex items-center justify-between cursor-pointer rounded-lg border border-light-stroke p-2 w-10 h-10"
            >
              <img
                src="/notifications.png"
                alt="notification"
                className="w-5 h-5"
              />
              <span className='absolute rounded-full w-2 h-2 bg-error-clip top-0.5 right-0.5'></span>
            </button>
            {isNotifDropdownOpen && <NavbarNotificationDropdown />}
          </div>

          <div
            className="pl-1.5 pr-0.5 rounded-lg border border-quaternary-navy-blue bg-quaternary-navy-blue"
            ref={dropdownRef}
          >
            <div
              className="flex gap-1 items-center relative cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={userData.pictureUrl || "/images/profile-image.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="py-1 pl-1 pr-3">
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

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center cursor-pointer rounded-lg border border-light-stroke p-2 w-10 h-10"
          >
            {isDark ? (
              <img src="/sun.svg" alt="sun icon" className="w-5 h-5" />
            ) : (
              <img src="/theme-button.svg" alt="moon icon" className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;