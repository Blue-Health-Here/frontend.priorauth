import { Form, Formik } from "formik";
import React from "react";
import FileUpload from "../../../components/common/form/FileUpload";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";

const AdminSettings: React.FC = () => {
  const details = {
    name: "Wade Warren",
    email: "wade.warren@gmail.com",
    phone: "+1 (234) 567-8900",
    wpNo: "+1 (234) 567-8900",
    gender: "Female",
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
  };
  return (
    <div className="rounded-2xl bg-primary-white shadow-lg py-8 px-5 min-h-[calc(100vh-20rem)]">
      <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
      <div className="">
        <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center justify-center md:block">
          Profile
        </h2>
        <Formik
          initialValues={{ file: "" }}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <div className="flex items-center justify-center md:block">
              <FileUpload title="Upload Profile Image    " />
            </div>
          </Form>
        </Formik>
      </div>
        <div className="flex flex-col sm:flex-row items-start justify-start gap-3 ">
          <Link to="/admin/settings/change-password">
            <Button
            title="Change Password"
            textColor="text-primary-sky-blue"
            className="w-full sm:w-auto px-6 bg-primary-white border border-primary-sky-blue hover:bg-primary-sky-blue hover:text-primary-white"
            noHover
          /></Link>
          <Button title="Edit Details" className="w-full sm:w-auto px-6" />
        </div>

      </div>

      <div className="lg:w-4xl">
        <div className="mt-10">
          <h2 className="text-lg md:text-xl font-semibold text-primary-black mb-4">
            General Info
          </h2>
          <div className="flex flex-col">
            <div className="border-b border-light-stroke py-3">
              <div className="grid grid-cols-12">
                <h3 className="text-secondary-black text-sm md:text-base font-secondary  col-span-4">
                  Name
                </h3>
                <p className="text-secondary-black text-xs md:text-sm font-secondary  col-span-8">
                  {details.name}
                </p>
              </div>
            </div>
            <div className="border-b border-light-stroke py-3">
              <div className="grid grid-cols-12">
                <h3 className="text-secondary-black text-sm md:text-base font-secondary   col-span-4">
                  Email
                </h3>
                <p className="text-secondary-black text-xs md:text-sm font-secondary  col-span-8 ">
                  {details.email}
                </p>
              </div>
            </div>
            <div className="border-b border-light-stroke py-3">
              <div className="grid grid-cols-12">
                <h3 className="text-secondary-black text-sm md:text-base font-secondary  col-span-4">
                  Phone no.
                </h3>
                <p className="text-secondary-black text-xs md:text-sm font-secondary  col-span-8">
                  {details.phone}
                </p>
              </div>
            </div>
            <div className="border-b border-light-stroke py-3">
              <div className="grid grid-cols-12">
                <h3 className="text-secondary-black text-sm md:text-base font-secondary  col-span-4">
                  WhatsApp no.
                </h3>
                <p className="text-secondary-black text-xs md:text-sm font-secondary  col-span-8">
                  {details.wpNo}
                </p>
              </div>
            </div>
            <div className="border-b border-light-stroke py-3">
              <div className="grid grid-cols-12">
                <h3 className="text-secondary-black text-sm md:text-base font-secondary  col-span-4">
                  Gender
                </h3>
                <p className="text-secondary-black text-xs md:text-sm font-secondary  col-span-8">
                  {details.gender}
                </p>
              </div>
            </div>
            <div className="border-b border-light-stroke py-3">
              <div className="grid grid-cols-12">
                <h3 className="text-secondary-black text-sm md:text-base font-secondary  col-span-4">
                  Address
                </h3>
                <p className="text-secondary-black text-xs md:text-sm font-secondary  col-span-8">
                  {details.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
