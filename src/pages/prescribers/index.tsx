import Loading from "@/components/common/Loading";
import PrescriberCard from "@/components/PrescriberCard";
import { getAllUserPrescribers } from "@/services/adminService";
import { getAllPrescribers } from "@/services/pharmacyService";
import { RootState } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchField from "@/components/common/SearchField";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";
import FilterField from "@/components/common/FilterField";

const Prescribers: React.FC<any> = ({ isAdmin }) => {
    const { prescribersData } = useSelector((state: RootState) => state.prescribers);
    const isFetchedPrescribers = useRef(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [updatedPresData, setUpdatedPresData] = useState<any[]>([]);
    const [filteredPresData, setFilteredPresData] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("Active List");
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedFilterField, setSelectedFilterField] = useState("prescriber");

    const filterOptions = [
        { field: "prescriber", header: "Name" },
        { field: "prescriberPhone", header: "Phone" },
        { field: "prescriberAddress", header: "Address" },
        { field: "npi", header: "NPI" }
    ];

    const fetchAllPrescribers = async () => {
        setIsLoading(true);
        if (isAdmin) {
            await getAllUserPrescribers(dispatch).then(() => setIsLoading(false));
        } else {
            await getAllPrescribers(dispatch, user?.id).then(() => setIsLoading(false));
        }
    };

    useEffect(() => {
        if (!isFetchedPrescribers.current) {
            fetchAllPrescribers();
            isFetchedPrescribers.current = true;
        }
    }, []);

    useEffect(() => {
        const transformedData = prescribersData.map((item: any) => ({ 
            ...item,
            prescriber: item.prescriber || `${item.firstName} ${item.lastName}`,
            prescriberPhone: item.prescriberPhone || item.phone,
            prescriberAddress: item.prescriberAddress || item.address,
            prescriberCity: item.prescriberCity || item.city,
            isArchived: item.isArchived || false
        }));
        setUpdatedPresData(transformedData);
        setFilteredPresData(transformedData);
    }, [prescribersData]);

    useEffect(() => {
        const filterValue = globalFilter.toLowerCase();
        const filtered = updatedPresData.filter((item: any) => {
            if (activeTab === "Active List" && item.isArchived) return false;
            if (activeTab === "Archives" && !item.isArchived) return false;
            
            if (typeof item[selectedFilterField] === 'string') {
                return item[selectedFilterField].toLowerCase().includes(filterValue);
            }
            return false;
        });
        setFilteredPresData(filtered);
    }, [globalFilter, selectedFilterField, updatedPresData, activeTab]);

    const handleArchiveToggle = (prescriberId: string, archiveStatus: boolean) => {
        setUpdatedPresData(prev => prev.map(item => 
            item.id === prescriberId ? { ...item, isArchived: archiveStatus } : item
        ));
    };

    const handleInviteClick = () => {
        console.log("Invite button clicked");
        // Add your invite logic here
    };

    return (
        <div className="bg-white rounded-lg theme-shadow p-4 h-full">
            <div className="flex flex-col gap-4 pb-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-medium tracking-tighter">
                        {activeTab === "Active List" ? "Prescribers List" : "Archived Prescribers"}
                    </h1>
                    <button 
                        onClick={handleInviteClick}
                        className="flex items-center gap-2 bg-[#163066] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <span className="hidden md:inline text-sm">Invite Link</span>
                        <img src="/invite-link.svg" alt="" className="w-2.5 h-2.5" />
                    </button>
                </div>
                
                {/* Mobile Header Layout */}
                <div className="md:hidden flex flex-col gap-3">
                    <div className="flex justify-between items-center gap-2">
                        <SearchField 
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                            placeholder="Search"
                            className="flex-1"
                        />
                        <FilterField
                            columns={filterOptions}
                            selectedValue={selectedFilterField}
                            onChange={setSelectedFilterField}
                            className="w-[100px]"
                        />
                    </div>
                    <ThemeButtonTabs
                        data={["Active List", "Archives"]}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        className="w-full"
                    />
                </div>
                
                {/* Desktop Header Layout */}
                <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-4">
                        <ThemeButtonTabs
                            data={["Active List", "Archives"]}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            className="md:min-w-[200px]"
                        />
                    </div>
                    
                    <div className="flex gap-2">
                        <SearchField 
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                            placeholder={`Search ${activeTab.toLowerCase()} here`}
                            className="min-w-[200px]"
                        />
                        <FilterField
                            columns={filterOptions}
                            selectedValue={selectedFilterField}
                            onChange={setSelectedFilterField}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                {isLoading ? (
                    <div className="text-center py-4 w-10 text-gray-500 col-span-full">
                        <Loading />
                    </div>
                ) : filteredPresData.length > 0 ? filteredPresData.map((item: any) => (
                    <PrescriberCard 
                        key={item.id}
                        prescriber={item}
                        isAdmin={isAdmin}
                        onArchiveToggle={handleArchiveToggle}
                    />
                )) : <p className="col-span-full">No {activeTab === "Active List" ? "active" : "archived"} prescribers found.</p>}
            </div>
        </div>
    );
};

export default Prescribers;