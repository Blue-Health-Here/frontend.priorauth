import { modifyPrescriberSchema, modifyPrescriberSchemaForAdmin } from "@/utils/validationSchema";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import FormField from "./FormField";
import ThemeButton from "@/components/common/ThemeButton";
import { uploadPrescriberImage } from "@/services/pharmacyService";
import { useDispatch } from "react-redux";

const EditPrescriberForm: React.FC<any> = ({ selectedPrescriber, handleSavePrescriber, isAdmin }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string>(selectedPrescriber?.pictureUrl || "/images/Abstergo Ltd..png");
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(selectedPrescriber?.pictureUrl || "");
    const dispatch = useDispatch();

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("profile-pic", file);

            const uploadedUrl = await uploadPrescriberImage(dispatch, selectedPrescriber?.id, formData);
            if (uploadedUrl) {
                // const previewUrl = URL.createObjectURL(file);
                // setImagePreview(previewUrl);
                setImagePreview(uploadedUrl?.pictureUrl);
            }
        } catch (error) {
            console.error("Image upload failed", error);
        }
    };

    const handleImageDelete = () => {
        setImagePreview("/images/Abstergo Ltd..png");
        setUploadedImageUrl("");
    };
    console.log(selectedPrescriber, "Das")

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 space-y-2 pr-0 lg:pr-4">
                <h2 className="text-md font-medium text-primary-black">Basic Information</h2>
                <Formik
                    initialValues={selectedPrescriber}
                    validationSchema={isAdmin ? modifyPrescriberSchemaForAdmin : modifyPrescriberSchema}
                    onSubmit={(values) => {
                        handleSavePrescriber({
                            ...values,
                            imageUrl: uploadedImageUrl,
                        });
                    }}
                >
                    {({ values }) => (
                        <Form id="prescriber-form" className="space-y-4 mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {isAdmin ? (
                                    <>
                                        <FormField
                                            iconSrc="/prescriber (2).svg"
                                            iconAlt="First Name"
                                            label="First Name"
                                            name="firstName"
                                            value={values.firstName}
                                        />
                                        <FormField
                                            iconSrc="/prescriber (2).svg"
                                            iconAlt="Last Name"
                                            label="Last Name"
                                            name="lastName"
                                            value={values.lastName}
                                        />
                                        <FormField
                                            iconSrc="/Email.svg"
                                            iconAlt="Email"
                                            label="Email"
                                            name="email"
                                            value={values.email}
                                        />
                                    </>
                                ) : (
                                    <FormField
                                        iconSrc="/prescriber (2).svg"
                                        iconAlt="Name"
                                        label="Prescriber Name"
                                        name="prescriber"
                                        value={values.prescriber}
                                    />
                                )}
                                <FormField
                                    iconSrc="/npi.svg"
                                    iconAlt="NPI"
                                    label="NPI"
                                    name="npi"
                                    value={values.npi}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {isAdmin && (    
                                    <FormField
                                        iconSrc="/phone.svg"
                                        iconAlt="dateOfBirth"
                                        label="Date of Birth"
                                        name="dateOfBirth"
                                        type="date"
                                        value={values.dateOfBirth}
                                    />
                                )}
                                <FormField
                                    iconSrc="/phone.svg"
                                    iconAlt="Phone"
                                    label="Phone"
                                    name={isAdmin ? "phone" : "prescriberPhone"}
                                    value={values.prescriberPhone}
                                />
                                <FormField
                                    iconSrc="/phone.svg"
                                    iconAlt="Fax"
                                    label="Fax"
                                    name={isAdmin ? "faxNumber" : "prescriberFax"}
                                    value={values.prescriberFax}
                                />

                                <FormField
                                    iconSrc="/city.svg"
                                    iconAlt="City"
                                    label="City"
                                    name={isAdmin ? "city" : "prescriberCity"}
                                    value={values.prescriberCity}
                                />
                                <FormField
                                    iconSrc="/address.svg"
                                    iconAlt="Address"
                                    label="Address"
                                    name={isAdmin ? "address" : "prescriberAddress"}
                                    value={values.prescriberAddress}
                                />
                            </div>

                            <button type="submit" hidden />
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="hidden lg:block w-px bg-[#EBEBEB] flex-shrink-0"></div>

            <div className="w-full lg:w-1/3 space-y-6 pl-6">
                <h2 className="text-md font-medium text-primary-black">Display Picture</h2>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200">
                        <img
                            src={imagePreview}
                            alt="Prescriber Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />

                    <div className="flex gap-2 w-full max-w-[280px]">
                        <ThemeButton
                            variant="secondary"
                            className="flex-1 border border-[#CBDAFF] bg-transparent hover:bg-[#CBDAFF]/10 text-primary-navy-blue"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Change Picture
                        </ThemeButton>

                        <ThemeButton
                            variant="danger"
                            className="flex-1 border border-[#FF2E37] bg-[#FFE0E2] text-[#FF2E37] hover:bg-[#FFE0E2]/90"
                            onClick={handleImageDelete}
                        >
                            Delete Picture
                        </ThemeButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPrescriberForm;
