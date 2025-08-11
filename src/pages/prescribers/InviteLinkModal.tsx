import React, { useEffect, useRef, useState } from "react";
import { Label } from "@/components/common/Label";
import ModalHeader from "@/components/common/ModalHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import ThemeButton from "@/components/common/ThemeButton";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import InputField from "@/components/common/form/InputField";
// import SelectField from "@/components/common/form/SelectField";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { generatePrescriberLink, handleGeneratePass, handleSendInvite } from "@/services/pharmacyService";
import ByLinkCard from "./ByLinkCard";
import ByLinkEmail from "./ByLinkEmail";
import { inviteByLinkInitialVals } from "@/utils/initialVals";

interface InviteLinkModalProps {
  onClose: () => void;
  prescriber: {
    id: string;
    prescriber: string;
    npi?: string;
    prescriberPhone?: string;
    prescriberAddress?: string;
  };
}

const PasswordFieldWithToggle: React.FC<{ 
  name: string; 
  handleGeneratePass: any 
}> = ({ name, handleGeneratePass }) => {
  return (
    <div className="space-y-1">
      <InputField
        name={name}
        isPassword={true}
        placeholder="Enter password"
        className="!px-4 !py-2 !pr-10"
      />
      <button type="button" onClick={handleGeneratePass} className="text-bars-blue-med text-sm cursor-pointer">Generate strong password</button>
    </div>
  );
};

const InviteLinkModal: React.FC<InviteLinkModalProps> = ({ onClose, prescriber }) => {
  const [activeTab, setActiveTab] = useState("By Link");
  const [inviteLinkDetails, setInviteLinkDetails] = useState<any>(null);
  const [isSent, setIsSent] = useState(false);
  const isPrescriberGeneratedLink = useRef(false);
  const [initialValues, setInitialValues] = useState(inviteByLinkInitialVals);
  const dispatch = useDispatch();
  const modalWidth = activeTab === "By Email" ? "md:w-[600px]" : "md:w-[500px]";

  const generatePrescriberInviteLink = async () => {
    try {
      const response = await generatePrescriberLink(dispatch, { prescriberId: prescriber.id });
      if (response) {
        setInviteLinkDetails(response);
        setInitialValues((prev) => ({ ...prev, prescriber: prescriber?.prescriber || "", link: response.inviteLink }));
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleGeneratePassword = async (setFieldValue: any) => {
    if (!inviteLinkDetails) return;
    try {
      const response = await handleGeneratePass(dispatch);
      setFieldValue("password", response?.suggestions[0]);
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  const handleSetActiveTab = (val: string) => {
    setActiveTab(val);
    setInitialValues({ ...inviteByLinkInitialVals, 
      prescriber: prescriber?.prescriber });
  }

  useEffect(() => {
    if (!isPrescriberGeneratedLink.current) {
      generatePrescriberInviteLink();
      isPrescriberGeneratedLink.current = true;
    }
  }, [activeTab]);

  const handleSubmit = async (values: FormikValues) => {
    try {
      delete inviteLinkDetails?.message;
      const data = {
        ...inviteLinkDetails,
        prescriberName: values.prescriber,
        password: values.password
      };
      const response = await handleSendInvite(dispatch, data);
      if (response) {
        toast.success(response.message);
        navigator.clipboard.writeText(response.inviteLink);
        if (activeTab === "By Link") {
          onClose();
        } else {
          setIsSent(true);
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
      setIsSent(false);
    }
  };

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
                setActiveTab={handleSetActiveTab}
                className="w-full border-quaternary-navy-blue-dark "
              />
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                password: Yup.string()
                  .required("Password is required")
                  .min(6, "Password must be at least 6 characters"),
              })}
              enableReinitialize={true}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                      <div className="">
                        <InputField
                          name="prescriber"
                          value={initialValues.prescriber}
                          readOnly
                          className="!pl-4 bg-secondary-background"
                        />
                      </div>
                    </div>

                    {activeTab === "By Link" && <ByLinkCard value={initialValues.link} />}
                    {activeTab === "By Email" && <ByLinkEmail />}

                    <div className="space-y-2">
                      <Label className="text-quaternary-white text-sm font-secondary">
                        Set Password
                      </Label>
                      <PasswordFieldWithToggle name="password" handleGeneratePass={() => handleGeneratePassword(setFieldValue)} />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 border-t border-light-stroke p-4 bg-primary-white">
                    <ThemeButton
                      onClick={onClose}
                      type="button"
                      className="w-24 cursor-pointer"
                      variant="tertiary"
                    >
                      Cancel
                    </ThemeButton>
                    <ThemeButton
                      type="submit"
                      className={`min-w-24 whitespace-nowrap overflow-hidden text-ellipsis ${
                        !values.password ? 'text-quaternary-white' : ''
                      }`}
                      variant="primary"
                      disabled={!values.password}
                      style={{
                        backgroundColor: !values.password ? "var(--secondary-background)" : ""
                      }}
                    >
                      {activeTab === "By Link" ? "Save & Copy Link" : "Send Invite"}
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