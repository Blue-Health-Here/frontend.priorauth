import React from 'react';

type LabelValuePair = [string, string];
type DataRow = LabelValuePair[];
export type DataGrid = DataRow[];

interface MedicationDetailsProps {
  title: string;
  data: DataGrid;
  className?: string;
}

export const MedicationDetails: React.FC<MedicationDetailsProps> = ({
  title,
  data,
  className = '',
}) => {
  return (
    <div className={`border border-quaternary-navy-blue rounded-xl overflow-hidden ${className}`}>
      <div className="bg-quaternary-navy-blue px-3 py-2">
        <h3 className="text-sm sm:sm:text-md font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div className="p-2">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid grid-cols-3 gap-2 ${rowIndex < data.length - 1 ? 'mb-2' : ''}`}
          >
            {row.map(([label, value], itemIndex) => (
              <div key={itemIndex} className="flex flex-col space-y-0.5 p-2">
                <span className="text-[10px] sm:text-xs font-medium text-gray-500">{label}</span>
                <span className="text-[10px] sm:text-sm font-semibold text-gray-800">{value || '-'}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};