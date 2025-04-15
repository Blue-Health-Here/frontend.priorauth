import React from "react";

const FooterSection: React.FC = () => {
  return (
    <footer className="px-6 md:px-8 pt-16 md:pt-24 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 text-secondary-black mb-20">
        <div className="md:col-span-4 lg:col-span-3">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="md:col-span-2 lg:col-span-5 hidden md:block"></div>
        <div className="md:col-span-6 lg:col-span-4">
          <div className="flex justify-start md:justify-end flex-wrap gap-4 md:gap-8 text-sm md:text-base lg:text-lg">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#faqs">FAQs</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 text-secondary-black text-sm md:text-base lg:text-lg mb-20">
        <div className="md:col-span-8"></div>
        <div className="md:col-span-4 text-left text-sm text-secondary-black md:text-right space-y-1">
          <p>(205) 555-0100</p>
          <p>info@priorauthsupport.com</p>
          <p>
            4140 Parker Rd, Allentown, New Mexico 31134
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 text-secondary-black text-sm md:text-base lg:text-lg mb-0 md:mb-20">
        <div className="md:col-span-4">
          <p className="">© 2025 Prior Auth Support AI. All rights reserved.</p>
        </div>
        <div className="md:col-span-2 hidden md:block"></div>
        <div className="md:col-span-6">
          <div className="flex justify-start md:justify-end gap-4">
            <a href="#privacy" className="">
              Privacy Policy
            </a>
            <a href="#terms" className="">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-primary-navy-blue my-4" />
      <img src="images/priorauth.svg" alt="" className="w-full"/>
    </footer>
  );
};
export default FooterSection;
