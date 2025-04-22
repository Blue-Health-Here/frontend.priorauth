import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { adminSidebarItems } from '../../utils/constant';

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
    ? 'max-w-[250px] min-w-[250px] xl:min-w-[260px] xl:max-w-[260px] block bg-primary-white shadow-lg rounded-2xl text-secondary-black pt-8 pb-8 pl-4 pr-4 fixed z-[99]'
    : 'max-w-[250px] min-w-[250px] xl:min-w-[260px] xl:max-w-[260px] hidden lg:block bg-primary-white shadow-lg rounded-2xl text-secondary-black pt-8 pb-8 pl-4 pr-4 fixed z-[99]';

  return (
    <>
      {isSidebarOpen && <div className="fixed inset-0 z-[98] bg-black bg-opacity-50 lg:hidden" />}
      <aside className={asideClass}>
          {isSidebarOpen && (
          <span onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 cursor-pointer ">
            {/* <RxCross2 size={20} /> */} X
            </span>
          )}
        <img src="/images/logo.svg" alt="PriorAuth Logo" className="h-7 sm:h-8 lg:h-10" />

        <div className="h-[calc(100vh-15rem)] overflow-y-auto pb-4 mt-8">
          <ul className="flex flex-col gap-y-2 text-[15px]">
            {adminSidebarItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `group flex items-center gap-x-3 p-3 h-9 md:h-11 rounded-lg cursor-pointer transition font-secondary ${
                    isActive
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
                    <span className="text-xs sm:text-sm xl:text-[16px] transition-colors duration-200 group-hover:text-primary-white">
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