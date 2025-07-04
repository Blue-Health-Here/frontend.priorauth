import React, { useEffect } from "react";
import { Label } from "@/components/common/Label";
import ModalHeader from "@/components/common/ModalHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import ThemeButton from "@/components/common/ThemeButton";
import { useState } from "react";
import InputField from "@/components/common/form/InputField";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import TextareaField from "@/components/common/form/TextareaField";
import ICD10Selector from "@/components/common/form/ICD10Selector";
import { extractMedsICDCodes, handleAddNewRequest } from "@/services/pharmacyService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import toast from "react-hot-toast";

interface AddRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddRequestModal: React.FC<AddRequestModalProps> = ({ onClose }) => {
    // const [formData, setFormData] = useState({
    //     from: "MediCare Pharmacy",
    //     key: "",
    //     rejectionClaim: "",
    // });
    const formData = {
        key: "",
        rejectionClaim: "",
        icd10Code: null
    };
    // const [icdWarning, setICDWarning] = useState("")
    const [medications, setMedications] = useState<any[]>([]);
    const [rejectionclaim, setRejectionClaim] = useState<any>("");
    const [icdCodes, setICDCodes] = useState([]);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleChangeRejectionClaim = async (e: any, setFieldValue: any) => {
        if (e.target.value !== "") {
            setFieldValue("rejectionClaim", e.target.value);
        } else {
            setFieldValue("rejectionClaim", "");
        }
        setRejectionClaim(e.target.value);
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (rejectionclaim.trim() !== "") {
                postRClaimToGetMedsICDCodes(rejectionclaim);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [rejectionclaim]);

    const postRClaimToGetMedsICDCodes = async (rejectionclaim: string) => {
        const response = await extractMedsICDCodes(dispatch, { rejectionclaim });
        if (response?.medications && response?.medications?.length > 0) {
            setMedications(response.medications);
            if (response.medications[0].icd10Codes && response.medications[0].icd10Codes.length > 0) {
                setICDCodes(response.medications[0].icd10Codes.map((item: any) => ({ code: item })));
            } else {
                setICDCodes([]);
            }
        } else {
            setMedications([]);
            setICDCodes([]);
        }
    }
    
    const handleSubmit = async (values: FormikValues) => {
        const medication = medications?.[0]?.medication;
    
        if (!medication || medication.trim() === "") {
            // toast.error("Medication is required. Please ensure it's detected from the rejection claim.");
            return;
        }
    
        try {
            const response = await handleAddNewRequest(dispatch, {
                key: values.key,
                rejectionclaim: values.rejectionClaim,
                medication, // safe now
                icd10Code: values.icd10Code?.code,
                from: user.firstName + " " + user.lastName,
            });
    
            if (response) {
                onClose();
                setMedications([]);
                setICDCodes([]);
                setRejectionClaim("");
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <ModalWrapper>
            <ModalHeader title="Add Request" onClose={onClose} />
            <div className="flex flex-col gap-4 min-w-lg">
                <Formik
                    initialValues={formData}
                    validationSchema={Yup.object({
                        key: Yup.string().required("Key is required."),
                        rejectionClaim: Yup.string()
                            .required("Rejection claim information is required.")
                            .min(10, "Please provide more detailed information in the rejection claim."),
                        icd10Code: Yup.string().required("ICD Code is required.")
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <div className="space-y-2 p-4">
                                <div className="space-y-2">
                                    <InputField
                                        name="key"
                                        label="Key"
                                        placeholder="Enter key"
                                        className="!px-4 !py-2"
                                    />
                                </div>

                                {/* Rejection Claim */}
                                <div className="space-y-2">
                                    <TextareaField
                                        id="rejectionClaim"
                                        name="rejectionClaim"
                                        label="Rejection Claim"
                                        placeholder="Enter rejection claim details..."
                                        rows={4}
                                        className="w-full rounded-lg !border !border-light-stroke bg-background !px-4 focus:outline-none focus:!border-gray-400 !py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        onChange={(e: any) => handleChangeRejectionClaim(e, setFieldValue)}
                                    />
                                </div>

                                {/* Medications */}
                                <div className="space-y-2">
                                    <Label className="text-quaternary-white text-sm font-secondary">Medication</Label>
                                    {medications.length > 0 && medications[0].medication ? <div>
                                        <div className="bg-status-bg-sky-blue text-status-text-sky-blue w-max font-medium px-2 py-2 rounded-md text-xs">
                                            {medications[0].medication}
                                        </div>
                                    </div> : (
                                        <>
                                            <div className="text-gray bg-gray-200 text-sm px-3 py-2 rounded-md m-0">
                                                Medications will appear here when detected in rejection claim
                                            </div>
                                            <div className="text-red-500 text-xs font-secondary">Medication is required.</div>
                                        </>
                                    )}
                                </div>

                                {/* ICD Codes */}
                                <div className="space-y-2">
                                    <Label className="text-quaternary-white text-sm font-secondary">ICD-10 Code</Label>
                                    <ICD10Selector name="icd10Code" icdCodes={icdCodes} />
                                </div>
                            </div>
                            <div className="flex justify-end items-center gap-2 border-t border-light-stroke px-4 py-4">
                                <ThemeButton onClick={onClose} type="button" className="w-full sm:w-40 rounded-lg cursor-pointer border border-light-stroke max-w-max" variant="outline">
                                    Cancel
                                </ThemeButton>
                                <ThemeButton type="submit" className="w-full sm:w-24 rounded-lg min-w-max" variant="primary">
                                    Add Request
                                </ThemeButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </ModalWrapper>
    )
};

export default AddRequestModal;