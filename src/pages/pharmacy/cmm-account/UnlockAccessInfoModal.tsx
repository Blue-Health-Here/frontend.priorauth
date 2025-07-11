import InputField from "@/components/common/form/InputField";
import ModalHeader from "@/components/common/ModalHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import ThemeButton from "@/components/common/ThemeButton";
import { Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface UnlockAccessInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UnlockAccessInfoModal: React.FC<UnlockAccessInfoModalProps> = ({ isOpen, onClose }) => {
    const [loginError, setLoginError] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleSubmit = async (values: FormikValues) => {
    try {
        setLoginError(false);
        console.log(values, isOpen, "values");

        const userData = localStorage.getItem("user");
        const token = userData ? JSON.parse(userData) : null;

        if (token) {
            navigate("/admin"); // ✅ Safe to do it here
        } else {
            toast.error("Invalid password or not logged in.");
        }
    } catch (error: any) {
        setLoginError(true);
        toast.error(error?.message);
    }
};


    return (
        <ModalWrapper>
            <div className="min-w-xl">
                <ModalHeader title="Unlock Sensitive Information" subtitle="To access sensitive information, your password is required" onClose={onClose} />
                <div className="relative overflow-y-auto flex-1">
                    <Formik
                        initialValues={{ password: "" }}
                        validationSchema={Yup.object({
                            password: Yup.string()
                                .min(6, "Password must be at least 6 characters")
                                .required("Password is required"),
                        })}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="mb-4 p-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm text-[#7A7A7A] mb-1"
                                    >
                                        Password
                                    </label>
                                    <div className="relative w-full">
                                        <InputField
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password"
                                            variant="FloatingLabel"
                                            className={`w-full h-[40px] border ${loginError ? "border-[#FF2E37]" : "border-[#EBEBEB]"
                                                } rounded-lg px-4 pr-10 text-gray-900 placeholder:text-[#9E9E9E] placeholder:text-sm focus:outline-none ${loginError ? "border-[#FF2E37]" : ""
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <FiEyeOff size={18} className="text-[#525252]" />
                                            ) : (
                                                <FiEye size={15} className="text-[#525252]" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end items-center gap-4 border-t border-light-stroke px-4 py-4">
                                    <ThemeButton onClick={onClose} type="button" className="w-full sm:w-40 rounded-theme-r cursor-pointer border border-light-stroke max-w-max" variant="outline">
                                        Cancel
                                    </ThemeButton>
                                    <ThemeButton type="submit" className="w-full sm:w-40 rounded-theme-r max-w-max" variant="primary">
                                        Unlock Access
                                    </ThemeButton>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default UnlockAccessInfoModal;