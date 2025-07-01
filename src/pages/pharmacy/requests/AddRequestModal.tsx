import React from "react";
import { Label } from "@/components/common/Label";
import ModalHeader from "@/components/common/ModalHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import ThemeButton from "@/components/common/ThemeButton";
import { useState } from "react";
import InputField from "@/components/common/form/InputField";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import { FiEdit, FiX } from "react-icons/fi";
import TextareaField from "@/components/common/form/TextareaField";
import ICD10Selector from "@/components/common/form/ICD10Selector";
import { commonMedications, icdCodes } from "@/utils/constants";

interface AddRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Medication {
    id: string
    name: string
}

const AddRequestModal: React.FC<AddRequestModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        from: "MediCare Pharmacy",
        key: "",
        rejectionClaim: "",
    })
    const [editingMedication, setEditingMedication] = useState<string | null>(null)
    const [editValue, setEditValue] = useState("")
    const [customMedicine, setCustomMedicine] = useState("")
    const [showCustomMedicationForm, setShowCustomMedicationForm] = useState<boolean>(false);
    const [icdWarning, setICDWarning] = useState("")
    const [medications, setMedications] = useState<Medication[]>([])

    const extractMedications = (text: string) => {
        try {
            const foundMeds: Medication[] = []
            const words = text.toLowerCase().split(/\s+/)

            commonMedications.forEach((med) => {
                if (words.some((word) => word.includes(med.toLowerCase()))) {
                    const exists = medications.some((m) => m.name.toLowerCase() === med.toLowerCase())
                    if (!exists) {
                        foundMeds.push({
                            id: Math.random().toString(),
                            name: med,
                        })
                    }
                }
            })

            if (foundMeds.length > 0) {
                setMedications((prev) => [...prev, ...foundMeds])
            }
            setShowCustomMedicationForm(false);
        } catch (error) {
            console.error("Error extracting medications:", error)
        }
    }

    const handleCustomAddMedication = () => {
        const currentMedicines = [...medications];
        currentMedicines.push({
            id: Math.random().toString(),
            name: customMedicine,
        });
        setMedications(currentMedicines);
        setShowCustomMedicationForm(false);
        setCustomMedicine("");
    }

    const removeMedication = (id: string) => {
        setMedications((prev) => prev.filter((med) => med.id !== id))
    }

    const startEditingMedication = (id: string, name: string) => {
        setEditingMedication(id)
        setEditValue(name)
    }

    const saveEditedMedication = () => {
        if (editingMedication && editValue.trim()) {
            setMedications((prev) =>
                prev.map((med) => (med.id === editingMedication ? { ...med, name: editValue.trim() } : med)),
            )
        }
        setEditingMedication(null)
        setEditValue("")
    }

    const handleSubmit = async (values: FormikValues) => {
        const requestData = {
            id: `REQ-${Date.now()}`,
            title: `Medical Request - ${formData.key || "Untitled"}`,
            status: "Pending",
            priority: icdWarning ? "High" : "Medium",
            assignee: "Unassigned",
            createdDate: new Date().toLocaleDateString(),
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            ...formData,
            medications,
        }

        console.log("Form submitted:", values, requestData)

        // Reset form
        // setMedications([])
        // setICDWarning("")
        // setCustomICDCode("")
        // setCustomMedicine("")
        // setShowCustomMedicationForm(false);

        // onClose()
    };

    console.log(medications, "medications");

    return (
        <ModalWrapper>
            <ModalHeader title="Add Request" onClose={onClose} />
            <div className="flex flex-col gap-4 max-w-2xl">
                <Formik
                    initialValues={{
                        from: "MediCare Pharmacy",
                        key: "",
                        rejectionClaim: "",
                        icd10Code: null
                    }}
                    validationSchema={Yup.object({
                        key: Yup.string(),
                        rejectionClaim: Yup.string()
                            .required("Rejection claim information is required.")
                            .min(10, "Please provide more detailed information in the rejection claim."),
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>
                            <div className="space-y-2 p-4">
                                {/* From and Key Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <InputField
                                            id="from"
                                            name="from"
                                            label="From"
                                            placeholder="Enter from"
                                            disabled
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <InputField
                                            name="key"
                                            label="Key"
                                            placeholder="Enter key"
                                            className="!px-4 !py-2"
                                        />
                                    </div>
                                </div>

                                {/* Rejection Claim */}
                                <div className="space-y-2">
                                    <TextareaField
                                        id="rejectionClaim"
                                        name="rejectionClaim"
                                        label="Rejection Claim"
                                        placeholder="Enter rejection claim details..."
                                        rows={4}
                                        className="w-full rounded-lg !border !border-light-stroke bg-background !px-4 !py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        onChange={(e: any) => {
                                            if (e.target.value !== "") {
                                                setFieldValue("rejectionClaim", e.target.value)
                                                extractMedications(e.target.value)
                                            } else {
                                                setFieldValue("rejectionClaim", "");
                                                setMedications([]);
                                            }
                                        }}
                                    />
                                </div>

                                {/* Medications */}
                                <div className="space-y-2">
                                    <Label className="text-quaternary-white text-sm font-secondary">Medication</Label>
                                    {medications.length > 0 ? <div>
                                        {showCustomMedicationForm ? (
                                            <div className="flex gap-2 items-center h-10 w-full">
                                                <input type="text" value={customMedicine}
                                                    onChange={(e) => setCustomMedicine(e.target.value)} className="text-xs !border !border-light-stroke focus:outline-none !px-3 !py-2 w-full h-full rounded-lg" autoFocus />
                                                <ThemeButton type="button" onClick={handleCustomAddMedication} className="w-full sm:w-20 rounded-lg" variant="primary">
                                                    Add
                                                </ThemeButton>
                                                <ThemeButton onClick={() => {
                                                    setShowCustomMedicationForm(false);
                                                    setCustomMedicine("");
                                                }} type="button" 
                                                    className="w-full sm:w-40 rounded-lg cursor-pointer border border-light-stroke max-w-max" variant="outline">
                                                    Cancel
                                                </ThemeButton>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2 justify-between flex-wrap">
                                                <div className="flex gap-2 items-center flex-wrap">
                                                    {medications.map((med) => (
                                                        <div
                                                            key={med.id}
                                                            className="flex items-center gap-1 bg-status-bg-sky-blue text-status-text-sky-blue font-medium px-2 py-2 rounded-md text-xs"
                                                        >
                                                            {editingMedication === med.id ? (
                                                                <input
                                                                    type="text"
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
                                                                type="button"
                                                                className="ml-2 hover:bg-status-bg-sky-blue p-0.5 cursor-pointer"
                                                            >
                                                                <FiEdit className="h-3 w-3" />
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    removeMedication(med.id)
                                                                }}
                                                                type="button"
                                                                className="hover:bg-status-bg-sky-blue p-0.5 cursor-pointer"
                                                            >
                                                                <FiX className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCustomMedicationForm(true)}
                                                    className="text-blue-navigation-link-button cursor-pointer font-medium text-sm underline"
                                                >
                                                    Missing Medicine? Add it
                                                </button>
                                            </div>
                                        )}
                                    </div> : <div className="text-gray bg-gray-200 text-sm px-3 py-2 rounded-md">
                                        Medications will appear here when detected in rejection claim
                                    </div>}
                                </div>

                                {/* ICD Codes */}
                                <div className="space-y-2">
                                    <Label className="text-quaternary-white text-sm font-secondary">ICD-10 Code</Label>
                                    <ICD10Selector name="icd10Code" />
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