import InputField from "@/components/common/form/InputField";
import Loading from "@/components/common/Loading";
import ModalHeader from "@/components/common/ModalHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import ThemeButton from "@/components/common/ThemeButton";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const ShowPasswordModal: React.FC<any> = ({ isLoading, handleSubmit }) => {
    const [initialValues, setInitialValues] = useState({ password: "" });

    useEffect(() => {
        setInitialValues({ password: "" });
    }, []);

    return (
        <ModalWrapper>
            <ModalHeader title="Enter your password" />
            <div className="flex flex-col gap-4 min-w-lg">
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
                    {() => (
                        <Form className="flex flex-col h-full">
                            <div className="p-4">
                                <InputField
                                    name="password"
                                    isPassword={true}
                                    placeholder="Enter your password"
                                    className="!px-4 !py-2 w-full"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="flex justify-end items-center gap-2 border-t border-light-stroke px-4 py-4">
                                <ThemeButton
                                    type="submit"
                                    className="w-full sm:w-24 rounded-lg min-w-max flex justify-center items-center gap-2"
                                    variant="primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loading />
                                            Submitting...
                                        </>
                                    ) : "Submit"}
                                </ThemeButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </ModalWrapper>
    )
};

export default ShowPasswordModal;