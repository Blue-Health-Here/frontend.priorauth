import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import ThemeButton from "@/components/common/ThemeButton";
import { changePasswordValidationSchema } from "@/utils/validationSchema";
import { FiCheck, FiXCircle, FiAlertTriangle } from "react-icons/fi";
import { useState } from "react";
import { updateProfilePassword } from "@/services/pharmacyService";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const passwordRequirements = [
  { label: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
  { label: "One uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd) },
  { label: "One lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
  { label: "One number", test: (pwd: string) => /\d/.test(pwd) },
  {
    label: "One special character",
    test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
  },
];

const SecuritySettings = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      await updateProfilePassword(dispatch, userId, {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update password");
      console.error("Password update error:", error);
    }
  };

  return (
    <div className="bg-primary-white rounded-lg border border-border-color p-3 sm:p-4">
      <h3 className="text-base font-semibold text-primary-black mb-4">
        Security Settings
      </h3>

      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={changePasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleSubmit,
          resetForm,
        }) => {
          const passwordRequirementsMet = passwordRequirements.map((req) =>
            req.test(values.newPassword)
          );
          const passwordsMatch =
            values.newPassword &&
            values.confirmPassword &&
            values.newPassword === values.confirmPassword;
          const currentPasswordMatchesNew =
            values.currentPassword &&
            values.newPassword &&
            values.currentPassword === values.newPassword;

          return (
            <Form onSubmit={handleSubmit}>
              {!isEditing ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-settings-info-icons-bg flex items-center justify-center p-1">
                      <img
                        src="/Vector (13).svg"
                        alt="Password"
                        className="settings-button w-5 h-5"
                      />
                    </div>
                    <div>
                      <p className="text-md text-muted-foreground font-medium">
                        Password
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center bg-settings-button-bg text-settings-button-text text-sm font-semibold rounded-lg px-2.5 py-2 min-w-[120px] sm:min-w-0 sm:px-4 whitespace-nowrap transition-colors hover:bg-[#EBF1FF]/90"
                  >
                    Change Password
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Left Side - Password Form */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Current Password */}
                    <div className="relative w-full sm:w-[450px] [&_button_svg]:w-4 [&_button_svg]:h-4">
                      <InputField
                        name="currentPassword"
                        label="Current Password"
                        placeholder="Enter current password"
                        variant="default"
                        isPassword={true}
                        className="input-field !w-full !h-10 border border-input-stroke"
                      />
                    </div>

                    {/* New Password */}
                    <div className="relative w-full sm:w-[450px] [&_button_svg]:w-4 [&_button_svg]:h-4">
                      <div className="space-y-2">
                        <InputField
                          name="newPassword"
                          label="New Password"
                          placeholder="Enter new password"
                          variant="default"
                          isPassword={true}
                          className="input-field !w-full !h-10 border border-input-stroke"
                        />
                        {currentPasswordMatchesNew && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center bg-orange-100 text-orange-600">
                              <FiAlertTriangle className="w-2.5 h-2.5" />
                            </div>
                            <span className="text-xs text-orange-600">
                              New password must be different from current
                              password
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative w-full sm:w-[450px] [&_button_svg]:w-4 [&_button_svg]:h-4">
                      <div className="space-y-2">
                        <InputField
                          name="confirmPassword"
                          label="Confirm New Password"
                          placeholder="Confirm new password"
                          variant="default"
                          isPassword={true}
                          className="input-field !w-full !h-10 border border-input-stroke"
                        />
                        {values.confirmPassword.length > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                passwordsMatch
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {passwordsMatch ? (
                                <FiCheck className="w-2.5 h-2.5" />
                              ) : (
                                <FiXCircle className="w-2.5 h-2.5" />
                              )}
                            </div>
                            <span
                              className={`text-xs ${
                                passwordsMatch
                                  ? "text-green-600 font-medium"
                                  : "text-red-600"
                              }`}
                            >
                              {passwordsMatch
                                ? "Passwords match"
                                : "Passwords do not match"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Buttons - now placed below confirm password */}
                    <div className="flex gap-3 w-full pt-2">
                      <ThemeButton
                        type="submit"
                        className="h-10 px-4 bg-update-password-btn-bg !text-quaternary-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-3.5 w-3.5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Updating...
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </ThemeButton>
                      <ThemeButton
                        type="button"
                        variant="tertiary"
                        className="h-10 px-4"
                        onClick={() => {
                          setIsEditing(false);
                          resetForm();
                        }}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </ThemeButton>
                    </div>

                    {/* Error Messages */}
                    {Object.values(errors).length > 0 &&
                      Object.values(touched).some(Boolean) && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-2 flex items-start gap-2">
                          <FiAlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                          <ul className="list-disc list-inside text-xs text-red-600 space-y-1">
                            {Object.entries(errors).map(([key, error]) =>
                              touched[key as keyof typeof touched] && error ? (
                                <li key={key}>{error as string}</li>
                              ) : null
                            )}
                          </ul>
                        </div>
                      )}
                  </div>

                  {/* Right Side - Password Requirements Only */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-3">
                        Password Requirements
                      </h4>
                      <div className="space-y-2">
                        {passwordRequirements.map((requirement, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-sm flex items-center justify-center bg-mini-squares-bg`}
                            >
                              {values.newPassword.length > 0 &&
                                passwordRequirementsMet[index] && (
                                  <FiCheck className="w-2.5 h-2.5 text-white" />
                                )}
                            </div>
                            <span
                              className={`text-xs text-quaternary-white`}
                            >
                              {requirement.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SecuritySettings;
