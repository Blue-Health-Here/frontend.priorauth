import React from "react";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
  description?: string;
  title: string;
  value: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ description, title, value, className }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/admin/${title.toLowerCase()}`);
      }}
      className={`cursor-pointer group min-h-[140px] w-full flex flex-col justify-between gap-3 rounded-lg p-5 theme-shadow bg-primary-white transition-colors border border-navbar-stroke ${className}
        transition-all duration-700 ease-in-out`}
    >
      <div className="font-secondary">
        <h3 className={`text-sm md:text-base ${title === "Today's Request" && 'text-white'} text-primary-black lg:text-lg font-semibold transition-colors duration-800 ease-in-out`}>
          {title}
        </h3>
        <p className={`text-xs md:text-sm lg:text-sm mt-2 ${title === "Today's Request" && 'text-white'} text-tertiary-black transition-colors duration-800 ease-in-out line-clamp-2`}>
          {description}
        </p>
      </div>
      <div className={`text-xl md:text-3xl lg:text-4xl font-semibold ${title === "Today's Request" && 'text-white'} text-primary-black transition-colors duration-800 ease-in-out`}>
        {value}
      </div>
    </div>
  );
};

export default StatCard;