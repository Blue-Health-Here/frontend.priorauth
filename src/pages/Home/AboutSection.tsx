import React from "react";
import { TypeAnimation } from "react-type-animation";
import BrandSlider from "./BrandSlider";

const AboutSection: React.FC = () => {
  return (
    <section id="about">
      <div className="px-6 md:px-10 py-20 bg-primary-white">
        <div className="text-primary-black">
          <p className="text-base md:text-lg">About Priorauth Support</p>
          <div>
            <TypeAnimation
              sequence={[
                'PriorAuth mission is to empower teams to bring their creative visions to life. The platform allows users to create and manage relational databases through an intuitive, no-code interface. This hybrid approach enables the organization of data in a spreadsheet-like format while offering advanced features typically associated with databases.',
                1000,
              ]}
              speed={60}
              wrapper="h1"
              cursor={false}
              repeat={Infinity}
              className="text-xl md:text-3xl lg:text-5xl font-semibold min-h-[150px] inline-block"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-0 md:mb-6">
          <div className="lg:col-span-2"></div>
          <div className="lg:col-span-6">
            <p className="text-base sm:text-xl md:text-2xl text-secondary-black my-0 md:my-8">
              PriorAuth combines the simplicity of spreadsheets with the power of databases, offering 
              customizable fields, multiple views (like grid, calendar, and Kanban), real-time collaboration,
               and automation features. Its integration capabilities with tools like Slack and Google 
               Drive make it a versatile solution for managing diverse workflows
            </p>
          </div>
          <div className="lg:col-span-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="lg:col-span-2 md:col-span-1"></div>
          <div className="lg:col-span-6 md:col-span-7">
            <img
              src={'/images/about-rectangle-one.png'}
              alt="Image 1"
              className="w-full h-full"
            />
          </div>
          <div className="md:col-span-3">
            <img
              src={'/images/about-rectangle-two.png'}
              alt="Image 2"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <BrandSlider />
    </section>
  );
};

export default AboutSection;
