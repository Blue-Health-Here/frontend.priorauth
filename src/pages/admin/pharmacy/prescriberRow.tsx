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
    <div className="flex items-center justify-between p-2 border border-quaternary-navy-blue rounded-lg">
      <div className="flex items-center space-x-4">
        <NameBadge
          data={{ name, textColor: "#fff" }}
          showName={false}
        />
        <span className="text-sm font-medium text-primary-black">{name}</span>
      </div>
      <div className="flex items-center space-x-1 text-primary-black">
        <span className="text-sm font-medium">{totalRequests}</span>
        <span className="text-xs">Total Requests</span>
      </div>
    </div>
  );
};

export default PrescriberRow;