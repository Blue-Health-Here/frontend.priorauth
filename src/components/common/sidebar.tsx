import React, { useEffect, useState } from 'react';
import { adminSidebarItems } from '../../constants';
import { Link, useLocation } from 'react-router-dom';

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
    ? 'max-w-[250px] min-w-[250px] xl:min-w-[260px]  xl:max-w-[260px] block bg-primary-white shadow-lg rounded-lg text-secondary-black shadow-lg pt-8 pb-8 pl-4 pr-4 fixed z-[99]'
    : 'max-w-[250px] min-w-[250px] xl:min-w-[260px] xl:max-w-[260px] hidden lg:block bg-primary-white shadow-lg rounded-lg text-secondary-black shadow-lg pt-8 pb-8 pl-4 pr-4 fixed z-[99]';

  return (
    <>
      {isSidebarOpen && <div className="fixed inset-0 z-[98] bg-black bg-opacity-50 lg:hidden" />}
      <aside className={asideClass}>
        {isSidebarOpen && (
          <span onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 cursor-pointer">
            {/* <RxCross2 size={20} /> */} X
          </span>
        )}
        <img src="/images/logo.svg" alt="PriorAuth Logo" className="h-7 sm:h-8 lg:h-10" />
        <ul className="mt-4 flex flex-col gap-y-2 text-[15px]">
          {adminSidebarItems.map((item, index) => {
            const isActive = pathName.startsWith(item.path);
            return (
              <Link to={item.path} key={index}>
                    <li
                      className={`
                group flex items-center gap-x-3 p-3 h-9 md:h-11 rounded-lg cursor-pointer transition font-medium
                ${isActive ? "bg-primary-white text-secondary-black" : "hover:bg-primary-sky-blue hover:text-primary-white"}
              `}
                >
                  <img
                    src={item.icon}
                    alt={`${item.name} Icon`}
                    className="transition duration-200 group-hover:brightness-0 group-hover:invert"
                  />
                  <span className="text-xs sm:text-sm xl:text-[16px] transition-colors duration-200 group-hover:text-primary-white">
                    {item.name}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>

      </aside>
    </>
  );
};

export default Sidebar;
