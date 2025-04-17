import React from 'react';

interface StatCardProps {
  title: string;
  subtitle: string;
  value: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  subtitle, 
  value, 
  bgColor = 'bg-white',
  textColor = 'text-white',
  borderColor = ''
}) => {
  return (
    <div className={`rounded-lg p-4 shadow-sm ${bgColor} ${borderColor}`}>
      <div className="mb-2">
        <h3 className={`text-sm font-medium ${bgColor === 'bg-white' ? 'text-gray-600' : textColor}`}>
          {title}
        </h3>
        <p className={`text-xs ${bgColor === 'bg-white' ? 'text-gray-500' : 'text-blue-200'}`}>
          {subtitle}
        </p>
      </div>
      <div className="text-3xl font-bold mt-2 ${bgColor === 'bg-white' ? 'text-gray-800' : textColor}">
        {value}
      </div>
    </div>
  );
};

export default StatCard;
