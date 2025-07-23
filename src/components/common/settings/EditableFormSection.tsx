import { Formik, Form, Field } from "formik";
import ThemeButton from "@/components/common/ThemeButton";
import DataPoint from "./DataPoint";
import SectionTitleGrid from "./SectionTitleGrid";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

interface Props {
  initialValues: {
    profileImage: File | string | null;
    name: string;
    email: string;
    phoneNumber: string;
    location: string;
    fullAddress: string;
  };
  validationSchema: any;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: (values: any) => Promise<void>;
  profileData?: any;
  isEditingProfile?: boolean;
}

export default function EditableFormSection({
  initialValues,
  validationSchema,
  onCancel,
  onSubmit,
  profileData,
  isEditingProfile,
  onEdit,
}: Props) {
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await onSubmit(values);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Update error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    // Initialize current image
    if (typeof initialValues.profileImage === 'string') {
      setCurrentImage(initialValues.profileImage);
    }
  }, [initialValues.profileImage]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, setFieldValue, values }) => {
        // Handle image changes and object URL cleanup
        useEffect(() => {
          let objectUrl: string | null = null;
          
          if (values.profileImage instanceof File) {
            objectUrl = URL.createObjectURL(values.profileImage);
            setCurrentImage(objectUrl);
          } else if (typeof values.profileImage === 'string') {
            setCurrentImage(values.profileImage);
          }

          return () => {
            if (objectUrl) {
              URL.revokeObjectURL(objectUrl);
            }
          };
        }, [values.profileImage]);

        return (
          <Form className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <label htmlFor="profileImage">
                  <div className="relative cursor-pointer">
                    <img
                      src={currentImage || "/Ellipse 431.png"}
                      alt="Profile"
                      className="w-18 h-18 rounded-full border border-light-stroke theme-shadow object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/Ellipse 431.png";
                      }}
                    />
                    {isEditingProfile && (
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <img src="/Vector (12).svg" alt="Edit" className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </label>
                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    if (event.currentTarget.files?.[0]) {
                      setFieldValue("profileImage", event.currentTarget.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <div>
                  <DataPoint
                    name="name"
                    data={profileData.name}
                    isEditing={isEditingProfile}
                    type="text"
                  />
                </div>
              </div>

              {!isEditingProfile ? (
                <button
                  type="button"
                  onClick={onEdit}
                  className="flex items-center cursor-pointer justify-center gap-3 bg-[#EBF1FF] text-[#163066] text-sm font-bold rounded-lg px-4 py-2.5 transition-colors hover:bg-[#EBF1FF]/90"
                >
                  <span>Edit Details</span>
                  <img src="/Vector (12).svg" alt="Edit" className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <ThemeButton
                    type="submit"
                    disabled={isSubmitting}
                    className={isSubmitting ? "opacity-75" : ""}
                  >
                    <div className="flex items-center gap-2 py-1 px-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        "Save Details"
                      )}
                    </div>
                  </ThemeButton>
                  <ThemeButton
                    type="button"
                    variant="tertiary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                  >
                    <div className="flex items-center gap-2 py-1 px-2">
                      <span>Cancel</span>
                    </div>
                  </ThemeButton>
                </div>
              )}
            </div>

            {/* Rest of your form fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataPoint
                  icon={
                    <div className="bg-[#EBF1FF] p-0.5 rounded-md">
                      <img
                        src="/joining-date.svg"
                        alt="Joined Date"
                        className="w-5 h-5"
                      />
                    </div>
                  }
                  label="Joined Date"
                  data={profileData.joinedDate}
                  name="joinedDate"
                />
                <DataPoint
                  icon={
                    <div className="bg-[#EBF1FF] p-0.5 rounded-md">
                      <img
                        src="/last-request.svg"
                        alt="Last Request"
                        className="w-5 h-5"
                      />
                    </div>
                  }
                  label="Last Request"
                  data={profileData.lastRequest}
                  name="lastRequest"
                />
              </div>

              <SectionTitleGrid title="Contact Information">
                <DataPoint
                  icon={
                    <div className="bg-[#EBF1FF] p-0.5 rounded-md">
                      <img
                        src="/Vector (9).svg"
                        alt="Phone Number"
                        className="w-5 h-4"
                      />
                    </div>
                  }
                  label="Phone Number"
                  name="phoneNumber"
                  data={profileData.phoneNumber}
                  isEditing={isEditingProfile}
                  type="tel"
                />

                {isEditingProfile ? (
                  <div className="flex items-center gap-4">
                    <div className="bg-[#EBF1FF] p-0.5 rounded-md">
                      <img src="/Email.svg" alt="Email" className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Email</label>
                      <div className="w-[456px]">
                        <Field
                          type="email"
                          name="email"
                          disabled
                          className="w-full text-[#A8A8A8] bg-[#EBEBEB] border border-[#E5E7EB] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-[38px]"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <DataPoint
                    icon={
                      <div className="bg-[#EBF1FF] p-0.5 rounded-md">
                        <img src="/Email.svg" alt="Email" className="w-4 h-4" />
                      </div>
                    }
                    label="Email"
                    name="email"
                    data={profileData.email}
                    isEditing={false}
                  />
                )}

                <DataPoint
                  icon={
                    <div className="bg-[#EBF1FF] p-0.5 rounded-md">
                      <img
                        src="/Location1.svg"
                        alt="Location"
                        className="w-5 h-5"
                      />
                    </div>
                  }
                  label="Location"
                  name="location"
                  data={profileData.location}
                  isEditing={isEditingProfile}
                />
                <DataPoint
                  icon={
                    <div className="bg-[#EBF1FF] p-0.5 rounded-md">
                      <img
                        src="/Location1.svg"
                        alt="Full Address"
                        className="w-5 h-5"
                      />
                    </div>
                  }
                  label="Full Address"
                  name="fullAddress"
                  data={profileData.fullAddress}
                  isEditing={isEditingProfile}
                />
              </SectionTitleGrid>

              <SectionTitleGrid title="Account Statistics">
                <DataPoint
                  icon={
                    <div className="bg-[#EBF1FF] p-0.5 rounded-md">
                      <img
                        src="/Vector 6663.svg"
                        alt="Approved Request"
                        className="w-4 h-4"
                      />
                    </div>
                  }
                  label="Approved Requests"
                  name="approvedRequests"
                  data={profileData.approvedRequests}
                />
                <DataPoint
                  icon={
                    <div className="bg-[#EBF1FF] p-0.5 rounded-md">
                      <img
                        src="/Vector (10).svg"
                        alt="Rejected Request"
                        className="w-3.5 h-3.5"
                      />
                    </div>
                  }
                  label="Denied Requests"
                  name="deniedRequests"
                  data={profileData.deniedRequests}
                />
                <DataPoint
                  icon={
                    <div className="bg-[#EBF1FF] p-0.5 rounded-md">
                      <img
                        src="/user group.svg"
                        alt="Prescribers"
                        className="w-5 h-5"
                      />
                    </div>
                  }
                  label="No of Prescribers"
                  name="prescribers"
                  data={profileData.prescribers}
                />
              </SectionTitleGrid>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}