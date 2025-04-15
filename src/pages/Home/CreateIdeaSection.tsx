import React from 'react';
import Button from '../../components/Button/Button';

const CreateIdeaSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-primary-white text-center px-6 md:px-8 py-20 md:py-48 relative">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/createidea-bg.png')" }}>
      </div>
      <div className="relative">
        <p className="text-base md:text-lg mb-2">Get An Idea Of The Application</p>

        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-semibold mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
          dignissim, metus nec fringilla accumsan, risus sem
          sollicitudin lacus, ut interdum tellus elit sed risus.
        </h1>

        <p className="text-base sm:text-xl md:text-2xl lg:max-w-4xl mx-auto mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
          molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
          accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
        </p>
        <Button title='Get A Free Demo' textColor='text-black' className="bg-white text-primary-black font-medium hover:!text-white md:py-3.5 md:px-32" />
      </div>
    </div>
  );
};

export default CreateIdeaSection;
