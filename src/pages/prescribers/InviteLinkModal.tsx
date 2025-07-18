import React from "react";
import { Label } from "@/components/common/Label";
import ModalHeader from "@/components/common/ModalHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import ThemeButton from "@/components/common/ThemeButton";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";

interface InviteLinkModalProps {
    onClose: () => void;
    prescribers: Array<{ id: string; name: string }>;
}

const InviteLinkModal: React.FC<InviteLinkModalProps> = ({ onClose, prescribers }) => {
    const initialValues = {
        prescriber: "",
        password: "",
        link: "https://example.com/invite"
    };

    const validationSchema = Yup.object({
        prescriber: Yup.string().required("Prescriber is required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        link: Yup.string().url("Must be a valid URL")
    });

    const handleSubmit = (values: FormikValues) => {
        navigator.clipboard.writeText(values.link);
        onClose();
    };

    return (
        <ModalWrapper>
            <ModalHeader title="Invite Link" onClose={onClose} />
            <div className="bg-white rounded-lg w-full max-w-[500px] h-[490px] sm:w-[358px] md:w-[500px] flex flex-col overflow-hidden">
                <div className="flex flex-col gap-4 h-full">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="flex flex-col h-full">
                            <div className="space-y-4 flex-1 p-4">
                                <div className="flex items-start gap-3 bg-quaternary-navy-blue rounded-lg p-3">
                                    <img 
                                        src="/pass-required.svg" 
                                        alt="Password required" 
                                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                                    />
                                    <div>
                                        <p className="text-primary-black text-sm font-medium">
                                            Password required to view the page
                                        </p>
                                        <p className="text-secondary-black text-xs mt-1">
                                            Users will be required to enter the configured password to access this page by the link
                                        </p>
                                    </div>
                                </div>
                                {/* Form fields */}
                                <div className="space-y-2">
                                    <Label className="text-quaternary-white text-sm font-secondary">Prescriber</Label>
                                    <div className="relative">
                                        <div className="absolute left-0 top-0 h-full flex items-center pl-2 z-10">
                                            <div className="h-full flex items-center px-3">
                                                <img 
                                                    src="/prescriber.svg" 
                                                    alt="Prescriber" 
                                                    className="w-5 h-5"
                                                />
                                            </div>
                                        </div>
                                        <SelectField
                                            name="prescriber"
                                            options={prescribers.map(p => ({
                                                value: p.id,
                                                label: p.name
                                            }))}
                                            placeholder="Select prescriber"
                                            className="!pl-12"
                                            parentClassName="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-quaternary-white text-sm font-secondary">Link</Label>
                                    <div className="relative">
                                        <div className="relative">
                                            <input
                                                name="link"
                                                value={initialValues.link}
                                                readOnly
                                                className="w-full h-10 bg-quaternary-navy-blue rounded-lg px-4 pr-12 font-secondary text-primary-black text-sm font-medium focus:outline-none"
                                            />
                                            <img 
                                                src="/link.svg" 
                                                alt="Link" 
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-quaternary-white text-sm font-secondary">Set Password</Label>
                                    <InputField
                                        name="password"
                                        type="password"
                                        placeholder="Enter password"
                                        className="!px-4 !py-2"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 border-t border-light-stroke p-4">
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
                                    className="w-24 whitespace-nowrap"
                                    variant="primary"
                                >
                                    Copy Link
                                </ThemeButton>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default InviteLinkModal;