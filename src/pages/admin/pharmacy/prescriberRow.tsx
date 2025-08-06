// PrescriberRow.tsx
import React from 'react';
import NameBadge from '@/components/NameBadge';

interface PrescriberRowProps {
  imageUrl?: string;
  name: string;
  totalRequests: number;
}

const PrescriberRow: React.FC<PrescriberRowProps> = ({ name, totalRequests }) => {
  return (
    <div className="flex items-center justify-between py-0.5 px-2 border border-quaternary-navy-blue rounded-lg last:border-b-0">
      <div className="flex items-center space-x-4">
        <NameBadge
          data={{ name, textColor: "#fff" }}
          showName={false}
        />
        <span className="text-sm font-medium text-gray-900">{name}</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium text-gray-900">{totalRequests}</span>
        <span className="text-xs text-gray-500">Total Requests</span>
      </div>
    </div>
  );
};

export default PrescriberRow;