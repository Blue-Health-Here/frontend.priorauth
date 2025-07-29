import React, { useState } from "react";
import { Label } from "@/components/common/Label";
import ModalHeader from "@/components/common/ModalHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import ThemeButton from "@/components/common/ThemeButton";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";

interface InviteLinkModalProps {
  onClose: () => void;
  prescribers: Array<{ id: string; name: string }>;
}

const PasswordFieldWithToggle = ({ name }: { name: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-1">
      <div className="relative">
        <InputField
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          className="!px-4 !py-2 !pr-10"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img src="/eye.svg" alt="Toggle password" className="w-4 h-4"/>
        </button>
      </div>
      <p className="text-bars-blue-med text-xs">Generate strong password</p>
    </div>
  );
};

const InviteLinkModal: React.FC<InviteLinkModalProps> = ({ onClose, prescribers }) => {
  const [activeTab, setActiveTab] = useState("By Link");
  const [isSent, setIsSent] = useState(false);

  const initialValues = {
    prescriber: "",
    password: "",
    link: "https://example.com/invite",
    email: "",
    role: "Viewer",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = () => {
    setIsSent(true);
  };

  const modalWidth = activeTab === "By Email" ? "md:w-[687px]" : "md:w-[500px]";

  return (
    <ModalWrapper>
      <ModalHeader title="Invite Link" onClose={onClose} />
      <div className={`bg-primary-white rounded-lg w-[358px] ${modalWidth} ${isSent ? 'h-[320px]' : 'h-[500px]'} flex flex-col overflow-hidden`}>
        {isSent ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="relative">
              <img src="/sent.svg" alt="Sent" className="w-32 h-32"/>
              <img src="/sent1.svg" alt="Checkmark" className="absolute inset-0 m-auto w-12 h-12"/>
            </div>
            <p className="text-chips-success mt-4 text-lg font-medium">
              Invitation sent successfully!
            </p>
            <div className="mt-auto w-full border-t border-light-stroke pt-4 flex justify-end">
              <ThemeButton
                onClick={onClose}
                type="button"
                className="w-24 bg-primary-navy-blue text-primary-white"
                variant="primary"
              >
                Close
              </ThemeButton>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="w-full max-w-[90%] mx-auto border-b border-light-stroke pt-2">
              <ThemeButtonTabs
                data={["By Email", "By Link"]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                className="w-full border-quaternary-navy-blue-dark"
              />
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form className="flex flex-col h-full">
                  {/* Scrollable content area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Common Content */}
                    <div className="flex items-start gap-3 bg-quaternary-navy-blue rounded-lg p-3">
                      <img src="/pass-required.svg" alt="Password required" className="w-5 h-5 mt-0.5"/>
                      <div>
                        <p className="text-primary-black text-sm font-medium">
                          Password required to view the page
                        </p>
                        <p className="text-secondary-black text-xs mt-1">
                          Users will need to enter password to access
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-quaternary-white text-sm font-secondary">
                        Prescriber
                      </Label>
                      <div className="relative">
                        <div className="absolute left-0 top-0 h-full flex items-center pl-2 z-10">
                          <img src="/prescriber.svg" alt="Prescriber" className="w-5 h-5"/>
                        </div>
                        <SelectField
                          name="prescriber"
                          options={prescribers.map(p => ({ value: p.id, label: p.name }))}
                          placeholder="Select prescriber"
                          className="!pl-12"
                          parentClassName="w-full"
                        />
                      </div>
                    </div>

                    {/* Tab Specific Content */}
                    {activeTab === "By Link" && (
                      <div className="space-y-2">
                        <Label className="text-quaternary-white text-sm font-secondary">
                          Link
                        </Label>
                        <div className="relative flex items-center gap-2 w-full">
                          <div className="relative flex-1">
                            <input
                              name="link"
                              value={initialValues.link}
                              readOnly
                              className="w-full h-10 bg-quaternary-navy-blue rounded-lg px-4 pr-12 text-sm"
                            />
                            <img src="/link.svg" alt="Link" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"/>
                          </div>
                          <button
                            type="button"
                            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100"
                            onClick={() => navigator.clipboard.writeText(initialValues.link)}
                          >
                            <img src="/Vector (24).svg" alt="Copy" className="w-5.5 h-5.5"/>
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === "By Email" && (
                      <div className="space-y-2">
                        <Label className="text-quaternary-white text-sm font-secondary">
                          Invite by Email
                        </Label>
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-[390px]">
                            <InputField name="email" placeholder="Enter Email"/>
                          </div>
                          <div className="w-full md:w-[249px]">
                            <SelectField
                              name="role"
                              options={[
                                { value: "Viewer", label: "Viewer" },
                                { value: "Editor", label: "Editor" }
                              ]}
                              placeholder="Select role"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label className="text-quaternary-white text-sm font-secondary">
                        Set Password
                      </Label>
                      <PasswordFieldWithToggle name="password"/>
                    </div>
                  </div>

                  {/* Fixed footer with buttons */}
                  <div className="flex justify-end gap-4 border-t border-light-stroke p-4 bg-primary-white">
                    <ThemeButton
                      onClick={onClose}
                      type="button"
                      className="w-24 border border-[#CBDAFF] text-primary-navy-blue"
                      variant="outline"
                    >
                      Cancel
                    </ThemeButton>
                    <ThemeButton
                      type="submit"
                      className={`w-24 whitespace-nowrap overflow-hidden text-ellipsis ${
                        !values.password ? 'text-quaternary-white' : ''
                      }`}
                      variant="primary"
                      disabled={!values.password}
                      style={{
                        backgroundColor: !values.password ? "var(--secondary-background)" : ""
                      }}
                    >
                      {activeTab === "By Link" ? "Copy Link" : "Send Invite"}
                    </ThemeButton>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default InviteLinkModal;