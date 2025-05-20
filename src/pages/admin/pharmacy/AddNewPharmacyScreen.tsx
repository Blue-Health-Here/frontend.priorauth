import { Form, Formik, FormikValues } from "formik";
import React from "react";
import InputField, {
  inputStyles,
} from "../../../components/common/form/InputField";
import Button from "../../../components/common/Button";
import FileUpload from "../../../components/common/form/FileUpload";
import { pharmacyValidationSchema } from "../../../utils/validationSchema";
import toast from "react-hot-toast";
import { addNewPharmacy } from "../../../services/adminService";
import { useDispatch } from "react-redux";
import { addNewPharmacyInitialVals } from "../../../utils/initialVals";
import { useNavigate } from "react-router-dom";

const AddNewPharmacyScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: FormikValues) => {
    try {
      const response = await addNewPharmacy(dispatch, {
        companyId: "8ebc95eb-a742-4454-a596-a758bbdd1174",
        pharmacyLogo: "",
        ...values
      });
      if (response) {
        navigate("/admin/pharmacies");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!!")
    }
  }

  return (
    <div className="rounded-2xl bg-primary-white shadow-lg p-5 min-h-[calc(100vh-20rem)]">
      <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center justify-center md:block">Add Pharmacy</h2>
      <Formik
        initialValues={addNewPharmacyInitialVals}
        validationSchema={pharmacyValidationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex items-center justify-center md:block">
            <FileUpload title="Upload Logo" />
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <InputField
              className={inputStyles.defaultInput}
              type="text"
              label="Name"
              placeholder="Pharmacy Name"
              name="name"
            />
            <InputField
              className={inputStyles.defaultInput}
              type="email"
              label="Email"
              placeholder="Email Address"
              name="email"
            />
            <InputField
              className={inputStyles.defaultInput}
              type="tel"
              label="Phone"
              placeholder="Phone Number"
              name="phoneNumber"
            />
            <InputField
              className={inputStyles.defaultInput}
              type="text"
              label="Location"
              placeholder="Location"
              name="location"
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

export default AddNewPharmacyScreen;
