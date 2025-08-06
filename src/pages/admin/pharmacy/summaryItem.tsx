import React from "react";

interface SummaryItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  status?: 'approved' | 'denied' | 'pending' | 'neutral';
}

const SummaryItem: React.FC<SummaryItemProps> = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center p-2 border border-quaternary-navy-blue rounded-lg mb-2 h-13">
      <div className="flex items-center justify-center w-6 h-6 mr-3 rounded-md bg-navy-blue-500">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-base font-bold">{value}</div>
      </div>
    </div>
  );
};

export default SummaryItem;