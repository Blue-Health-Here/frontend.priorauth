import { Form, Formik } from "formik";
import React, { useState } from "react";
import InputField, {
  inputStyles,
} from "../../../components/common/form/InputField";
import Button from "../../../components/common/Button";

const AddNewPharmacy: React.FC = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="rounded-2xl bg-primary-white shadow-lg p-5 min-h-[calc(100vh-20rem)]">
      <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center justify-center md:block">Add Pharmacy</h2>
      <Formik
        initialValues={{ name: "", email: "" }}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <div className="flex items-center justify-center md:block">
            <div className="w-44 h-44 p-5 rounded-md relative overflow-hidden bg-secondary-background">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-full h-full"
                />
              ) : (
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer flex flex-col items-center justify-center text-center gap-2 w-full h-full"
                >
                  <img
                    src="/upload.svg"
                    alt="Upload Icon"
                    className="w-8 h-8"
                  />
                  <div className="leading-[110%]">
                    <p className="text-base md:text-lg lg:text-xl font-medium text-primary-black">
                      Upload Logo
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-secondary-black">
                      Max image size allowed 10mb
                    </p>
                  </div>
                </label>
              )}
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <InputField
              className={inputStyles.defaultInput}
              type="text"
              label="Name"
              placeholder="Pharmacy Name"
              name="fullname"
            />
            <InputField
              className={inputStyles.defaultInput}
              type="email"
              label="Email"
              placeholder="Email Address"
              name="phone"
            />
            <InputField
              className={inputStyles.defaultInput}
              type="tel"
              label="Phone"
              placeholder="Phone Number"
              name="email"
            />
            <InputField
              className={inputStyles.defaultInput}
              type="text"
              label="Location"
              placeholder="Location"
              name="message"
            />
          </div>
          <div className="mt-10 md:flex md:justify-end space-x-4">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <Button
                title="Cancel"
                textColor="text-primary-sky-blue"
                className="w-full md:w-24 px-6 bg-primary-white border border-primary-sky-blue hover:bg-primary-sky-blue hover:text-primary-white"
                noHover
              />
              <Button title="Save" className="w-full md:w-24 px-6" />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddNewPharmacy;
