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
import { useNavigate } from "react-router-dom";

const Prescribers: React.FC<any> = ({ isAdmin }) => {
    const { prescribersData } = useSelector((state: RootState) => state.prescribers);
    const isFetchedPrescribers = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [updatedPresData, setUpdatedPresData] = useState([]);
    const [filteredPresData, setFilteredPresData] = useState([]);
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
            prescriber: item.prescriber || item.firstName + " " + item.lastName,
            prescriberPhone: item.prescriberPhone || item.phone,
            prescriberAddress: item.prescriberAddress || item.address,
            prescriberCity: item.prescriberCity || item.city,
            npi: item.npi
        }));
        setUpdatedPresData(transformedData);
        setFilteredPresData(transformedData);
    }, [prescribersData]);

    useEffect(() => {
        const filterValue = globalFilter.toLowerCase();
        const filtered = updatedPresData.filter((item: any) => {
            if (typeof item[selectedFilterField] === 'string') {
                return item[selectedFilterField].toLowerCase().includes(filterValue);
            }
            return false;
        });
        setFilteredPresData(filtered);
    }, [globalFilter, selectedFilterField, updatedPresData]);

    const handleArchiveClick = () => {
        navigate('/prescribers/archive');
    };

    return (
        <div className="bg-white rounded-lg theme-shadow p-4 h-full">
            <div className="flex flex-col gap-4 pb-6">
                <h1 className="text-xl font-medium tracking-tighter">Prescribers List</h1>
                
                {/* Single row with all elements */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
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
                            placeholder="Search for request here"
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

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                {isLoading ? (
                    <div className="text-center py-4 w-10 text-gray-500">
                        <Loading />
                    </div>
                ) : filteredPresData.length > 0 ? filteredPresData.map((item: any) => (
                    <PrescriberCard key={item.prescriber} prescriber={item} isAdmin={isAdmin} isDetails={false} />
                )) : <p>No prescribers found.</p>}
            </div>
        </div>
    )
};

export default Prescribers;