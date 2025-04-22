import { Form, Formik } from "formik";
import React, { useState } from "react";
import InputField, { inputStyles } from "../../../components/common/form/InputField";
import Button from "../../../components/common/Button";

const AddNewPharmacy: React.FC = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

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
      {/* <div>
                <Formik
                    initialValues={{ name: "", email: "" }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        console.log(values)
                    }} 
                >
                    {({ values }) => {
                        return (
                            <Form className="p-6 bg-white shadow-lg rounded-lg">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <h1 className="text-lg md:text-xl font-semibold">Account</h1>
   
                                    Save Changes
                                </div>
                                <div className="flex flex-col-reverse md:flex-row gap-4 gap-x-8 pt-8">
                                    <div className="w-full space-y-4">
                                        <InputField variant='contact' type='text' label="Full Name" className="placeholder:text-[#4E4E4E]" name="name" placeholder="Full Name" />
                                        <InputField variant='contact' type='email' label="Email" className="bg-gray-200 placeholder:text-[#4E4E4E]" name="email" placeholder="johndoe@gmail.com" />
                                    </div>

                                    <div className="flex flex-col items-center w-auto">
                                        <div className="relative">
                                            <div className='w-[120px] h-[120px] overflow-hidden rounded-md'>

                                                <img
                                                    src="/images/Abstergo Ltd..png"
                                                    alt="Abstergo logo"
                                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                                                />
                                            </div>
                                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                                <button
                                                    type='button'
                                                    className="p-1 bg-white rounded-md shadow-lg"
                                                >
                                                    <div className="text-gray-600 w-3 h-3">X</div>
                                                </button>
                                                <button
                                                    type='button'
                                                    className="p-1 bg-white rounded-md shadow-lg"
                                                >
                                                 <div className="text-gray-600 w-3 h-3">Pen</div>

                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-[#A1A5B7] mt-4 text-center whitespace-nowrap font-semibold">
                                            Allowed file types: png, jpg, jpeg.
                                        </p>
                                 
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div> */}
      <h2 className="text-lg font-semibold mb-6">Add Pharmacy</h2>
      <Formik
                    initialValues={{ name: "", email: "" }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        console.log(values)
                    }} 
                >
                  <Form>
                    <div className="flex items-center justify-center md:block">
          <div className="w-44 h-44 p-5 rounded-md relative overflow-hidden bg-secondary-background">
            {logoPreview ? (
              <img src={logoPreview} alt="Logo Preview" className="w-full h-full" />
            ) : (
              <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center justify-center text-center gap-2 w-full h-full">
                  <img src="/upload.svg" alt="Upload Icon" className="w-8 h-8" />
              <div className="leading-[110%]">
              <p className="text-base md:text-lg lg:text-xl font-medium text-primary-black">Upload Logo</p>
              <p className="text-xs sm:text-sm md:text-base text-secondary-black">Max image size allowed 10mb</p>
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
          <InputField className={inputStyles.defaultInput}  type="text" label="Name" placeholder="Pharmacy Name" name="fullname" />
          <InputField className={inputStyles.defaultInput}  type="email" label="Email" placeholder="Email Address" name="phone" />
          <InputField className={inputStyles.defaultInput}  type="tel" label="Phone" placeholder="Phone Number" name="email" />
          <InputField className={inputStyles.defaultInput}  type="text" label="Location" placeholder="Location" name="message" />
        </div>
      <div className="mt-10 flex justify-end space-x-4">
      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <Button
                            title="Cancel"
                            textColor="text-primary-sky-blue"
                            className="sm:w-24 px-6 bg-primary-white border border-primary-sky-blue hover:bg-primary-sky-blue hover:text-primary-white"
                            noHover
                        />
                        <Button
                            title="Save"
                            className="sm:w-24 px-6"
                        />
                    </div>
      </div>
      </Form>
      </Formik>
    </div>
  );
};

export default AddNewPharmacy;