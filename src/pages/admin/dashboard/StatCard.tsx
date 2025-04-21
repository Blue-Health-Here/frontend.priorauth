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
}) => {
  return (
    <div className={`min-h-[170px] w-full rounded-2xl p-5 shadow-lg ${bgColor} ${bgColor === bgColor ? 'text-primary-white' : 'text-secondary-black'}`}>
      <div className="font-secondary">
        <p className={`text-sm md:text-base lg:text-lg ${bgColor === 'bg-white' ? 'text-secondary-black' : 'text-primary-white'}`}>
          {subtitle}
        </p>
        <h3 className={`text-xs md:text-sm lg:text-base mt-2 ${bgColor === 'bg-white' ? 'text-tertiary-black' : textColor}`}>
          {title}
        </h3>
      </div>
      <div className={`text-xl md:text-3xl lg:text-5xl font-semibold mt-5 ${bgColor === 'bg-white' ? 'text-primary-black' : textColor}`}>
        {value}
      </div>
    </div>
  );
};

export default StatCard;
