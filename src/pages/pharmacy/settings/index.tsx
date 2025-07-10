"use client";

import { useState, useEffect } from "react";
import SecuritySettings from "./SecuritySettings";
import { pharmacyValidationSchema } from "@/utils/validationSchema";
import EditableFormSection from "@/components/common/settings/EditableFormSection";
import SettingsCard from "@/components/common/settings/SettingsCard";
import { fetchProfileData, updateProfileData } from "@/services/pharmacyService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

interface ProfileFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  fullAddress: string;
}

export function PharmacySettings() {
  const dispatch = useDispatch();
  const { profileData, isLoading } = useSelector((state: RootState) => ({
    profileData: state.global.profileData,
    isLoading: state.global.isLoading
  }));
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [initialFormData, setInitialFormData] = useState({
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

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        await fetchProfileData(dispatch);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };
    loadProfileData();
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      setInitialFormData({
        name: profileData.name || "",
        joinedDate: profileData.joinedDate || "",
        lastRequest: profileData.lastRequest || "",
        phoneNumber: profileData.phoneNumber || "",
        email: profileData.email || "",
        location: profileData.location || "",
        fullAddress: profileData.fullAddress || "",
        approvedRequests: profileData.approvedRequests?.toString() || "0",
        deniedRequests: profileData.deniedRequests?.toString() || "0",
        prescribers: profileData.prescribers?.toString() || "0",
      });
    }
  }, [profileData]);

  const handleSubmit = async (values: ProfileFormValues) => {
    if (!profileData?.id) {
      console.error("User ID not available");
      return;
    }

    // Prepare the data for the API
    const updateData = {
      userName: values.name, // Match your API expected field name
      email: values.email,
      phone: values.phoneNumber,
      location: values.location,
      address: values.fullAddress,
    };

    await updateProfileData(dispatch, profileData.id, updateData);
    
    // Update local state
    setInitialFormData(prev => ({
      ...prev,
      ...values
    }));
    
    setIsEditingProfile(false);
  };

  if (isLoading && !profileData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-sky-blue"></div>
      </div>
    );
  }

  return (
    <div className="">
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
                name: initialFormData.name,
                email: initialFormData.email,
                phoneNumber: initialFormData.phoneNumber,
                location: initialFormData.location,
                fullAddress: initialFormData.fullAddress,
              }}
              validationSchema={pharmacyValidationSchema}
            />
          </SettingsCard>

          <SecuritySettings />
        </div>
      </div>
    </div>
  );
}