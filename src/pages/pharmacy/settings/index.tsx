"use client";

import { useState, useEffect, useRef } from "react";
import SecuritySettings from "./SecuritySettings";
import { pharmacyValidationSchema } from "@/utils/validationSchema";
import EditableFormSection from "@/components/common/settings/EditableFormSection";
import SettingsCard from "@/components/common/settings/SettingsCard";
import { fetchProfileData, updateProfileData, updateProfilePicture } from "@/services/pharmacyService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

interface ProfileFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  fullAddress: string;
  profileImage: File | string | null;
}

const PharmacySettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { profileData, isLoading } = useSelector((state: RootState) => ({
    profileData: state.global.profileData,
    isLoading: state.global.isLoading
  }));

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [initialFormData, setInitialFormData] = useState({
    profileImg: "",
    name: "",
    joinedDate: "",
    lastRequest: "",
    phoneNumber: "",
    email: "",
    location: "",
    fullAddress: "",
    approvedRequests: "0",
    deniedRequests: "0",
    prescribers: "0",
  });

  const isFetchedProfile = useRef(false);

  const loadProfileData = async () => {
    try {
      const data = await fetchProfileData(dispatch);
      return data;
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (!isFetchedProfile.current) {
      loadProfileData()
        .then(data => {
          if (data) {
            setInitialFormData({
              profileImg: data.pictureUrl || "/Ellipse 431.png",
              name: data.userName || "-",
              joinedDate: data.joinedDate?.split("T")[0] || "-",
              lastRequest: data.lastRequestDate?.split("T")[0] || "-",
              phoneNumber: data.phoneNumber || "-",
              email: data.email || "-",
              location: data.location || "-",
              fullAddress: data.fullAddress || "-",
              approvedRequests: data.approvedRequestCount?.toString() || "0",
              deniedRequests: data.deniedRequestCount?.toString() || "0",
              prescribers: data.prescriberCount?.toString() || "0",
            });
          }
        });
      isFetchedProfile.current = true;
    }
  }, []);

  const handleSubmit = async (values: ProfileFormValues) => {
    if (!profileData?.id) {
      console.error("User ID not available");
      return;
    }

    try {
      // First update profile picture if changed
      if (values.profileImage instanceof File) {
        const imageFormData = new FormData();
        imageFormData.append('profile-pic', values.profileImage);
        const updatedData = await updateProfilePicture(dispatch, profileData.id, imageFormData);
        
        // Update local state with new image URL
        if (updatedData?.pictureUrl) {
          setInitialFormData(prev => ({
            ...prev,
            profileImg: updatedData.pictureUrl
          }));
        }
      }

      // Then update other profile data
      const updateData = {
        userName: values.name,
        email: values.email,
        phone: values.phoneNumber,
        location: values.location,
        address: values.fullAddress,
      };

      await updateProfileData(dispatch, profileData.id, updateData);
      setIsEditingProfile(false);
      
      // Refresh profile data to ensure consistency
      await loadProfileData();
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  if (isLoading && !profileData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-sky-blue"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl theme-shadow">
      <div className="px-6 pt-6">
        <h1 className="text-xl font-medium tracking-tighter">
          Profile Settings
        </h1>
      </div>

      <div className="p-6 space-y-6">
        <SettingsCard className="bg-transparent shadow-none p-0">
          <EditableFormSection
            onEdit={() => setIsEditingProfile(true)}
            onCancel={() => setIsEditingProfile(false)}
            onSubmit={handleSubmit}
            profileData={initialFormData}
            isEditingProfile={isEditingProfile}
            initialValues={{
              profileImage: initialFormData.profileImg,
              name: initialFormData.name,
              email: initialFormData.email,
              phoneNumber: initialFormData.phoneNumber,
              location: initialFormData.location,
              fullAddress: initialFormData.fullAddress,
            }}
            validationSchema={pharmacyValidationSchema}
          />
        </SettingsCard>

        {user?.id && <SecuritySettings userId={user?.id} />}
      </div>
    </div>
  );
};

export default PharmacySettings;