import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; 
import PharmacyRequests from '@/pages/pharmacy/requests';
import PharmacyProfileCard from './pharmacyProfileCard';
import SummaryCard from './summaryCard';
import TopPrescribersCard from './topPrescribersCard';
import toast from 'react-hot-toast';
import { getAllPrescribers } from '@/services/pharmacyService';
import { useDispatch } from 'react-redux';


const PharmacyDetailScreen: React.FC = () => {
  const [topPrescribers, setTopPrescribers] = useState([]);
  const { state } = useLocation();
  const pharmacyData = state?.pharmacyData;
  const { pharmacyId } = useParams();
  const dispatch = useDispatch();

  if (!pharmacyData) {
    return <div>No pharmacy data available</div>;
  }

  const summaryData = {
    totalRequests: pharmacyData.totalRequests || 0,
    approvedRequests: pharmacyData.approvedRequests || 0,
    deniedRequests: pharmacyData.deniedRequests || 0,
    pendingRequests: pharmacyData.pendingRequests || 0,
    approvalRate: pharmacyData.approvalRate
  };

  const fetchPharmacyPrescribers = async () => {
    try {
      const response = await getAllPrescribers(dispatch, pharmacyId);
      if (response) {
        setTopPrescribers(response);
      } else {
        setTopPrescribers([]);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchPharmacyPrescribers();
  }, []);

  return (
    <div className="space-y-6">
      {/* Cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PharmacyProfileCard pharmacy={pharmacyData} />
        <SummaryCard pharmacy={summaryData} />
        <TopPrescribersCard prescribers={topPrescribers} />
      </div>
      
      <PharmacyRequests pharmacyName={pharmacyData?.firstName} pharmacyId={pharmacyId!} />
    </div>
  );
};

export default PharmacyDetailScreen;
