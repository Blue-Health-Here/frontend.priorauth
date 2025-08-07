import React from 'react';
import { useLocation, useParams } from 'react-router-dom'; 
import PharmacyRequests from '@/pages/pharmacy/requests';
import PharmacyProfileCard from './pharmacyProfileCard';
import SummaryCard from './summaryCard';
import TopPrescribersCard from './topPrescribersCard';


const PharmacyDetailScreen: React.FC = () => {
  const { state } = useLocation();
  const pharmacyData = state?.pharmacyData;
  const { pharmacyId } = useParams();

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

  // Mock data for top prescribers - replace with your actual data
  const topPrescribers = [
    { id: '1', name: 'Dr. John Smith', totalRequests: 42 },
    { id: '2', name: 'Dr. Sarah Johnson', totalRequests: 38 },
    { id: '3', name: 'Dr. Michael Brown', totalRequests: 35 },
    { id: '4', name: 'Dr. Emily Davis', totalRequests: 28 },
    { id: '5', name: 'Dr. Robert Wilson', totalRequests: 25 },
  ];

  return (
    <div className="space-y-6">
      {/* Cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PharmacyProfileCard pharmacy={pharmacyData} />
        <SummaryCard pharmacy={summaryData} />
        <TopPrescribersCard prescribers={topPrescribers} />
      </div>
      
      <PharmacyRequests pharmacyId={pharmacyId!} />
    </div>
  );
};

export default PharmacyDetailScreen;
