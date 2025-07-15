import { Form, Formik, ErrorMessage } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { fetchProfileData } from '../../../../services/adminService';
import { updateProfileData } from '@/services/pharmacyService';
import InputField from '../../../../components/common/form/InputField';
import Button from '../../../../components/common/Button';
import { FiRefreshCw } from 'react-icons/fi';
import { userValidationSchema } from '../../../../utils/validationSchema';

interface UpdateProfileValues {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  gender: string;
  address: string;
}

const UserSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData, isLoading } = useSelector((state: RootState) => ({
    profileData: state.global.profileData,
    isLoading: state.global.isLoading
  }));
  const isProfileFetched = useRef(false);
  const [profileImage, setProfileImage] = useState("/setting-profile-image.png");

  useEffect(() => {
    if (!isProfileFetched.current) {
      fetchProfileData(dispatch);
      isProfileFetched.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (profileData?.pictureUrl) {
      setProfileImage(profileData.pictureUrl);
    }
  }, [profileData]);

  const handleCancel = () => {
    navigate('/admin/settings');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: UpdateProfileValues) => {
    if (!profileData?.id) {
      console.error("User ID not available");
      return;
    }

    const updateData = {
      userName: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
    };

    try {
      await updateProfileData(dispatch, profileData.id, updateData);
      await fetchProfileData(dispatch);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const initialValues: UpdateProfileValues = {
    name: profileData?.userName || '',
    email: profileData?.email || '',
    phone: '',
    whatsapp: '',
    gender: '',
    address: '',
  };

  if (isLoading && !profileData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-sky-blue"></div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-primary-white theme-shadow px-5 pt-6 pb-5 md:min-h-[calc(100vh-11rem)] relative">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Display Settings</h2>
      <div className="flex items-center flex-wrap gap-4">
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
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userValidationSchema}
        enableReinitialize
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="mt-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <InputField
                    type='text'
                    name="name"
                    label="Name"
                    placeholder="Name"
                    variant="default"
                  />
                </div>
                <div>
                  <InputField
                    name="email"
                    label="Email"
                    placeholder="Enter Email"
                    variant="default"
                  />
                </div>
                <div>
                  <InputField
                    name="phone"
                    label="Phone Number"
                    placeholder="Phone Number"
                    variant="default"
                  />
                </div>
                {/* <div>
                  <InputField
                    name="whatsapp"
                    label="WhatsApp"
                    placeholder="WhatsApp Number"
                    variant="default"
                  />
                  <ErrorMessage name="whatsapp" component="div" className="text-red-500 font-bold text-xs mt-1" />
                </div> */}
                {/* <div>
                  <SelectField
                    name="gender"
                    label="Gender"
                    options={[
                      { label: "Select gender", value: "" },
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Other", value: "other" }
                    ]}
                  />
                </div> */}
                <div>
                  <InputField
                    name="address"
                    label="Address"
                    placeholder="Address"
                    variant="default"
                  />
                </div>
              </div>
            </div>
            <div className="md:absolute md:bottom-5 md:right-5 flex flex-col md:flex-row gap-3 mt-6 md:mt-20">
              <Button
                title="Cancel"
                textColor="text-primary-sky-blue"
                className="w-full md:w-24 px-6 bg-primary-white border border-primary-sky-blue hover:bg-primary-sky-blue hover:text-primary-white"
                noHover
                onClick={handleCancel}
                type="button"
              />
              <Button
                title={isSubmitting ? "Updating..." : "Update"}
                className="w-full md:w-24 px-6 bg-primary-blue text-white"
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserSettingPage;