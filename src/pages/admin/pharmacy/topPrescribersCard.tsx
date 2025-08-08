import React from 'react';
import PrescriberRow from './prescriberRow';
import ThemeButton from '@/components/common/ThemeButton';
import { useNavigate } from 'react-router-dom';

interface PrescriberData {
  id: string;
  prescriber: string;
  totalRequests: number;
  pictureUrl?: string;
}

interface TopPrescribersCardProps {
  prescribers: PrescriberData[];
}

const TopPrescribersCard: React.FC<TopPrescribersCardProps> = ({ prescribers }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary-white rounded-lg border border-input-stroke p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-primary-black">Prescribers</h3>
        <ThemeButton 
          variant="tertiary"
          onClick={() => navigate("/admin/prescribers")}
          className="text-primary-navy-blue border border-navy-blue-600 rounded-md px-2 py-1 text-xs hover:bg-navy-blue-50 transition-colors"
        >
          View All
        </ThemeButton>
      </div>
      <div className="space-y-2 max-h-[260px] overflow-auto">
        {prescribers?.length > 0 ? prescribers.map((prescriber) => (
          <PrescriberRow
            key={prescriber.id}
            name={prescriber.prescriber}
            totalRequests={prescriber.totalRequests}
            imageUrl={prescriber.pictureUrl}
          />
        )) : (
          <div className="text-left text-gray-500 text-sm">
            No prescribers found
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPrescribersCard;