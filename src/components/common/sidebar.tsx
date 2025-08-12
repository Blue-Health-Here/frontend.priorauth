import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { adminSidebarItems, pharmacySidebarItems } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setIsSidebarCollapsed,
  setIsSidebarOpen,
} from "../../store/features/global/globalSlice";
import { RxCross2 } from "react-icons/rx";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

type SidebarSubItem = {
  name: string;
  path: string;
};

type SidebarItem = {
  name: string;
  icon: string;
  path?: string;
  subItems?: SidebarSubItem[];
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const dispatch = useDispatch();
  const { isSidebarCollapsed, isSidebarOpen } = useSelector(
    (state: RootState) => state.global
  );
  
  const sidebarItems: SidebarItem[] = pathName.startsWith("/pharmacy")
    ? pharmacySidebarItems
    : adminSidebarItems;

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  // Auto-open dropdown if current path matches a subitem
  useEffect(() => {
    const newOpenDropdowns: Record<string, boolean> = {};
    sidebarItems.forEach(item => {
      if (item.subItems) {
        newOpenDropdowns[item.name] = item.subItems.some(
          subItem => pathName.startsWith(subItem.path)
        );
      }
    });
    setOpenDropdowns(newOpenDropdowns);
  }, [pathName, sidebarItems]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      dispatch(setIsSidebarOpen(false));
    }
  }, [pathName, dispatch]);

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

  const toggleDropdown = (itemName: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const isItemActive = (itemPath: string | undefined, subItems?: SidebarSubItem[]) => {
    if (itemPath && pathName === itemPath) return true;
    if (subItems) {
      return subItems.some(subItem => pathName.startsWith(subItem.path));
    }
    return false;
  };

  const asideClass = isSidebarOpen
    ? "max-w-full min-w-full transition-all duration-500 border-r border-light-stroke theme-shadow xl:min-w-[280px] xl:max-w-[280px] block text-secondary-black fixed top-0 bottom-0 z-[99]"
    : `max-w-[280px] min-w-[280px] transition-all duration-500 border-r border-light-stroke theme-shadow hidden lg:flex text-secondary-black flex-col fixed top-0 bottom-0 z-[99] ${
        isSidebarCollapsed ? "!min-w-[80px] !max-w-[80px]" : ""
      }`;

  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[98] bg-black bg-opacity-50 lg:hidden" />
      )}
      <aside className={asideClass + ' theme-sidebar'}>
        <div
          className={`p-4 flex h-[71px] bg-transparent gap-4 sm:gap-6 lg:gap-8 items-center ${
            isSidebarCollapsed ? "px-2 justify-center" : "justify-between"
          }`}
        >
          <Link to="/" className={isSidebarCollapsed ? "pl-0" : "pl-2"}>
            <img
              src={isSidebarCollapsed ? "/Group.svg" : "/updated-logo (2).svg"}
              alt="PriorAuth Logo"
              className={`h-6 sm:h-7 lg:h-8 ${isSidebarCollapsed ? "brightness-0 invert" : ""}`}
            />
          </Link>
          {isSidebarOpen ? (
            <span
              onClick={() => dispatch(setIsSidebarOpen(false))}
              className="cursor-pointer text-white"
            >
              <RxCross2 size={18} />
            </span>
          ) : (
            !isSidebarCollapsed && (
              <img
                onClick={handleSidebarCollapse}
                src="/sidebar.svg"
                alt="Collapse sidebar"
                className="w-8 h-8 p-1.5 rounded-lg cursor-pointer brightness-0 invert"
              />
            )
          )}
        </div>

        {/* Main content */}
        <div className="flex flex-col h-[calc(100%-68px)] overflow-hidden bg-transparent">
          {/* Content area */}
          <div className="flex-1 px-3 py-3">
            <ul className="flex flex-col gap-y-2 text-[14px]">
              {sidebarItems.map((item, index) => (
                <React.Fragment key={index}>
                  <li className={isSidebarCollapsed ? "flex justify-center" : ""}>
                    {item.subItems ? (
                      <>
                        <div
                          onClick={() => !isSidebarCollapsed && toggleDropdown(item.name)}
                          className={`group flex items-center gap-x-2 rounded cursor-pointer transition font-secondary ${
                            isItemActive(item.path, item.subItems)
                              ? "bg-sidebar-link-active text-white"
                              : "text-white hover:bg-sidebar-link-active"
                          } ${isSidebarCollapsed ? "p-2 px-3" : "p-2 w-full justify-between"}`}
                        >
                          <div className="flex items-center gap-x-2">
                            <img
                              src={item.icon}
                              alt={`${item.name} Icon`}
                              title={item.name}
                              className={`transition duration-200 w-4 h-4 brightness-0 invert ${
                                isItemActive(item.path, item.subItems) ? "opacity-100" : "opacity-80"
                              }`}
                            />
                            {!isSidebarCollapsed && (
                              <span
                                className={`text-sm transition-colors duration-200 font-semibold ${
                                  isItemActive(item.path, item.subItems) ? "opacity-100" : "opacity-80"
                                }`}
                              >
                                {item.name}
                              </span>
                            )}
                          </div>
                          {!isSidebarCollapsed && (
                            <span className="text-white">
                              {openDropdowns[item.name] ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
                            </span>
                          )}
                        </div>
                        {!isSidebarCollapsed && openDropdowns[item.name] && (
                          <ul className="ml-6 mt-1 mb-2 space-y-1">
                            {item.subItems.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <NavLink
                                  to={subItem.path}
                                  className={({ isActive }) =>
                                    `block px-2 py-1.5 rounded text-sm transition ${
                                      isActive
                                        ? "bg-sidebar-link-active text-white"
                                        : "text-white hover:bg-sidebar-link-active"
                                    }`
                                  }
                                >
                                  {subItem.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : item.path ? (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `group flex items-center gap-x-2 rounded cursor-pointer transition font-secondary ${
                            isActive
                              ? "bg-sidebar-link-active text-white"
                              : "text-white hover:bg-sidebar-link-active"
                          } ${isSidebarCollapsed ? "p-2 px-3" : "p-2"}`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <img
                              src={item.icon}
                              alt={`${item.name} Icon`}
                              title={item.name}
                              className={`transition duration-200 w-4 h-4 brightness-0 invert ${
                                isActive ? "opacity-100" : "opacity-80"
                              }`}
                            />
                            <span
                              className={`${
                                isSidebarCollapsed ? "hidden" : "inline"
                              } text-sm transition-colors duration-200 font-semibold ${
                                isActive ? "opacity-100" : "opacity-80"
                              }`}
                            >
                              {item.name}
                            </span>
                          </>
                        )}
                      </NavLink>
                    ) : null}
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>

          {/* Bottom section */}
          <div className="px-3 py-4 mt-auto border-t border-sidebar-stroke">
            <div className={isSidebarCollapsed ? "flex justify-center" : ""}>
              <NavLink
                to={
                  pathName.startsWith("/pharmacy")
                    ? "/pharmacy/settings"
                    : "/admin/settings"
                }
                className={({ isActive }) =>
                  `group flex items-center gap-x-2 rounded cursor-pointer transition font-secondary ${
                    isActive
                      ? "bg-[#294C95] text-white"
                      : "text-white hover:bg-[#294C95]"
                  } ${isSidebarCollapsed ? "p-1.5" : "p-2"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={"/sidebar-Settings.svg"}
                      alt={`Settings Icon`}
                      className={`transition duration-200 w-4 h-4 brightness-0 invert ${
                        isActive ? "opacity-100" : "opacity-80"
                      }`}
                    />
                    <span
                      className={`${
                        isSidebarCollapsed ? "hidden" : "inline"
                      } text-sm transition-colors duration-200 font-semibold ${
                        isActive ? "opacity-100" : "opacity-80"
                      }`}
                    >
                      Settings
                    </span>
                  </>
                )}
              </NavLink>
            </div>

            {/* Copyright section */}
            <div
              className={`${
                isSidebarCollapsed ? "flex justify-center mt-4" : "mt-6"
              }`}
            >
              <div
                className={`flex items-center bg-copyright-box ${
                  isSidebarCollapsed
                    ? "gap-0  p-2 px-3 rounded-lg"
                    : "gap-2 bg-[#294C95] p-3 py-1.5 rounded-lg"
                }`}
              >
                <img
                  src="/copyright.svg"
                  alt="copyright"
                  className={`${
                    isSidebarCollapsed ? "w-5 h-5" : "w-5 h-5"
                  } brightness-0 invert`}
                />
                {!isSidebarCollapsed && (
                  <p className="text-white text-xs scale-85 -ml-2">
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