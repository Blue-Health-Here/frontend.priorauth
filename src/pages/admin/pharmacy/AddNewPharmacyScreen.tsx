import { Form, Formik, FormikValues } from "formik";
import React, { useState } from "react";
import InputField from "../../../components/common/form/InputField";
import FileDropzone from "@/components/common/FileDropzone";
import { pharmacyValidationSchema } from "../../../utils/validationSchema";
import toast from "react-hot-toast";
import { addNewPharmacy } from "../../../services/adminService";
import { useDispatch } from "react-redux";
import { addNewPharmacyInitialVals } from "../../../utils/initialVals";
import { useNavigate } from "react-router-dom";
import ThemeButton from "@/components/common/ThemeButton";

const LOCATION_OPTIONS = [
  { value: "new_york", label: "New York" },
  { value: "california", label: "California" },
  { value: "texas", label: "Texas" },
  { value: "florida", label: "Florida" },
  { value: "illinois", label: "Illinois" },
  { value: "pennsylvania", label: "Pennsylvania" },
  { value: "ohio", label: "Ohio" },
];

const AddNewPharmacyScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (values: FormikValues) => {
    try {
      const response = await addNewPharmacy(dispatch, {
        companyId: "6414b19d-5a7e-4a8a-a632-f41b158839fe",
        pharmacyLogo: files[0] || "",
        ...values,
      });
      if (response) {
        navigate("/admin/pharmacies");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!!");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="rounded-2xl bg-primary-white shadow-lg p-5 min-h-[calc(100vh-20rem)]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/pharmacies")}
            className="p-2 rounded-md bg-secondary-background"
          >
            <img src="/back-icon.svg" alt="Back" className="w-4 h-5" />
          </button>
          <h2 className="text-lg md:text-xl font-semibold">Add Pharmacy</h2>
        </div>
        <div className="hidden md:flex gap-3">
          <ThemeButton
            className="rounded-lg py-2.5 !bg-transparent border border-quaternary-navy-blue-dark !text-primary-navy-blue"
            variant="secondary"
            type="button"
            onClick={() => navigate("/admin/pharmacies")}
          >
            Cancel
          </ThemeButton>
          <ThemeButton
            className="min-w-[130px] rounded-lg py-2.5"
            variant="primary"
            type="submit"
            form="pharmacyForm"
          >
            Save Pharmacy
          </ThemeButton>
        </div>
      </div>

      <Formik
        initialValues={{
          ...addNewPharmacyInitialVals,
          pointOfContact: "",
          location: "",
        }}
        validationSchema={pharmacyValidationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form id="pharmacyForm">
            <div className="mb-8">
              <h2 className="text-lg font-medium text-primary-black mb-4">
                Add Logo
              </h2>
              <div className="w-full md:w-[416px] h-[82px]">
                <FileDropzone
                  onFileChange={handleFileChange}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  isDragging={isDragging}
                  files={files}
                />
              </div>
            </div>

            <h3 className="text-lg font-medium text-primary-black mb-6">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <InputField
                  className="w-full"
                  type="text"
                  label="Name"
                  placeholder="eg: Healthcare Pharmacy"
                  name="name"
                />
              </div>
              <div>
                <InputField
                  className="w-full"
                  type="email"
                  label="Email"
                  placeholder="eg: healthcare@mail.com"
                  name="email"
                />
              </div>
              <div>
                <InputField
                  className="w-full"
                  type="text"
                  label="Point of Contact"
                  placeholder="eg: John Smith"
                  name="pointOfContact"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <InputField
                  className="w-full"
                  type="tel"
                  label="Phone Number"
                  placeholder="eg: +1 000-000-000"
                  name="phoneNumber"
                />
              </div>
              <div className="">
                <label className="block text-quaternary-white text-sm font-secondary mb-1">
                  Location
                </label>
                <div className="relative">
                  <select
                    name="location"
                    value={values.location}
                    onChange={(e) => setFieldValue("location", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-sky-blue focus:border-transparent appearance-none"
                  >
                    <option value="">Select location</option>
                    {LOCATION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <img
                      src="/dropdown.svg"
                      alt="Dropdown arrow"
                      className="w-3 h-3"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile buttons - shown only on mobile and placed at the end of the form */}
            <div className="md:hidden flex gap-3 mt-8">
              <ThemeButton
                className="rounded-lg py-2.5 !bg-transparent border border-quaternary-navy-blue-dark !text-primary-navy-blue flex-1"
                variant="secondary"
                type="button"
                onClick={() => navigate("/admin/pharmacies")}
              >
                Cancel
              </ThemeButton>
              <ThemeButton
                className="min-w-[130px] rounded-lg py-2.5 flex-1"
                variant="primary"
                type="submit"
                form="pharmacyForm"
              >
                Save Pharmacy
              </ThemeButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewPharmacyScreen;
