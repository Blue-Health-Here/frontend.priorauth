import React, { useEffect, useState } from 'react';

const Topbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 lg:left-[250px] xl:left-[276px] right-0 p-4 z-50 transition-all duration-300`}>
      <nav
        className={`topbar flex justify-between items-center transition-all duration-300 
          ${isScrolled ? 'bg-white shadow-lg rounded-lg p-4 ' : 'bg-transparent'}`}
      >
        <div>
          <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-primary-black">Welcome back!</p>
          <p className='text-tertiary-black text-xs md:text-sm lg:text-base'>Dashboard</p>
          </div>
        <div className="flex justify-end items-center gap-x-4 cursor-pointer">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className=" w-full md:w-96 pl-10 pr-4 py-2 border border-medium-stroke rounded-lg text-sm focus:outline-none placeholder:text-tertiary-white"
            />
            <span className="absolute left-3 top-2.5 text-gray-500 cursor-pointer">
              <img src="/search-icon.svg" alt="search icon" />
            </span>
          </div>
          <div className="border border-medium-stroke rounded-lg p-2">

            <img src="/bell-icon.svg" alt="notification" className='h-5 w-5' />
          </div>
          <div className='border rounded-full object-cover shadow-sm overflow-hidden w-9 h-9 flex items-center justify-center'>
            <img src="/images/profile-image.png" alt="" className='w-full h-full rounded-full' width={30} height={30} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
