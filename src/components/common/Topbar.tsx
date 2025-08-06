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

  const breadcrumbItems = generateBreadcrumbItems(location.pathname, location.state);

  return (
    <div
      className={`fixed top-0 left-0 ${
        isSidebarCollapsed ? "lg:left-[80px]" : "lg:left-[280px]"
      } right-0 z-60 bg-navbar-bg border-b border-navbar-stroke flex`}
    >
      {/* Mobile View (lg:hidden) - Completely separate from desktop */}
      <div className="lg:hidden flex items-center justify-between w-full p-2 h-[60px]">
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <button
            onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
            className="flex-shrink-0 w-8 h-10 p-1.5 rounded-lg cursor-pointer"
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
            {isDark ? (
              <img src="/sun.svg" alt="sun icon" className="w-4.5 h-4.5" />
            ) : (
              <img src="/theme-button.svg" alt="moon icon" className="w-4.5 h-4.5" />
            )}
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
              className="flex items-center justify-between cursor-pointer notification-btn bg-input-bg h-full rounded-lg border relative border-input-stroke p-2 w-10 py-1 px-2 sm:p-2.5"
            >
              {/* <img
                src="/notifications.png"
                alt="notification"
                className="w-4 h-4 sm:h-5 sm:w-5 filter dark:invert"
              /> */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.72943 7.9165L4.47943 7.91657V7.9165H3.72943ZM16.2709 7.9165H15.5209V7.91657L16.2709 7.9165ZM16.3068 14.6777L16.5938 15.3706H16.5938L16.3068 14.6777ZM3.69354 14.6777L3.98058 13.9848H3.98058L3.69354 14.6777ZM16.8455 10.4189L16.225 10.8402L16.2274 10.8437L16.8455 10.4189ZM17.8919 12.3079L17.1505 12.421V12.421L17.8919 12.3079ZM3.15484 10.4189L3.77294 10.8437L3.77533 10.8402L3.15484 10.4189ZM2.10843 12.3079L1.36701 12.1948H1.36701L2.10843 12.3079ZM7.39167 15.6405C7.28528 15.2402 6.87452 15.0019 6.4742 15.1083C6.07388 15.2147 5.8356 15.6255 5.94199 16.0258L7.39167 15.6405ZM14.0583 16.0258C14.1647 15.6255 13.9264 15.2147 13.5261 15.1083C13.1258 15.0019 12.715 15.2402 12.6087 15.6405L14.0583 16.0258ZM16.3068 14.6777L16.0197 13.9848C12.4846 15.4493 7.51576 15.4493 3.98058 13.9848L3.69354 14.6777L3.4065 15.3706C7.30925 16.9874 12.6911 16.9874 16.5938 15.3706L16.3068 14.6777ZM16.2709 7.9165H17.0209C17.0209 4.04817 13.8753 0.916504 10.0002 0.916504V1.6665V2.4165C13.0515 2.4165 15.5209 4.88128 15.5209 7.9165H16.2709ZM3.72943 7.9165H4.47943C4.47943 4.88128 6.94881 2.4165 10.0002 2.4165V1.6665V0.916504C6.12506 0.916504 2.97943 4.04817 2.97943 7.9165H3.72943ZM3.69354 14.6777L3.98058 13.9848C3.1657 13.6472 2.74734 13.093 2.84985 12.421L2.10843 12.3079L1.36701 12.1948C1.1151 13.8461 2.28129 14.9045 3.4065 15.3706L3.69354 14.6777ZM16.3068 14.6777L16.5938 15.3706C17.719 14.9045 18.8852 13.8461 18.6333 12.1948L17.8919 12.3079L17.1505 12.421C17.253 13.093 16.8346 13.6472 16.0197 13.9848L16.3068 14.6777ZM16.8455 10.4189L17.466 9.99764C17.0818 9.43182 17.021 8.79903 17.0209 7.91644L16.2709 7.9165L15.5209 7.91657C15.521 8.82036 15.564 9.86663 16.225 10.8402L16.8455 10.4189ZM3.15484 10.4189L3.77533 10.8402C4.43636 9.86663 4.47936 8.82036 4.47943 7.91657L3.72943 7.9165L2.97943 7.91644C2.97936 8.79903 2.91851 9.43182 2.53434 9.99764L3.15484 10.4189ZM3.15484 10.4189L2.53674 9.99413C2.39139 10.2056 2.08567 10.6043 1.89064 10.9099C1.66803 11.2587 1.44419 11.6888 1.36701 12.1948L2.10843 12.3079L2.84985 12.421C2.88158 12.213 2.98146 11.9889 3.15508 11.7168C3.35628 11.4016 3.5193 11.2128 3.77293 10.8437L3.15484 10.4189ZM16.8455 10.4189L16.2274 10.8437C16.481 11.2128 16.644 11.4016 16.8452 11.7168C17.0189 11.9889 17.1187 12.213 17.1505 12.421L17.8919 12.3079L18.6333 12.1948C18.5561 11.6888 18.3323 11.2587 18.1097 10.9099C17.9147 10.6043 17.6089 10.2056 17.4636 9.99413L16.8455 10.4189ZM10.0002 18.3332V17.5832C8.73014 17.5832 7.6848 16.7435 7.39167 15.6405L6.66683 15.8332L5.94199 16.0258C6.41301 17.7982 8.06274 19.0832 10.0002 19.0832V18.3332ZM13.3335 15.8332L12.6087 15.6405C12.3155 16.7435 11.2702 17.5832 10.0002 17.5832V18.3332V19.0832C11.9376 19.0832 13.5873 17.7982 14.0583 16.0258L13.3335 15.8332Z"/>
              </svg>
              <span className='absolute hidden md:inline rounded-full w-2.5 h-2.5 bg-error-clip top-2 right-2'></span>
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