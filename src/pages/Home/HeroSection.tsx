import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 md:px-0 mt-8 flex-grow">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-10 mb-6">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-8">
          <h1 className="text-xl sm:text-3xl md:text-6xl lg:text-8xl font-semibold text-blue-900 leading-tight">
            Automate Specialty Medication Workflows.
          </h1>
        </div>
      </div>
   
       <div className="grid grid-cols-12 gap-4 mt-auto">
        <div className="col-span-1"></div>
        <div className="col-span-10">
        <img
        src="/images/Dashboard 2.png"
        alt="Dashboard"
        className=" max-w-full"
      />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
