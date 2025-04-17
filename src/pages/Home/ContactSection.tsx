import React from "react"
import Button from "../../components/Button/Button"
import InputField from "../../components/input/InputField"

const ContactSection: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative flex items-center justify-end">
      <div className="absolute inset-0 z-0 bg-gray-800 overflow-hidden">
        <img
          src="/images/contact-section.png"
          alt="Background hands"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-4xl p-4 pr-0 mr-0">
        <div className="bg-primary-sky-blue text-primary-white p-6 rounded-bl-3xl rounded-tl-3xl shadow-lg">
          <div className="text-sm md:text-base lg:text-lg mb-4">Get Demo</div>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-semibold mb-6">
            Want To See Prior Auth Support AI In Action?
          </h2>

          <form className="space-y-4">
            <InputField variant="contact" type="text" placeholder="Full Name" />
            <InputField variant="contact" type="tel" placeholder="Phone Number" />
            <InputField variant="contact" type="email" placeholder="Email" />
            <InputField variant="contact" type="text" placeholder="Message" />

            <div className="pt-4">
              <Button title="Submit" noHover textColor="text-black" className="bg-white text-primary-black font-medium px-6 py-2 " />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;