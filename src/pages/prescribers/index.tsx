import Loading from "@/components/common/Loading";
import PrescriberCard from "@/components/PrescriberCard";
import { getAllUserPrescribers } from "@/services/adminService";
import { getAllPrescribers } from "@/services/pharmacyService";
import { RootState } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Prescribers: React.FC<any> = ({ isAdmin }) => {
    const { prescribersData } = useSelector((state: RootState) => state.prescribers);
    const isFetchedPrescribers = useRef(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [updatedPresData, setUpdatedPresData] = useState([]);

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
        setUpdatedPresData(prescribersData.map((item: any) => ({ 
            prescriber: item.prescriber || item.firstName + " " + item.lastName,
            prescriberPhone: item.prescriberPhone || item.phone,
            prescriberAddress: item.prescriberAddress || item.address,
            prescriberCity: item.prescriberCity || item.city,
            npi: item.npi
        })))
    }, [prescribersData]);

    return (
        <div className="bg-white rounded-lg theme-shadow p-4 h-full">
            <h1 className="text-xl font-medium tracking-tighter">Prescribers List</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 pt-6">
                {isLoading ? (
                    <div className="text-center py-4 w-10 text-gray-500">
                        <Loading />
                    </div>
                ) : updatedPresData.length > 0 ? updatedPresData.map((item: any) => (
                    <PrescriberCard key={item.prescriber} prescriber={item} isAdmin={isAdmin} isDetails={false} />
                )) : <p>Data not found.</p>}
            </div>
        </div>
    )
};

export default Prescribers;