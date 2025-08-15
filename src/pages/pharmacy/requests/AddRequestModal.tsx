import React, { useEffect, useState } from "react";
import { Label } from "@/components/common/Label";
import ModalHeader from "@/components/common/ModalHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import ThemeButton from "@/components/common/ThemeButton";
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
    onClose: (isAdded?: boolean) => void;
}

const AddRequestModal: React.FC<AddRequestModalProps> = ({ onClose }) => {
    const formData = {
        key: "",
        rejectionClaim: "",
        icd10Code: null
    };

    const [medications, setMedications] = useState<any[]>([]);
    const [rejectionclaim, setRejectionClaim] = useState<any>("");
    const [icdCodes, setICDCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isExtractingCodes, setIsExtractingCodes] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleChangeRejectionClaim = async (e: any, setFieldValue: any) => {
        if (e.target.value !== "") {
            setFieldValue("rejectionClaim", e.target.value);
        } else {
            setFieldValue("rejectionClaim", "");
        }
        setRejectionClaim(e.target.value);
        setApiError(null); // Clear error when claim changes
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (rejectionclaim.trim() !== "") {
                postRClaimToGetMedsICDCodes(rejectionclaim);
            } else {
                setMedications([]);
                setICDCodes([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [rejectionclaim]);

    const postRClaimToGetMedsICDCodes = async (rejectionclaim: string) => {
        try {
            setIsExtractingCodes(true);
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
        } catch (error) {
            toast.error("Failed to extract medication and ICD codes");
        } finally {
            setIsExtractingCodes(false);
        }
    }
    
 const handleSubmit = async (values: FormikValues) => {
        const medication = medications?.[0]?.medication;
    
        if (!medication || medication.trim() === "") {
            toast.error("Please enter a valid rejection claim to detect medication");
            return;
        }
    
        try {
            setIsLoading(true);
            setApiError(null); // Clear previous errors
            
            const response = await handleAddNewRequest(dispatch, {
                key: values.key,
                rejectionclaim: values.rejectionClaim,
                medication,
                icd10Code: values.icd10Code,
                from: user.firstName + " " + user.lastName,
            });
    
            if (response) {
                toast.success("Request added successfully");
                onClose(true);
                setMedications([]);
                setICDCodes([]);
                setRejectionClaim("");
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to add request";
            setApiError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ModalWrapper>
            <ModalHeader title="Add Request" onClose={() => !isLoading && onClose(false)} />
            <div className="flex flex-col gap-4 md:min-w-lg">
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
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="space-y-2 p-4">
                                <div className="space-y-2">
                                    <InputField
                                        name="key"
                                        label="Key"
                                        placeholder="Enter key"
                                        className="!px-4 !py-2"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <TextareaField
                                        id="rejectionClaim"
                                        name="rejectionClaim"
                                        label="Rejection Claim"
                                        placeholder="Enter rejection claim details..."
                                        rows={4}
                                        className="w-full rounded-lg !border border-light-stroke bg-background !px-4 focus:outline-none focus:!border-gray-400 !py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        onChange={(e: any) => handleChangeRejectionClaim(e, setFieldValue)}
                                        disabled={isLoading}
                                    />
                                    {isExtractingCodes && (
                                        <div className="flex items-center text-sm text-gray-500">
                                            <svg className="animate-spin mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Detecting medication and ICD codes...
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {medications.length > 0 && (medications[0].medication || medications[0].insurance) ? (
                                        <div className="flex gap-4 sm:gap-6 lg:gap-8 items-center justify-start flex-wrap">
                                            <div>
                                                <Label className="text-quaternary-white text-sm font-secondary">Medication</Label>
                                                <div className="bg-status-bg-sky-blue text-status-text-sky-blue border border-status-text-sky-blue w-max font-medium px-2 py-2 rounded-md text-xs">
                                                    {medications[0].medication}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-quaternary-white text-sm font-secondary">Insurance</Label>
                                                <div className="bg-status-error-bg-color text-status-error-text-color border border-status-error-text-color w-max font-medium px-2 py-2 rounded-md text-xs">
                                                    {medications[0].insurance}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="text-gray bg-gray-200 text-sm px-3 py-2 rounded-md m-0">
                                                Medications will appear here when detected in rejection claim
                                            </div>
                                            {values.rejectionClaim && !isExtractingCodes && (
                                                <div className="text-red-500 text-xs font-secondary">
                                                    No medication detected. Please provide more details in your rejection claim.
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-quaternary-white text-sm font-secondary">ICD-10 Code</Label>
                                    <ICD10Selector 
                                        name="icd10Code" 
                                        icdCodes={icdCodes} 
                                        disabled={isLoading || isExtractingCodes}
                                    />
                                    {apiError && (
                                        <div className="text-error-clip text-xs font-secondary mt-3 border border-error-clip py-2 rounded-md px-2 bg-error-chip-bg-color ">
                                            {apiError}
                                        </div>
                                    )}
                                    {icdCodes.length === 0 && values.rejectionClaim && !isExtractingCodes && !apiError && (
                                        <div className="text-yellow-600 text-xs font-secondary">
                                            No ICD codes detected. Please select one manually.
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end items-center gap-2 border-t border-light-stroke px-4 py-4">
                                <ThemeButton 
                                    onClick={() => onClose(false)} 
                                    type="button" 
                                    className="w-full sm:w-40 rounded-lg cursor-pointer border border-light-stroke max-w-max" 
                                    variant="outline"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </ThemeButton>
                                <ThemeButton 
                                    type="submit" 
                                    className="w-full sm:w-24 max-w-[130px] md:max-w-full md:min-w-max rounded-lg flex justify-center items-center" 
                                    variant="primary"
                                    disabled={isLoading || isExtractingCodes}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding...
                                        </>
                                    ) : "Add Request"}
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