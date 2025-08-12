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
    if (typeof initialValues.profileImage === "string") {
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
        useEffect(() => {
          let objectUrl: string | null = null;

          if (values.profileImage instanceof File) {
            objectUrl = URL.createObjectURL(values.profileImage);
            setCurrentImage(objectUrl);
          } else if (typeof values.profileImage === "string") {
            setCurrentImage(values.profileImage);
          }

          return () => {
            if (objectUrl) {
              URL.revokeObjectURL(objectUrl);
            }
          };
        }, [values.profileImage]);

        return (
          <Form className="space-y-4 md:space-y-6">
            {/* Profile Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <label htmlFor="profileImage" className="shrink-0">
                  <div className="relative cursor-pointer">
                    <img
                      src={currentImage || "/Ellipse 431.png"}
                      alt="Profile"
                      className="w-14 h-14 sm:w-18 sm:h-18 rounded-full  theme-shadow object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/Ellipse 431.png";
                      }}
                    />
                    {isEditingProfile && (
                      <div className="absolute -bottom-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center">
                        <img
                          src="/Vector (12).svg"
                          alt="Edit"
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                        />
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
                      setFieldValue(
                        "profileImage",
                        event.currentTarget.files[0]
                      );
                    }
                  }}
                  className="hidden"
                />
                <div className="flex-1 min-w-0 flex items-center justify-between sm:justify-start gap-2">
                  <div className="flex-1 min-w-0">
                    <DataPoint
                      name="name"
                      data={profileData.name}
                      isEditing={isEditingProfile}
                      type="text"
                    />
                  </div>
                  {!isEditingProfile && (
                    <button
                      type="button"
                      onClick={onEdit}
                      className="sm:hidden flex items-center justify-center bg-[#EBF1FF] text-[#163066] rounded-lg p-1.5 w-10 h-10 transition-colors hover:bg-[#EBF1FF]/90"
                    >
                      <img
                        src="/Vector (12).svg"
                        alt="Edit"
                        className="w-3.5 h-3.5"
                      />
                    </button>
                  )}
                </div>
              </div>

              {!isEditingProfile ? (
                <button
                  type="button"
                  onClick={onEdit}
                  className="hidden sm:flex items-center justify-center bg-settings-button-bg text-settings-button-text rounded-lg p-2 sm:px-4 sm:py-2.5 transition-colors"
                >
                  <span className="mr-2 text-sm font-bold ">Edit Details</span>
                  <img
                    src="/Vector (12).svg"
                    alt="Edit"
                    className="settings-button w-4 h-4"
                  />
                </button>
              ) : (
                <div className=" hidden sm:flex gap-2">
                  <ThemeButton
                    type="submit"
                    disabled={isSubmitting}
                    className={isSubmitting ? "opacity-75" : ""}
                  >
                    <div className="flex items-center gap-2 py-1 px-2 justify-center">
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
                    <div className="flex items-center gap-2 py-1 px-2 justify-center">
                      <span>Cancel</span>
                    </div>
                  </ThemeButton>
                </div>
              )}
            </div>

            {/* Rest of the form content remains unchanged */}
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <DataPoint
                  icon={
                    <div className="p-0.5 rounded-md">
                      <img
                        src="/joining-date.svg"
                        alt="Joined Date"
                        className="settings-button w-4 h-4 sm:w-5 sm:h-5"
                      />
                    </div>
                  }
                  label="Joined Date"
                  data={profileData.joinedDate}
                  name="joinedDate"
                />
                <DataPoint
                  icon={
                    <div className="p-0.5 rounded-md">
                      <img
                        src="/last-request.svg"
                        alt="Last Request"
                        className="settings-button w-4 h-4 sm:w-5 sm:h-5"
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
                    <div className="p-0.5 rounded-md">
                      <img
                        src="/Vector (9).svg"
                        alt="Phone Number"
                        className="settings-button w-4 h-3 sm:w-5 sm:h-4"
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
                  <div className="flex items-center gap-3 sm:gap-4 ">
                    <div className=" p-2 rounded-md shrink-0 bg-settings-info-icons-bg ">
                      <img
                        src="/Email.svg"
                        alt="Email"
                        className="settings-button w-3.5 h-3.5 sm:w-4 sm:h-4 "
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="text-xs text-settings-info-label-tex">Email</label>
                      <div className="w-full sm:w-[456px]">
                        <Field
                          type="email"
                          name="email"
                          disabled
                          className="w-full text-quaternary-white bg-email-field-bg border border-input-stroke rounded-md px-3 py-1.5 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-[36px] sm:h-[38px] "
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <DataPoint
                    icon={
                      <div className="p-0.5 rounded-md ">
                        <img
                          src="/Email.svg"
                          alt="Email"
                          className="settings-button w-3.5 h-3.5 sm:w-4 sm:h-4"
                        />
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
                    <div className="p-0.5 rounded-md">
                      <img
                        src="/Location1.svg"
                        alt="Location"
                        className="settings-button w-4 h-4 sm:w-5 sm:h-5"
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
                    <div className=" p-0.5 rounded-md">
                      <img
                        src="/Location1.svg"
                        alt="Full Address"
                        className="settings-button w-4 h-4 sm:w-5 sm:h-5"
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
                    <div className="p-0.5 rounded-md">
                      <img
                        src="/Vector 6663.svg"
                        alt="Approved Request"
                        className="settings-button w-3.5 h-3.5 sm:w-4 sm:h-4"
                      />
                    </div>
                  }
                  label="Approved Requests"
                  name="approvedRequests"
                  data={profileData.approvedRequests}
                />
                <DataPoint
                  icon={
                    <div className="p-0.5 rounded-md">
                      <img
                        src="/Vector (10).svg"
                        alt="Rejected Request"
                        className="settings-button w-3 h-3 sm:w-3.5 sm:h-3.5"
                      />
                    </div>
                  }
                  label="Denied Requests"
                  name="deniedRequests"
                  data={profileData.deniedRequests}
                />
                <DataPoint
                  icon={
                    <div className="p-0.5 rounded-md">
                      <img
                        src="/user group.svg"
                        alt="Prescribers"
                        className="settings-button w-4 h-4 sm:w-5 sm:h-5"
                      />
                    </div>
                  }
                  label="No of Prescribers"
                  name="prescribers"
                  data={profileData.prescribers}
                />
              </SectionTitleGrid>

              {isEditingProfile && (
                <div className="sm:hidden flex gap-2 w-full">
                  <ThemeButton
                    type="submit"
                    disabled={isSubmitting}
                    className={`${
                      isSubmitting ? "opacity-75" : ""
                    } flex-1 min-w-[110px] h-9`}
                  >
                    <div className="flex items-center justify-center gap-1 px-2 whitespace-nowrap text-sm">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-3.5 w-3.5 text-white"
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
                    className="flex-1 min-w-[90px] h-9"
                  >
                    <div className="flex items-center justify-center px-2 whitespace-nowrap text-sm">
                      Cancel
                    </div>
                  </ThemeButton>
                </div>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}