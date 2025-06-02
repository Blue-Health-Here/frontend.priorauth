import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { adminSidebarItems } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setIsSidebarCollapsed, setIsSidebarOpen } from '../../store/features/global/globalSlice';
import { RxCross2 } from 'react-icons/rx';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const dispatch = useDispatch();
  const { isSidebarCollapsed, isSidebarOpen } = useSelector((state: RootState) => state.global);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      dispatch(setIsSidebarOpen(false));
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

  const handleSidebarCollapse = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  }

  const asideClass = isSidebarOpen
    ? 'max-w-full min-w-full transition-all duration-500 shadow-[0px 0px 12px 0px rgba(0, 0, 0, 0.04)] xl:min-w-[260px] xl:max-w-[260px] block text-secondary-black fixed top-0 bottom-0 z-[99]'
    : 'max-w-[250px] min-w-[250px] transition-all duration-500 shadow-[0px 0px 12px 0px rgba(0, 0, 0, 0.04)] xl:min-w-[260px] xl:max-w-[260px] hidden lg:flex text-secondary-black flex-col fixed top-0 bottom-0 z-[99]';

  return (
    <>
      {isSidebarOpen && <div className="fixed inset-0 z-[98] bg-black bg-opacity-50 lg:hidden" />}
      <aside className={asideClass}>
        <div className='p-4 flex min-h-[79px] border-b border-gray-100 bg-primary-white justify-between items-center border-r border-gray-100'>
          <Link to='/' className='pl-2'>
            <img src="/images/logo.svg" alt="PriorAuth Logo" className="h-7 sm:h-8 lg:h-8" />
          </Link>
          {!isSidebarOpen ? <img onClick={handleSidebarCollapse} src='/header-left-logo-arrow.svg' alt='header left logo arrow' className={`w-8 h-8 bg-gray-100 p-2 rounded-lg cursor-pointer ${isSidebarCollapsed ? 'scale-[-1]' : ''}`} /> : (
            <span onClick={() => dispatch(setIsSidebarOpen(false))} className="cursor-pointer ">
              <RxCross2 size={20} />
            </span>
          )}
        </div>
        <div className={`${isSidebarCollapsed ? ' !max-w-[80px] !min-w-[80px]' : ''} h-[calc(100%-79px)] 
          overflow-y-auto bg-primary-white duration-500 transition-all flex flex-col flex-1 gap-4
          px-4 py-10 border-r border-gray-100`}>
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
                      title={item.name}
                      className={`transition duration-200 ${isActive ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'
                        }`}
                    />
                    <span className={`${isSidebarCollapsed ? 'hidden' : 'inline'} text-xs sm:text-sm xl:text-base transition-colors duration-200 group-hover:text-primary-white`}>
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
                  <span className={`${isSidebarCollapsed ? 'hidden' : 'inline'} text-xs sm:text-sm xl:text-base transition-colors duration-200 group-hover:text-primary-white`}>
                    Settings
                  </span>
                </>
              )}
            </NavLink>
            <div className={`${isSidebarCollapsed ? 'hidden' : ''} bg-quaternary-navy-blue p-4 rounded-lg flex flex-wrap gap-2 mt-4`}>
              <img src='/copyright.svg' alt='copyright' className='w-4 h-4' />
              <p className='text-tertiary-navy-blue text-xs word-wrap'>Copyrights Futuro 2025 - All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;