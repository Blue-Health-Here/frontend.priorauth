import { Label } from "@/components/common/Label";
import ModalHeader from "@/components/common/ModalHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import ThemeButton from "@/components/common/ThemeButton";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
// import { FiEdit, FiX } from "react-icons/fi";
import InputField from "@/components/common/form/InputField";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SelectField from "@/components/common/form/SelectField";

interface AddRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// interface Medication {
//     id: string
//     name: string
// }

// interface ICDCode {
//     id: string
//     code: string
//     description: string
// }

// const commonMedications = [
//     "Metformin",
//     "Lisinopril",
//     "Atorvastatin",
//     "Amlodipine",
//     "Metoprolol",
//     "Omeprazole",
//     "Albuterol",
//     "Hydrochlorothiazide",
//     "Gabapentin",
//     "Sertraline",
// ]

const icdCodes = [
    { code: "E11.9", description: "Type 2 diabetes mellitus without complications" },
    { code: "I10", description: "Essential hypertension" },
    { code: "Z79.4", description: "Long term use of insulin" },
    { code: "E78.5", description: "Hyperlipidemia, unspecified" },
    { code: "J44.1", description: "Chronic obstructive pulmonary disease with acute exacerbation" },
    { code: "F32.9", description: "Major depressive disorder, single episode, unspecified" },
    { code: "M79.3", description: "Panniculitis, unspecified" },
    { code: "G89.29", description: "Other chronic pain" },
]

const problematicICDCodes = ["Z79.4", "J44.1", "F32.9"]

const AddRequestModal: React.FC<AddRequestModalProps> = ({ isOpen, onClose }) => {
    const [editingMedication, setEditingMedication] = useState<string | null>(null)
    const [editValue, setEditValue] = useState("")
    const [icdWarning, setICDWarning] = useState("")
    const [customICDCode, setCustomICDCode] = useState("")

    // Comment out or remove all references to medications, setMedications, selectedICDCodes, setSelectedICDCodes, and related logic for now
    // These will be refactored in the next step to use Formik

    const handleRejectionClaimChange = (value: string) => {
        // extractMedications(value)
    }

    const removeMedication = (id: string) => {
        // removeMedication(id)
    }

    const removeICDCode = (id: string) => {
        // removeICDCode(id)
    }

    const startEditingMedication = (id: string, name: string) => {
        // startEditingMedication(id, name)
    }

    const saveEditedMedication = () => {
        // saveEditedMedication()
    }

    return (
        <ModalWrapper>
            <ModalHeader title="Add Request" onClose={onClose} />
            <Formik
                initialValues={{
                    from: "MediCare Pharmacy",
                    key: "",
                    rejectionClaim: "",
                }}
                validationSchema={Yup.object({
                    key: Yup.string(),
                    rejectionClaim: Yup.string()
                        .required("Rejection claim information is required.")
                        .min(10, "Please provide more detailed information in the rejection claim."),
                })}
                onSubmit={(values, { resetForm }) => {
                    console.log("Form submitted:", values)
                    resetForm()
                    onClose()
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="space-y-6">
                            {/* From and Key Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="from">From</Label>
                                    <div className="bg-gray-100 text-gray-500 rounded px-3 py-2 border border-gray-200">MediCare Pharmacy</div>
                                </div>
                                <div className="space-y-2">
                                    <InputField
                                        id="key"
                                        name="key"
                                        label="Key"
                                        placeholder="Enter key"
                                    />
                                </div>
                            </div>

                            {/* Rejection Claim */}
                            <div className="space-y-2">
                                <Label htmlFor="rejectionClaim">Rejection Claim</Label>
                                <Field
                                    as="textarea"
                                    id="rejectionClaim"
                                    name="rejectionClaim"
                                    placeholder="Enter rejection claim details..."
                                    rows={4}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                />
                                {errors.rejectionClaim && touched.rejectionClaim && (
                                    <div className="text-red-500 text-xs mt-1">{errors.rejectionClaim}</div>
                                )}
                            </div>

                            {/* Medications */}
                            <div className="space-y-2">
                                <Label>Medication</Label>
                                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                                    {/* medications.map((med) => (
                                        <div
                                            key={med.id}
                                            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                                        >
                                            {editingMedication === med.id ? (
                                                <Input
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    onBlur={saveEditedMedication}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") saveEditedMedication()
                                                        if (e.key === "Escape") {
                                                            setEditingMedication(null)
                                                            setEditValue("")
                                                        }
                                                    }}
                                                    className="h-6 w-20 text-xs"
                                                    autoFocus
                                                />
                                            ) : (
                                                <span>{med.name}</span>
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    startEditingMedication(med.id, med.name)
                                                }}
                                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                            >
                                                <FiEdit className="h-3 w-3" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    removeMedication(med.id)
                                                }}
                                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                                            >
                                                <FiX className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )) */}
                                    {/* medications.length === 0 && (
                                        <span className="text-gray-500 text-sm">
                                            Medications will appear here when detected in rejection claim
                                        </span>
                                    ) */}
                                </div>
                            </div>

                            {/* ICD-10 Code */}
                            <div className="space-y-2">
                                <Label>ICD-10 Code</Label>
                                <SelectField
                                    name="icdCode"
                                    label="ICD-10 Code"
                                    options={icdCodes.map(code => ({ value: code.code, label: `${code.code} - ${code.description}` }))}
                                    placeholder="Select ICD-10 code"
                                />
                                {/* TODO: Replace with multi-select logic if needed */}
                                <div className="mt-2">
                                    <Label>Add Custom ICD-10 Code</Label>
                                    <InputField
                                        name="customICDCode"
                                        placeholder="Enter ICD-10 code (e.g., E11.9)"
                                        className="flex-1 h-8 text-sm"
                                    />
                                    {/* Add button logic for custom code can be implemented with Formik setFieldValue if needed */}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-4 border-t border-light-stroke px-4 py-4 mt-6">
                            <ThemeButton onClick={onClose} type="button" className="w-full sm:w-40 rounded-theme-r cursor-pointer border border-light-stroke max-w-max" variant="outline">
                                Cancel
                            </ThemeButton>
                            <ThemeButton type="submit" className="w-full sm:w-40 rounded-theme-r max-w-max" variant="primary">
                                Submit
                            </ThemeButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
};

export default AddRequestModal;