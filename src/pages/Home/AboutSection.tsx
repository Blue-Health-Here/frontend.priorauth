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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.',
            1000,
          ]}
          speed={60}
          wrapper="h1"
          cursor={false}
          repeat={Infinity}
          className="text-xl md:text-3xl lg:text-5xl font-semibold min-h-[150px] inline-block"
        />
      </div>
      {/* <h1 className="text-xl sm:text-3xl md:text-5xl font-semibold">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
        elit sed risus.
      </h1> */}
     </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-0 md:mb-6">
        <div className="lg:col-span-2"></div>
        <div className="lg:col-span-6">
          <p className="text-base sm:text-xl md:text-2xl text-secondary-black my-0 md:my-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
            fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
            elit sed risus.
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
