import { Formik, Form } from "formik";
import ThemeButton from "@/components/common/ThemeButton";
import DataPoint from "./DataPoint";
import SectionTitleGrid from "./SectionTitleGrid";

interface Props {
  initialValues: any;
  validationSchema: any;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: (values: any) => void;
  profileData?: any;
  isEditingProfile?: any;
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
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              <div className="relative">
                <img
                  src="/Ellipse 431.png"
                  alt="Profile"
                  className="w-20 h-20 rounded-lg"
                />
                {isEditingProfile && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <img
                      src="/Vector (12).svg"
                      alt="Edit"
                      className="w-3 h-3"
                    />
                  </div>
                )}
              </div>
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
                <ThemeButton type="submit">
                  <div className="flex items-center gap-2 py-1 px-2">
                    <span>Save Details</span>
                  </div>
                </ThemeButton>
                <ThemeButton
                  type="button"
                  variant="tertiary"
                  onClick={onCancel}
                >
                  <div className="flex items-center gap-2 py-1 px-2">
                    <span>Cancel</span>
                  </div>
                </ThemeButton>
              </div>
            )}
          </div>

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
              <DataPoint
                icon={
                  <div className="bg-[#EBF1FF] p-0.5 rounded-md">
                    <img src="/Email.svg" alt="Email" className="w-4 h-4" />
                  </div>
                }
                label="Email"
                name="email"
                data={profileData.email}
                isEditing={isEditingProfile}
                type="email"
              />
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
      )}
    </Formik>
  );
}
