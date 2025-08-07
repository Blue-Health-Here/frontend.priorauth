import React from 'react';
import PrescriberRow from './prescriberRow';

interface PrescriberData {
  id: string;
  name: string;
  totalRequests: number;
  imageUrl?: string;
}

interface TopPrescribersCardProps {
  prescribers: PrescriberData[];
}

const TopPrescribersCard: React.FC<TopPrescribersCardProps> = ({ prescribers }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-primary-black">Prescribers</h3>
        <button 
          className="text-primary-navy-blue border border-navy-blue-600 rounded-md px-2 py-1 text-xs hover:bg-navy-blue-50 transition-colors"
        >
          View All
        </button>
      </div>
      <div className="space-y-2">
        {prescribers.map((prescriber) => (
          <PrescriberRow
            key={prescriber.id}
            name={prescriber.name}
            totalRequests={prescriber.totalRequests}
            imageUrl={prescriber.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default TopPrescribersCard;