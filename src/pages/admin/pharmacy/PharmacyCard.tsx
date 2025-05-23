import React from 'react';
import { PharmacyCardProps } from '../../../utils/types';
import { Link } from 'react-router-dom';

const PharmacyCard: React.FC<PharmacyCardProps> = ({ pharmacy }) => {
  const stats = [
    {
      icon: "/calendar.svg",
      label: "Last Requests",
      value: pharmacy.lastRequests.date,
      bg: "bg-quaternary-sky-blue",
    },
    {
      icon: "/check.svg",
      label: "Approve Requests",
      value: pharmacy.lastRequests.approved,
      bg: "bg-[#E3F6DF]",
    },
    {
      icon: "/cancel.svg",
      label: "Denied Requests",
      value: pharmacy.lastRequests.denied,
      bg: "bg-[#FFE4E4]",
    },
  ];
  return (
    <div className="bg-primary-white rounded-xl shadow-xs p-4 relative">
      <button className="border border-medium-stroke rounded-lg p-3 text-tertiary-white absolute top-2 right-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>
      <div className="flex flex-col items-center gap-3">
        <Link to={`/admin/pharmacies/${pharmacy.id}`}>
          <img src={pharmacy.pharmacyLogo || '/images/Abstergo Ltd..png'} alt="" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full" />
        </Link>
        <div className="space-y-1 text-center">
          <Link to={`/admin/pharmacies/${pharmacy.id}`}><h2 className='text-sm md:text-lg lg:text-xl font-semibold text-primary-black leading-[110%]'>{pharmacy.name}</h2></Link>
          <span className='text-secondary-black text-xs md:text-sm lg:text-base'>{pharmacy.phoneNumber}</span>
        </div>

        <div className="space-y-3">
          {stats.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`${item.bg} rounded-lg p-2 flex items-center justify-center`}>
                <img src={item.icon} alt={item.label} className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="text-secondary-black">
                <p className="text-xs">{item.label}</p>
                <p className="text-sm md:text-base">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;

