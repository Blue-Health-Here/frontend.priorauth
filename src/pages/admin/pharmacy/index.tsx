import React, { useEffect, useRef } from 'react';
import PharmacyCard from './PharmacyCard';
// import Pagination from '../../../components/common/Pagination';
import { pharmacies, tabs } from '../../../utils/constants';
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

  console.log(pharmaciesData, "pharmaciesData");
  return (
    <>
      {/* <div className="bg-primary-background rounded-2xl shadow-xs min-h-[calc(100vh-15rem)]"> */}
        <div className="bg-primary-white p-5 rounded-2xl shadow-[0px 0px 12px 0px rgba(0, 0, 0, 0.04)]">
          <TableHeader />
          <div className="flex flex-wrap overflow-x-auto whitespace-nowrap pb-4">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-3 md:p-6 bg-primary-background rounded-b-2xl">
            {pharmacies.map((pharmacy: any) => {
              return (
                <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
              )
            })}
            {/* {[...pharmaciesData].map(item => ({ ...item, lastRequests: { date: '10/03/2023', approved: 42, denied: 12 } })).map(pharmacy => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            ))} */}
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default AdminPharmacies;
