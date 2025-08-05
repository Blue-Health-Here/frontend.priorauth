import AutocompleteField from "@/components/common/form/AutocompleteField";
import { Label } from "@/components/common/Label";
import ThemeButton from "@/components/common/ThemeButton";
import InsuranceIcon from "@/components/icons/InsuranceIcon";
import MedicationIcon from "@/components/icons/MedicationIcon";
import { useTheme } from "@/hooks/useTheme";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const PACriteriaForm: React.FC<any> = ({ handleSubmit }) => {
    const { isDark } = useTheme();

    return (
        <Formik
            initialValues={{ medication: "", insurance: "" }}
            validationSchema={Yup.object({
                medication: Yup.string().required("Medication Name is required"),
                insurance: Yup.string().required("Insurance Name is required")
            })}
            enableReinitialize={true}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className="flex flex-col h-full gap-4">
                    <div className="inline-flex gap-2 items-start flex-1 relative">
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center ${isDark ? "bg-navy-dark-blue-600 text-white-800" : "bg-navy-blue-400 text-icon-group-icon"}`}>
                            <MedicationIcon color={isDark ? "#fff" : "#3961B2"} />
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-4">
                            <Label htmlFor="medication" className="text-quaternary-white text-sm font-secondary">
                                Medication Name
                            </Label>
                            <AutocompleteField
                                name="medication"
                                options={[
                                    { label: 'Benecard', value: 'Benecard' },
                                    { label: 'Caremark', value: 'Caremark' },
                                    { label: 'Fidelis Care Commercial', value: 'Fidelis Care Commercial' },
                                    { label: 'United Health Care', value: 'United Health Care' },
                                ]}
                                placeholder="Medication Name"
                            />
                        </div>
                    </div>
                    <div className="inline-flex gap-2 items-start flex-1 relative">
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center ${isDark ? "bg-navy-dark-blue-600 text-white-800" : "bg-navy-blue-400 text-icon-group-icon"}`}>
                            <InsuranceIcon color={isDark ? "#fff" : "#3961B2"} />
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-4">
                            <Label htmlFor="insurance" className="text-quaternary-white text-sm font-secondary">
                                Insurance Name
                            </Label>
                            <AutocompleteField
                                name="insurance"
                                options={[
                                    { label: 'Benecard', value: 'Benecard' },
                                    { label: 'Caremark', value: 'Caremark' },
                                    { label: 'Fidelis Care Commercial', value: 'Fidelis Care Commercial' },
                                    { label: 'United Health Care', value: 'United Health Care' },
                                ]}
                                placeholder="Insurance Name"
                            />
                        </div>
                    </div>

                    <ThemeButton
                        type="submit"
                        variant="primary"
                        className="!py-3 max-h-max"
                    >
                        Search Criteria
                    </ThemeButton>
                </Form>
            )}
        </Formik>
    )
};

export default PACriteriaForm;