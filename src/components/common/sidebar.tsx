import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { adminSidebarItems } from '../../utils/constants';
import { HiArrowNarrowLeft, HiOutlineArrowNarrowLeft } from "react-icons/hi";

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
    : 'max-w-[250px] min-w-[250px] xl:min-w-[260px] xl:max-w-[260px] hidden lg:block bg-primary-white text-secondary-black fixed top-0 bottom-0 z-[99]';

  return (
    <>
      {isSidebarOpen && <div className="fixed inset-0 z-[98] bg-black bg-opacity-50 lg:hidden" />}
      <aside className={asideClass}>
        {/* {isSidebarOpen && (
          <span onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 cursor-pointer ">
            <RxCross2 size={20} /> X
          </span>
        )} */}
        <div className='p-4 flex min-h-[81px] justify-between items-center border-r border-gray-100'>
          <Link to='/'>
            <img src="/images/logo.svg" alt="PriorAuth Logo" className="h-7 sm:h-8 lg:h-8" />
          </Link>
          <button type='button' className='px-2 py-1.5 rounded-md bg-gray-100 h-max'>
            {/* <HiOutlineArrowNarrowLeft className='text-3xl' /> */}
            <HiArrowNarrowLeft className='text-2xl' />
          </button>
        </div>
        <div className="overflow-y-auto px-6 pt-10 border-t border-r border-gray-100">
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
        </div>
      </aside>
    </>
  );
};

export default Sidebar;