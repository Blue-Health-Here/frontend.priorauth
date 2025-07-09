"use client"

import { useState } from "react";
import SecuritySettings from "./SecuritySettings";
import { pharmacyValidationSchema } from '@/utils/validationSchema';
import EditableFormSection from "@/components/common/settings/EditableFormSection";
import SettingsCard from "@/components/common/settings/SettingsCard";

const PharmacySettings = () => {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "Abstergo Ltd.",
        joinedDate: "31-03-2025",
        lastRequest: "December 18, 2025",
        phoneNumber: "(217)-555-0113",
        email: "abstrego@icloud.com",
        location: "San Francisco, CA",
        fullAddress: "123 Medical Plaza, Suite 400, San Francisco, CA 94105",
        approvedRequests: "225",
        deniedRequests: "90",
        prescribers: "17",
    });

    return (
        <div className="">
            <div className="bg-white rounded-xl theme-shadow">
                {/* Header Section */}
                <div className="px-6 pt-6">
                    <h1 className="text-xl font-medium tracking-tighter">Profile Settings</h1>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-6">
                    <SettingsCard className="bg-transparent shadow-none p-0">
                        <EditableFormSection
                            onEdit={() => setIsEditingProfile(true)}
                            profileData={profileData}
                            isEditingProfile={isEditingProfile}
                            initialValues={{
                                name: profileData.name,
                                email: profileData.email,
                                phoneNumber: profileData.phoneNumber,
                                location: profileData.location,
                                fullAddress: profileData.fullAddress,
                            }}
                            validationSchema={pharmacyValidationSchema}
                            onCancel={() => setIsEditingProfile(false)}
                            onSubmit={(values) => {
                                console.log(values, "values");
                                setProfileData({ ...profileData, ...values });
                                setIsEditingProfile(false);
                            }}
                        />
                    </SettingsCard>

                    <SecuritySettings />
                </div>
            </div>
        </div>
    );
}

export default PharmacySettings;