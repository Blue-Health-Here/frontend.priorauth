

import React from "react";
import dashboardImg from "../../assets/images/Dashboard 2.png";
import homebackgroundImg from "../../assets/images/herosection-bg-image.png";
import Header from "./Header";

const HeroSection: React.FC = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-between pt-20"
      style={{ backgroundImage: `url(${homebackgroundImg})` }}
    >
      <Header />
      <div className="flex flex-col items-center text-center px-4 md:px-0 mt-8 flex-grow">
        <h1 className="text-4xl md:text-7xl font-semibold text-blue-900 leading-tight">
          Automate Specialty
          <br />
          Medication Workflows.
        </h1>
        <img
          src={dashboardImg}
          alt="Dashboard"
          className="mt-auto max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default HeroSection;
