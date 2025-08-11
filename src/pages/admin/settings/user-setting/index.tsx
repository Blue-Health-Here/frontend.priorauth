import { Form, Formik } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { fetchProfileData } from '../../../../services/adminService';
import { updateProfileData } from '@/services/pharmacyService';
import { userValidationSchema } from '../../../../utils/validationSchema';
import FormField from '@/pages/prescribers/FormField';
import ThemeButton from '@/components/common/ThemeButton';

interface UpdateProfileValues {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  gender: string;
  address: string;
  location: string;
}

const UserSettingPage: React.FC = () => {
  const dispatch = useDispatch();
  const { profileData, isLoading } = useSelector((state: RootState) => ({
    profileData: state.global.profileData,
    isLoading: state.global.isLoading
  }));
  const { user } = useSelector((state: RootState) => state.auth);
  const isProfileFetched = useRef(false);
  const [profileImage, setProfileImage] = useState("/setting-profile-image.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isProfileFetched.current) {
      fetchProfileData(dispatch, user?.id);
      isProfileFetched.current = true;
    }
  }, []);

  useEffect(() => {
    if (profileData?.pictureUrl) {
      setProfileImage(profileData.pictureUrl);
    }
  }, [profileData]);

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
      await fetchProfileData(dispatch, user?.id);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const initialValues: UpdateProfileValues = {
    name: profileData?.userName || '',
    email: profileData?.email || '',
    phone: profileData?.phone,
    location: profileData?.location,
    whatsapp: '',
    gender: profileData?.gender,
    address: profileData?.address,
  };

  if (isLoading && !profileData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-sky-blue"></div>
      </div>
    );
  }

  const handleImageDelete = () => {
    setProfileImage("/setting-profile-image.png");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-2/3 space-y-2 p-4 rounded-lg bg-primary-white border border-input-stroke">
        <Formik
          initialValues={initialValues}
          validationSchema={userValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form id="prescriber-form" className="space-y-2">
              <div className='flex justify-between items-start gap-4'>
                <h2 className="text-md font-medium">Account Settings</h2>
                <div className='inline-flex gap-4 items-center h-10'>
                  <ThemeButton variant="tertiary" type="button" onClick={() => navigate("/admin/settings")}>Cancel</ThemeButton>
                  <ThemeButton variant="primary" type="submit">Update</ThemeButton>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    iconSrc="/prescriber (2).svg"
                    iconAlt="Name"
                    label="Name"
                    name="name"
                    value={values.name}
                  />
                  <FormField
                    iconSrc="/npi.svg"
                    iconAlt="Email"
                    label="Email"
                    name="email"
                    value={values.email}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    iconSrc="/phone.svg"
                    iconAlt="Phone Number"
                    label="Phone Number"
                    name="phone"
                    value={values.phone}
                  />
                  <FormField
                    iconSrc="/phone.svg"
                    iconAlt="Whatsapp"
                    label="WhatsApp"
                    name="whatsapp"
                    value={values.whatsapp}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    iconSrc="/city.svg"
                    iconAlt="Location"
                    label="Location"
                    name="location"
                    value={values.location}
                  />
                  <FormField
                    iconSrc="/address.svg"
                    iconAlt="Address"
                    label="Full Address"
                    name="address"
                    value={values.address}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-full lg:w-1/3 space-y-6 p-4 rounded-lg bg-primary-white border border-input-stroke">
        <h2 className="text-md font-medium">Display Picture</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200">
            <img
              src={profileImage}
              alt="Prescriber Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="flex gap-2 w-full max-w-[280px] h-11">
            <ThemeButton
              variant="tertiary"
              className="flex-1"
              onClick={() => fileInputRef.current?.click()}
            >
              Change Picture
            </ThemeButton>

            <ThemeButton
              variant="danger"
              className="flex-1 border border-[#FF2E37] bg-[#FFE0E2] text-[#FF2E37] hover:bg-[#FFE0E2]/90"
              onClick={handleImageDelete}
            >
              Delete Picture
            </ThemeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingPage;