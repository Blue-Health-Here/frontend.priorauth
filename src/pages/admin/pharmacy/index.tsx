import React, { useEffect, useMemo, useRef, useState } from 'react';
import PharmacyCard from './PharmacyCard';
// import { pharmacies, tabs } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchAllPharmacies } from '../../../services/adminService';
// import TableHeader from './TableHeader';
import SearchField from '@/components/common/SearchField';
import FilterField from '@/components/common/FilterField';
import { filterOptions } from '@/utils/constants';

const AdminPharmacies: React.FC = () => {
  const { pharmaciesData } = useSelector((state: RootState) => state.adminPharmacies);
  const isReqsFetched = useRef(false);
  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sortDirection, setSortDirection] = useState<any>("asc");

  useEffect(() => {
    if (!isReqsFetched.current) {
      (async () => {
        await fetchAllPharmacies(dispatch);
      })();
      isReqsFetched.current = true;
    }
  }, []);

  const sortedPharmaciesData = useMemo(() => {
    let data = [...pharmaciesData];

    if (sortDirection) {
      data.sort((a, b) => {
        const nameA = a.firstName?.toLowerCase() || "";
        const nameB = b.firstName?.toLowerCase() || "";
    
        const result = nameA.localeCompare(nameB);
        return sortDirection === "asc" ? result : -result;
      });
    }
  
    return data;
  }, [pharmaciesData, sortDirection]);
  
  const filteredPharmaciesData = useMemo(() => {
    const filterValue = globalFilter.toLowerCase();
  
    return sortedPharmaciesData.filter((item) =>
      item.firstName?.toLowerCase().includes(filterValue) || item.lastName?.toLowerCase().includes(filterValue)
    );
  }, [sortedPharmaciesData, globalFilter]);

  return (
    <>
      <div className="bg-primary-white p-4 sm:p-5 rounded-2xl theme-shadow flex flex-col gap-4 w-full">
        {/* <TableHeader /> */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium tracking-tighter">
            Pharmacies List
          </h1>
          <div className="flex gap-2 min-h-12">
            <SearchField
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              placeholder="Search prescribers here"
              className="min-w-[200px]"
            />
            <FilterField
              label="Sort By"
              columns={filterOptions}
              selectedValue={sortDirection}
              onChange={setSortDirection}
            />
          </div>
        </div>
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
          {filteredPharmaciesData?.length > 0 ? filteredPharmaciesData.map((pharmacy: any) => {
            return (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            )
          }) : <p>No data found.</p>}
        </div>
      </div>
    </>
  );
};

export default AdminPharmacies;