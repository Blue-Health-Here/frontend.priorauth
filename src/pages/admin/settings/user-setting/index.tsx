import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../../components/common/form/InputField';
import Button from '../../../../components/common/Button';
import { FiRefreshCw } from 'react-icons/fi';
import SelectField from '../../../../components/common/form/SelectField';

const UserSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/setting-profile-image.png");

  const handleCancel = () => {
    navigate('/admin/settings');
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="rounded-2xl bg-primary-white shadow-lg px-5 pt-6 pb-5 min-h-[calc(100vh-11rem)] relative">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Change Password</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="flex items-center justify-center space-x-2 bg-quaternary-navy-blue hover:bg-quaternary-navy-blue-dark px-4 py-2 rounded-lg cursor-pointer transition-colors">
            <span className="font-bold text-primary-navy-blue">Change</span>
            <FiRefreshCw size={18} className="font-bold text-primary-navy-blue" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <p className="text-sm text-quaternary-white">
            PNGs, JPEGs - max size of 2MB
          </p>
        </div>
      </div>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        onSubmit={(values) => {
          console.log('Submitted Values:', values);
        }}
      >
        {({ handleSubmit, setTouched }) => (
          <Form
            onSubmit={(e) => {
              setTouched({
                currentPassword: true,
                newPassword: true,
                confirmPassword: true,
              });
              handleSubmit(e);
            }}
          >
            <div className="mt-10 space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <InputField
                  type='text'
                  name="name"
                  label="Name"
                  placeholder="Name"
                  variant="default"
                />
                <InputField
                  name="email"
                  label="Email"
                  placeholder="Enter Password"
                  variant="default"
                />
                <InputField
                  name="phone"
                  label="Phone Number"
                  placeholder="Phone Number"
                  variant="default"
                />
                <InputField
                  name="whatsapp"
                  label="WhatsApp"
                  placeholder="WhatsApp Number"
                  variant="default"
                />
                <SelectField
                  name="gender"
                  label="Gender"
                  options={[
                    { label: "gender", value: "Select gender" },
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" }
                  ]}
                />

                <InputField
                  name="address"
                  label="Address"
                  placeholder="Address"
                  variant="default"
                />
              </div>
            </div>
            <div className="md:absolute md:bottom-5 md:right-5 flex flex-col md:flex-row gap-3 mt-20">
              <Button
                title="Cancel"
                textColor="text-primary-sky-blue"
                className="w-full md:w-24 px-6 bg-primary-white border border-primary-sky-blue hover:bg-primary-sky-blue hover:text-primary-white"
                noHover
                onClick={handleCancel}
              />
              <Button
                title="Update"
                className="w-full md:w-24 px-6 bg-primary-blue text-white"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserSettingPage;