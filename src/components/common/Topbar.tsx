import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarProfileDropdown from "./NavbarProfileDropdown";
import { handleLogout } from "../../services/authService";
import { getPageTitle } from "../../utils/getPageTitle";
import { FaBars } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setIsSidebarOpen } from "../../store/features/global/globalSlice";
import NavbarNotificationDropdown from "./NavbarNotificationDropdown";

const Topbar: React.FC = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.global);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] =
    useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
    if (
      notifDropdownRef.current &&
      !notifDropdownRef.current.contains(event.target as Node)
    ) {
      setIsNotifDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 lg:left-[250px] xl:left-[280px] right-0 p-3 sm:p-3 z-60 bg-white border-b border-gray-100`}
    >
      <nav className={`flex justify-between items-center w-full`}>
        <div className="flex items-center">
          <p className="text-xs scale-70 font-medium sm:text-xl text-primary-black whitespace-nowrap">
            {getPageTitle(location.pathname)}
          </p>
        </div>
        <div className="hidden lg:block relative mx-2">
          <input
            type="text"
            placeholder="Search here"
            className="w-[400px] pl-10 pr-4 py-2.5 border-2 border-gray-100 rounded-lg text-sm focus:outline-none placeholder:text-[#9E9E9E] h-[40px] "
            style={{ lineHeight: "1.5" }}
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            <img src="/search-icon.svg" alt="search icon" className="w-4 h-4" />
          </span>
        </div>
        {
          <div className="flex justify-end items-center gap-3.5">
            <div className="relative" ref={notifDropdownRef}>
              <button
                type="button"
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="md:flex hidden cursor-pointer rounded-lg border border-light-stroke items-center p-2 py-1 sm:p-2.5"
              >
                <p className="relative">
                  <img
                    src="/notifications.png"
                    alt="notification"
                    className="w-4 h-4 sm:h-5 sm:w-5"
                  />
                </p>
              </button>
              {isNotifDropdownOpen && <NavbarNotificationDropdown />}
            </div>
            <div
              className="pl-1.5 pr-0.5 hidden lg:block rounded-lg border border-quaternary-navy-blue bg-quaternary-navy-blue"
              ref={dropdownRef}
            >
              <div
                className="pl- pr-0.5 hidden lg:block rounded-lg border border-quaternary-navy-blue bg-quaternary-navy-blue"
                ref={dropdownRef}
              >
                <div
                  className="flex gap-1 items-center relative cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    src="/images/profile-image.png"
                    alt="Profile"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                  />
                  <div className="hidden sm:block py-0.5">
                    <h2 className="text-primary-black font-semibold text-xs">
                      John Doe
                    </h2>
                    <p className="text-secondary-black text-xs scale-80 -ml-2">
                      johndoe@mail.com
                    </p>
                  </div>
                  <img
                    src="/profile_chevron_down.svg"
                    alt="Toggle dropdown"
                    className="w-4 h-4 ml-[-4px]" // Added negative margin here
                  />
                </div>
                {isDropdownOpen && (
                  <NavbarProfileDropdown
                    onClose={() => {
                      handleLogout();
                      navigate("/login");
                    }}
                  />
                )}
              </div>
              {isDropdownOpen && (
                <NavbarProfileDropdown
                  onClose={() => {
                    handleLogout();
                    navigate("/login");
                  }}
                />
              )}
            </div>
            <div
              className="lg:hidden block"
              onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
            >
              <FaBars
                size={21}
                className="text-primary-sky-blue block lg:hidden"
              />
            </div>
          </div>
        }
      </nav>
    </div>
  );
};

export default Topbar;
