import React from "react"
import Button from "../../components/common/Button"
import InputField, { inputStyles } from "../../components/common/form/InputField"
import { Form, Formik } from "formik";
import { contactUsInitialVals } from "../../utils/initialVals";
import { contactUsValidationSchema } from "../../utils/validationSchema";

const ContactSection: React.FC = () => {
  return (
    <section className="w-full min-h-screen relative flex items-center justify-end" id="contact">
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
          <Formik
            initialValues={contactUsInitialVals}
            validationSchema={contactUsValidationSchema}
            onSubmit={(values) => {
              console.log("Form submitted with values:", values);
            }}
          >
            {() => (
              <Form className="space-y-4">
                <InputField className={inputStyles.contactInput} errorColor="text-red-700" type="text" placeholder="Full Name" name="fullname" />
                <InputField className={inputStyles.contactInput} errorColor="text-red-700" type="tel" placeholder="Phone Number" name="phone" />
                <InputField className={inputStyles.contactInput} errorColor="text-red-700" type="email" placeholder="Email" name="email" />
                <InputField className={inputStyles.contactInput} errorColor="text-red-700" type="text" placeholder="Message" name="message" />
                <div className="pt-4">
                  <Button title="Submit" noHover textColor="text-black" className="bg-primary-white text-primary-black font-medium sm:w-24" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;