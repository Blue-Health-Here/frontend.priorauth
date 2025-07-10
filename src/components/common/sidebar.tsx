import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { adminSidebarItems, pharmacySidebarItems } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setIsSidebarCollapsed,
  setIsSidebarOpen,
} from "../../store/features/global/globalSlice";
import { RxCross2 } from "react-icons/rx";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const dispatch = useDispatch();
  const { isSidebarCollapsed, isSidebarOpen } = useSelector(
    (state: RootState) => state.global
  );
  const sidebarItems = pathName.startsWith("/pharmacy")
    ? pharmacySidebarItems
    : adminSidebarItems;

  useEffect(() => {
    if (window.innerWidth < 1024) {
      dispatch(setIsSidebarOpen(false));
    }
  }, [pathName]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const handleSidebarCollapse = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const asideClass = isSidebarOpen
    ? "max-w-full min-w-full transition-all duration-500 shadow-[0px 0px 12px 0px rgba(0, 0, 0, 0.04)] xl:min-w-[280px] xl:max-w-[280px] block text-secondary-black fixed top-0 bottom-0 z-[99]"
    : `max-w-[280px] min-w-[280px] transition-all duration-500 shadow-[0px 0px 12px 0px rgba(0, 0, 0, 0.04)] hidden lg:flex text-secondary-black flex-col fixed top-0 bottom-0 z-[99] ${
        isSidebarCollapsed ? "!min-w-[80px] !max-w-[80px]" : ""
      }`;

  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[98] bg-black bg-opacity-50 lg:hidden" />
      )}
      <aside className={asideClass}>
        <div
          className={`p-4 flex h-[71px] border-b bg-primary-white gap-4 sm:gap-6 lg:gap-8 items-center border-r border-gray-100 ${
            isSidebarCollapsed ? "px-2 justify-center" : "justify-between"
          }`}
        >
          <Link to="/" className={isSidebarCollapsed ? "pl-0" : "pl-2"}>
            <img
              src={isSidebarCollapsed ? "/Group.svg" : "/images/logo.svg"}
              alt="PriorAuth Logo"
              className="h-6 sm:h-7 lg:h-8"
            />
          </Link>
          {isSidebarOpen ? (
            <span
              onClick={() => dispatch(setIsSidebarOpen(false))}
              className="cursor-pointer"
            >
              <RxCross2 size={18} />
            </span>
          ) : (
            !isSidebarCollapsed && (
              <img
                onClick={handleSidebarCollapse}
                src="/sidebar.svg"
                alt="Collapse sidebar"
                className="w-8 h-8 p-1.5 rounded-lg cursor-pointer"
              />
            )
          )}
        </div>

        {/* Main content with restored border and proper scrolling */}
        <div className="flex flex-col h-[calc(100%-68px)] overflow-hidden border-r border-gray-100 bg-primary-white">
          {/* Scrollable content area */}
          <div className="overflow-y-auto flex-1 px-3 py-3">
            <ul className="flex flex-col gap-y-2 text-[14px]">
              {sidebarItems.map((item, index) => (
                <li
                  key={index}
                  className={isSidebarCollapsed ? "flex justify-center" : ""}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `group flex items-center gap-x-2 rounded cursor-pointer transition font-secondary ${
                        isActive
                          ? "bg-primary-sky-blue text-primary-white"
                          : "hover:bg-primary-sky-blue hover:text-primary-white"
                      } ${isSidebarCollapsed ? "p-2 px-3" : "p-2"}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <img
                          src={item.icon}
                          alt={`${item.name} Icon`}
                          title={item.name}
                          className={`transition duration-200 w-4 h-4 ${
                            isActive
                              ? "brightness-0 invert"
                              : "group-hover:brightness-0 group-hover:invert"
                          }`}
                        />
                        <span
                          className={`${
                            isSidebarCollapsed ? "hidden" : "inline"
                          } text-sm transition-colors duration-200 group-hover:text-primary-white font-semibold`}
                        >
                          {item.name}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer with full-width separator */}
          <div className="border-t border-gray-200 w-full"></div>
          <div className="px-3 py-4">
            <div className={isSidebarCollapsed ? "flex justify-center" : ""}>
              <NavLink
                to={pathName.startsWith("/pharmacy") ? "/pharmacy/settings" : "/admin/settings"}
                className={({ isActive }) =>
                  `group flex items-center gap-x-2 rounded cursor-pointer transition font-secondary ${
                    isActive
                      ? "bg-primary-sky-blue text-primary-white"
                      : "hover:bg-primary-sky-blue hover:text-primary-white"
                  } ${isSidebarCollapsed ? "p-1.5" : "p-2"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={"/sidebar-Settings.svg"}
                      alt={`Settings Icon`}
                      className={`transition duration-200 w-4 h-4 ${
                        isActive
                          ? "brightness-0 invert"
                          : "group-hover:brightness-0 group-hover:invert"
                      }`}
                    />
                    <span
                      className={`${
                        isSidebarCollapsed ? "hidden" : "inline"
                      } text-sm transition-colors duration-200 group-hover:text-primary-white font-semibold`}
                    >
                      Settings
                    </span>
                  </>
                )}
              </NavLink>
            </div>

            {/* Copyright section - updated with more space and blue background when collapsed */}
            <div
              className={`${
                isSidebarCollapsed ? "flex justify-center mt-4" : "mt-6"
              }`}
            >
              <div
                className={`flex items-center ${
                  isSidebarCollapsed
                    ? "gap-0 bg-quaternary-navy-blue p-2 px-3 rounded-lg"
                    : "gap-2 bg-quaternary-navy-blue p-3 py-1.5 rounded-lg"
                }`}
              >
                <img
                  src="/copyright.svg"
                  alt="copyright"
                  className={`${isSidebarCollapsed ? "w-5 h-5" : "w-5 h-5"}`}
                />
                {!isSidebarCollapsed && (
                  <p className="text-tertiary-navy-blue text-xs scale-85 -ml-2">
                    Copyrights Futuro 2025 - All Rights Reserved.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
