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
    isOpen: boolean;
    onClose: () => void;
    prescribers: Array<{ id: string; name: string }>;
}

const InviteLinkModal: React.FC<InviteLinkModalProps> = ({ isOpen, onClose, prescribers }) => {
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
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <div className="bg-white rounded-lg w-full max-w-[500px] h-[490px] mx-4 sm:w-[358px] md:w-[500px] flex flex-col overflow-hidden">
                <ModalHeader title="Invite Link" onClose={onClose} />
                
                <div className="px-6 pt-4 pb-5 flex flex-col h-full"> {/* Increased bottom padding to pb-5 */}
                    {/* Password required section */}
                    <div className="bg-quaternary-navy-blue rounded-lg p-3 mb-6 -mx-2 w-[calc(100%+16px)]">
                        <div className="flex items-start gap-3">
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
                    </div>
                    
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="flex flex-col h-full">
                            <div className="space-y-4 flex-1">
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

                            {/* Full-width separator */}
                            <div className="border-t border-gray-200 mt-5 -mx-6 w-[calc(100%+48px)]"></div>

                            {/* Action buttons with slightly increased bottom space */}
                            <div className="flex justify-end gap-3 mt-3 mb-4"> {/* Increased to mb-4 */}
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