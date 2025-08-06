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
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <PharmacyProfileCard pharmacy={pharmacyData} />
        </div>
        <div className="flex-1 min-w-0">
          <SummaryCard pharmacy={summaryData} />
        </div>
        <div className="flex-1 min-w-0">
          <TopPrescribersCard prescribers={topPrescribers} />
        </div>
      </div>
      
      <PharmacyRequests pharmacyId={pharmacyId!} />
    </div>
  );
};

export default PharmacyDetailScreen;