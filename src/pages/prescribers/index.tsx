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
import ThemeButton from "@/components/common/ThemeButton";
import InviteLinkModal from "./InviteLinkModal";

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
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const filterOptions = [
        { field: "prescriber", filterable: true, header: "Name" },
        { field: "prescriberPhone", filterable: true, header: "Phone" },
        { field: "prescriberAddress", filterable: true, header: "Address" },
        { field: "npi", filterable: true, header: "NPI" }
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
        setIsInviteModalOpen(true);
    };

    return (
        <div className="bg-white rounded-lg theme-shadow p-4 h-full">
            <div className="flex flex-col gap-2 pb-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-medium tracking-tighter">
                        {activeTab === "Active List" ? "Prescribers List" : "Prescribers List"}
                    </h1>
                    <ThemeButton variant="primary" onClick={handleInviteClick}>
                        <span className="hidden md:inline-flex gap-2 items-center text-sm">
                            Invite Link
                            <img src="/invite-link.svg" alt="" className="w-3.5 h-3.5" />
                        </span>
                    </ThemeButton>
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
                            label="Sort By"
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
                            label="Sort By"
                            columns={filterOptions}
                            selectedValue={selectedFilterField}
                            onChange={setSelectedFilterField}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

            {/* Invite Link Modal */}
            {isInviteModalOpen && (
                <InviteLinkModal 
                    onClose={() => setIsInviteModalOpen(false)}
                    prescribers={updatedPresData.map(p => ({
                        id: p.id,
                        name: p.prescriber
                    }))}
                />
            )}
        </div>
    );
};

export default Prescribers;