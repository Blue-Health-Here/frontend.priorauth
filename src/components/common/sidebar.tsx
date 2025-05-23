import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { adminSidebarItems } from '../../utils/constants';
import { HiArrowNarrowLeft } from "react-icons/hi";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [pathName]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  const asideClass = isSidebarOpen
    ? 'max-w-[250px] min-w-[250px] xl:min-w-[260px] xl:max-w-[260px] block bg-primary-white text-secondary-black fixed top-0 bottom-0 z-[99]'
    : 'max-w-[250px] min-w-[250px] xl:min-w-[260px] xl:max-w-[260px] hidden lg:flex bg-primary-white text-secondary-black flex-col fixed top-0 bottom-0 z-[99]';

  return (
    <>
      {isSidebarOpen && <div className="fixed inset-0 z-[98] bg-black bg-opacity-50 lg:hidden" />}
      <aside className={asideClass}>
        {/* {isSidebarOpen && (
          <span onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 cursor-pointer ">
            <RxCross2 size={20} /> X
          </span>
        )} */}
        <div className='py-4 px-4 flex min-h-[81px] justify-between items-center border-r border-gray-100'>
          <Link to='/' className='pl-2'>
            <img src="/images/logo.svg" alt="PriorAuth Logo" className="h-7 sm:h-8 lg:h-8" />
          </Link>
          <img src='/header-left-logo-arrow.svg' alt='header left logo arrow' className='w-8 h-8 bg-gray-100 p-2 rounded-lg cursor-pointer' />
        </div>
        <div className="overflow-y-auto flex flex-col flex-1 px-4 py-10 border-t border-r border-gray-100">
          <ul className="flex flex-col gap-y-2 text-[15px]">
            {adminSidebarItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `group flex items-center gap-x-3 p-3 h-9 md:h-11 rounded-lg cursor-pointer transition font-secondary ${isActive
                    ? 'bg-primary-sky-blue text-primary-white'
                    : 'hover:bg-primary-sky-blue hover:text-primary-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={item.icon}
                      alt={`${item.name} Icon`}
                      className={`transition duration-200 ${isActive ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'
                        }`}
                    />
                    <span className="text-xs sm:text-sm xl:text-base transition-colors duration-200 group-hover:text-primary-white">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </ul>
          <div className='mt-auto'>
            <NavLink
              to={'/admin/settings'}
              className={({ isActive }) =>
                `group flex items-center gap-x-3 p-3 h-9 md:h-11 rounded-lg cursor-pointer transition font-secondary ${isActive
                  ? 'bg-primary-sky-blue text-primary-white'
                  : 'hover:bg-primary-sky-blue hover:text-primary-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={'/sidebar-Settings.svg'}
                    alt={`Settings Icon`}
                    className={`transition duration-200 ${isActive ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'
                      }`}
                  />
                  <span className="text-xs sm:text-sm xl:text-base transition-colors duration-200 group-hover:text-primary-white">
                    Settings
                  </span>
                </>
              )}
            </NavLink>
            <div className='bg-quaternary-navy-blue p-4 rounded-lg flex gap-2 mt-4'>
              <img src='/copyright.svg' alt='copyright' className='w-4 h-4' />
              <p className='text-tertiary-navy-blue text-xs'>Copyrights Futuro 2025 - All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;