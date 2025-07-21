import Loading from "@/components/common/Loading";
import PrescriberCard from "@/components/PrescriberCard";
import { getAllUserPrescribers } from "@/services/adminService";
import { getAllPrescribers } from "@/services/pharmacyService";
import { RootState } from "@/store";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchField from "@/components/common/SearchField";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";
import FilterField from "@/components/common/FilterField";
import ThemeButton from "@/components/common/ThemeButton";
import InviteLinkModal from "./InviteLinkModal";

const Prescribers: React.FC<any> = ({ isAdmin }) => {
    const { prescribersData } = useSelector((state: RootState) => state.prescribers);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const isFetchedPrescribers = useRef(false);

    const [isLoading, setIsLoading] = useState(false);
    const [updatedPresData, setUpdatedPresData] = useState<any[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedFilterField, setSelectedFilterField] = useState("prescriber");
    const [activeTab, setActiveTab] = useState("Active List");
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const isArchiveTab = activeTab === "Archives";

    const filterOptions = [
        { field: "prescriber", filterable: true, header: "Name" },
        { field: "prescriberPhone", filterable: true, header: "Phone" },
        { field: "prescriberAddress", filterable: true, header: "Address" },
        { field: "npi", filterable: true, header: "NPI" },
    ];

    const fetchAllPrescribers = async () => {
        setIsLoading(true);
        const fetchFn = isAdmin ? getAllUserPrescribers : () => getAllPrescribers(dispatch, user?.id);
        await fetchFn(dispatch);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!isFetchedPrescribers.current) {
            fetchAllPrescribers();
            isFetchedPrescribers.current = true;
        }
    }, []);

    useEffect(() => {
        const transformed = prescribersData.map((item: any) => ({
            ...item,
            prescriber: item.prescriber || `${item.firstName} ${item.lastName}`,
            prescriberPhone: item.prescriberPhone || item.phone,
            prescriberAddress: item.prescriberAddress || item.address,
            prescriberCity: item.prescriberCity || item.city,
            isArchived: item.isArchived || false,
        }));
        setUpdatedPresData(transformed);
    }, [prescribersData]);

    const filteredPresData = useMemo(() => {
        const filterValue = globalFilter.toLowerCase();
        return updatedPresData.filter((item) => {
            const value = item[selectedFilterField];
            return typeof value === "string" && value.toLowerCase().includes(filterValue);
        });
    }, [updatedPresData, globalFilter, selectedFilterField]);

    const displayedPrescribers = useMemo(() => {
        return filteredPresData.filter(item => item.isArchived === isArchiveTab);
    }, [filteredPresData, isArchiveTab]);

    const handleArchiveToggle = (name: string, archiveStatus: boolean) => {
        setUpdatedPresData(prev => {
            const updated = [...prev];
            const index = updated.findIndex(item => item.prescriber === name);
            if (index !== -1) {
                updated[index] = { ...updated[index], isArchived: archiveStatus };
            }
            return updated;
        });
    };

    const handleInviteClick = () => setIsInviteModalOpen(true);

    const handleTab = (value: string) => setActiveTab(value);

    return (
        <div className="bg-white rounded-lg theme-shadow p-4 h-full">
            {/* Header */}
            <div className="flex flex-col gap-2 pb-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-medium tracking-tighter">Prescribers List</h1>
                    <ThemeButton variant="primary" onClick={handleInviteClick}>
                        <span className="hidden md:inline-flex gap-2 items-center text-sm">
                            Invite Link <img src="/invite-link.svg" alt="" className="w-3.5 h-3.5" />
                        </span>
                    </ThemeButton>
                </div>

                {/* Filters for Mobile */}
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
                        setActiveTab={handleTab}
                        className="w-full"
                    />
                </div>

                {/* Filters for Desktop */}
                <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
                    <ThemeButtonTabs
                        data={["Active List", "Archives"]}
                        activeTab={activeTab}
                        setActiveTab={handleTab}
                        className="md:min-w-[200px]"
                    />
                    <div className="flex gap-2">
                        <SearchField
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                            placeholder="Search prescribers here"
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

            {/* Prescribers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoading ? (
                    <div className="text-center py-4 w-10 text-gray-500 col-span-full">
                        <Loading />
                    </div>
                ) : displayedPrescribers.length > 0 ? (
                    displayedPrescribers.map((item: any) => (
                        <PrescriberCard
                            key={item.prescriber}
                            prescriber={item}
                            isAdmin={isAdmin}
                            onArchiveToggle={(id, status) => handleArchiveToggle(id, status)}
                            isArchivedView={isArchiveTab}
                            showUnarchiveButton={isArchiveTab}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-secondary-black text-sm">No prescribers found.</p>
                )}
            </div>

            {/* Invite Modal */}
            {isInviteModalOpen && (
                <InviteLinkModal
                    onClose={() => setIsInviteModalOpen(false)}
                    prescribers={updatedPresData.map(p => ({ id: p.id, name: p.prescriber }))}
                />
            )}
        </div>
    );
};

export default Prescribers;
