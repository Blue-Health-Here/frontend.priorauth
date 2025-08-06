import React, { useEffect, useRef, useState, useMemo } from 'react';
import PharmacyCard from './PharmacyCard';
import { RootState } from '../../../store';
import { fetchAllPharmacies } from '../../../services/adminService';
import { useDispatch, useSelector } from 'react-redux';
import SearchField from '@/components/common/SearchField';
import ThemeButtonTabs from '@/components/ThemeButtonTabs';
import Loading from "@/components/common/Loading";
import ThemeButton from '@/components/common/ThemeButton';
import FilterField from '@/components/common/FilterField';
import { filterOptions } from '@/utils/constants';

const AdminPharmacies: React.FC = () => {
  const { pharmaciesData } = useSelector((state: RootState) => state.adminPharmacies);
  const isReqsFetched = useRef(false);
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [activeTab, setActiveTab] = useState("All Pharmacies");
  const [updatedPharmacyData, setUpdatedPharmacyData] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<any>("asc");

  const handleModifyPharmacy = (pharmacy: any) => {
    console.log('Modify pharmacy:', pharmacy.id);
  };

  useEffect(() => {
    if (!isReqsFetched.current) {
      setIsLoading(true);
      (async () => {
        await fetchAllPharmacies(dispatch);
        setIsLoading(false);
      })();
      isReqsFetched.current = true;
    }
  }, []);

  useEffect(() => {
    const transformed = pharmaciesData.map((item: any) => ({
      ...item,
      pharmacy: item.pharmacy || `${item.firstName} ${item.lastName}`,
      state: item.state || getStateFromAddress(item.address)
    }));
    setUpdatedPharmacyData(transformed);
  }, [pharmaciesData]);

  const getStateFromAddress = (address: string) => {
    if (!address) return '';
    const states = ['New York', 'NY', 'New Jersey', 'NJ', 'Pennsylvania', 'PA'];
    return states.find(state => address.includes(state)) || '';
  };

  const filteredPharmacyData = useMemo(() => {
    const filterValue = globalFilter.toLowerCase();
    let data = updatedPharmacyData.filter((item) =>
      item.pharmacy?.toLowerCase().includes(filterValue) ||
      item.firstName?.toLowerCase().includes(filterValue) ||
      item.lastName?.toLowerCase().includes(filterValue)
    );

    // Add sorting logic
    if (sortDirection) {
      data.sort((a, b) => {
        const nameA = a.firstName?.toLowerCase() || "";
        const nameB = b.firstName?.toLowerCase() || "";
        const result = nameA.localeCompare(nameB);
        return sortDirection === "asc" ? result : -result;
      });
    }

    return data;
  }, [updatedPharmacyData, globalFilter, sortDirection]);

  const displayedPharmacies = useMemo(() => {
    if (activeTab === "All Pharmacies") return filteredPharmacyData;
    
    const stateMap: Record<string, string[]> = {
      "New York": ["New York", "NY"],
      "New Jersey": ["New Jersey", "NJ"],
      "Pennsylvania": ["Pennsylvania", "PA"]
    };
    
    return filteredPharmacyData.filter(item => 
      stateMap[activeTab]?.some(state => item.state?.includes(state))
    );
  }, [filteredPharmacyData, activeTab]);

  return (
    <div className="bg-primary-white rounded-lg theme-shadow p-4 h-full">
      {/* Header Section - Maintains original positioning */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium tracking-tighter">
          All Pharmacies
        </h1>
        <ThemeButton
          className="min-w-[130px] !h-full rounded-lg py-2.5"
          variant="primary"
          type="button"
        >
          Add Pharmacy
        </ThemeButton>
      </div>

      {/* Tabs, Search, and Filter - Now in single line */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <ThemeButtonTabs
          data={["All Pharmacies", "New York", "New Jersey", "Pennsylvania"]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className="w-full md:w-auto whitespace-nowrap overflow-x-auto scrollbar-hide border-quaternary-navy-blue-dark"
        />
        
        <div className="flex gap-2 w-full md:w-auto">
          <SearchField
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder="Search pharmacies"
            className="flex-1 min-w-[200px]"
          />
          <FilterField
            label="Sort By"
            columns={filterOptions}
            selectedValue={sortDirection}
            onChange={setSortDirection}
          />
        </div>
      </div>

      {/* Main Content - Unchanged from original */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-8">
            <Loading />
          </div>
        ) : displayedPharmacies.length > 0 ? (
          displayedPharmacies.map((item, index) => (
            <PharmacyCard
              key={index}
              pharmacy={item}
              isAdmin={true}
              onModify={() => handleModifyPharmacy(item)}
            />
          ))
        ) : (
          <div className="col-span-full text-left text-gray-500 text-sm">
            No pharmacies found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPharmacies;