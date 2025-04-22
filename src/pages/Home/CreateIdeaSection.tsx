import React from 'react';
import Button from '../../components/common/Button';
import { TypeAnimation } from 'react-type-animation';

const CreateIdeaSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-primary-white text-center px-6 md:px-8 py-20 md:py-48 relative">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/createidea-bg.png')" }}>
      </div>
      <div className="relative" data-aos="fade-up" data-aos-duration="6000">
        <p className="text-base md:text-lg mb-2">Get An Idea Of The Application</p>
        <TypeAnimation
          sequence={[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.',
            4000,
          ]}
          speed={80}
          wrapper="h1"
          cursor={false}
          repeat={0}
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-semibold mb-6 sm:mb-8 lg:mb-10"
        />

        <p className="text-base sm:text-xl md:text-2xl lg:max-w-4xl mx-auto mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
          molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
          accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
        </p>
        <Button title='Get A Free Demo' textColor='text-black' noHover className="bg-primary-white text-primary-black font-medium sm:w-80" />
      </div>
    </div>
  );
};

export default CreateIdeaSection;
