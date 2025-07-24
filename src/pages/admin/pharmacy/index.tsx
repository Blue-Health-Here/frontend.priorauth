import React, { useEffect, useRef } from 'react';
import PharmacyCard from './PharmacyCard';
// import { pharmacies, tabs } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchAllPharmacies } from '../../../services/adminService';
import TableHeader from './TableHeader';

const AdminPharmacies: React.FC = () => {
  const { pharmaciesData } = useSelector((state: RootState) => state.adminPharmacies);
  const isReqsFetched = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReqsFetched.current) {
      (async () => {
        await fetchAllPharmacies(dispatch);
      })();
      isReqsFetched.current = true;
    }
  }, []);
  // console.log(pharmaciesData, "pharmaciesData");
  return (
    <>
      <div className="bg-primary-white p-4 sm:p-5 rounded-2xl theme-shadow flex flex-col gap-4 w-full">
        <TableHeader />
        {/* <div className="flex overflow-x-auto whitespace-nowrap py-4 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base 
                     transition-colors duration-200 cursor-pointer font-secondary
                     ${tab.active
                  ? 'border-b-2 border-primary-sky-blue text-secondary-black font-medium'
                  : 'text-tertiary-black hover:text-secondary-black'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {pharmaciesData.map((pharmacy: any) => {
            return (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            )
          })}
        </div>
      </div>
    </>
  );
};

export default AdminPharmacies;