import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section className="px-6 md:px-10 py-20 bg-primary-white">
      <div className="text-primary-black">
      <p className="text-base md:text-lg">About Priorauth Support</p>
      <h1 className="text-xl sm:text-3xl md:text-5xl font-semibold">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
        elit sed risus.
      </h1>
     </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-6">
          <p className="text-lg sm:text-xl md:text-2xl text-secondary-black my-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
            fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
            elit sed risus.
          </p>
        </div>
        <div className="md:col-span-4"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-6">
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
    </section>
  );
};

export default AboutSection;
