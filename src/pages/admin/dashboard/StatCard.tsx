import React from "react";

interface StatCardProps {
  description: string;
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ description, title, value }) => {
  return (
    <div
      className="group min-h-[170px] h-full w-full rounded-2xl p-5 shadow-lg bg-white
             transition-colors transition-background duration-700 ease-in-out  hover:bg-gradient-to-br hover:from-[#1594CC] hover:to-[#163066]"
    >
      <div className="font-secondary">
        <p className="text-sm md:text-base lg:text-lg text-secondary-black group-hover:text-white transition-colors duration-800 ease-in-out">
          {title}
        </p>
        <h3 className="text-xs md:text-sm lg:text-base mt-2 text-tertiary-black group-hover:text-white transition-colors duration-800 ease-in-out">
          {description}
        </h3>
      </div>
      <div className="text-xl md:text-3xl lg:text-5xl font-semibold mt-5 text-primary-black group-hover:text-white transition-colors duration-800 ease-in-out">
        {value}
      </div>
    </div>
  );
};

export default StatCard;
