import { Form, Formik } from "formik";
import InputField from "@/components/common/form/InputField";
import ThemeButton from "@/components/common/ThemeButton";
import { changePasswordValidationSchema } from "@/utils/validationSchema";
import { FiCheck, FiXCircle, FiAlertTriangle } from "react-icons/fi";
import { useState } from "react";

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

const SecuritySettings = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="bg-white rounded-lg border border-[#CBDAFF] p-3">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Security Settings
      </h3>
      {!isChangingPassword ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#EBF1FF] flex items-center justify-center p-1">
              <img src="/Vector (13).svg" alt="Password" className="w-5 h-5" />
            </div>
            <div>
              <p className="text-md text-muted-foreground font-medium">
                Password
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsChangingPassword(true)}
            className="flex items-center cursor-pointer justify-center gap-2 bg-[#EBF1FF] text-[#163066] text-sm font-semibold rounded-lg px-4 py-2 transition-colors hover:bg-[#EBF1FF]/90"
          >
            Change Password
          </button>
        </div>
      ) : (
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={changePasswordValidationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values, "values");
            // Simulate API call
            setTimeout(() => {
              setSuccessMessage("Password changed successfully!");
              setSubmitting(false);
              resetForm();
              setTimeout(() => {
                setIsChangingPassword(false);
                setSuccessMessage("");
              }, 2000);
            }, 1000);
          }}
        >
          {({ values, errors, touched, isSubmitting, handleSubmit }) => {
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Side - Password Form */}
                  <div className="space-y-6">
                    {/* Current Password */}
                    <div className="relative w-[450px] [&_button_svg]:w-4 [&_button_svg]:h-4">
                      <InputField
                        name="currentPassword"
                        label="Current Password"
                        placeholder="Enter current password"
                        variant="default"
                        isPassword={true}
                        className="!w-full !h-10"
                      />
                    </div>

                    {/* New Password */}
                    <div className="relative w-[450px] [&_button_svg]:w-4 [&_button_svg]:h-4">
                      <div className="space-y-2">
                        <InputField
                          name="newPassword"
                          label="New Password"
                          placeholder="Enter new password"
                          variant="default"
                          isPassword={true}
                          className="!w-full !h-10"
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
                    <div className="relative w-[450px] [&_button_svg]:w-4 [&_button_svg]:h-4">
                      <div className="space-y-2">
                        <InputField
                          name="confirmPassword"
                          label="Confirm New Password"
                          placeholder="Confirm new password"
                          variant="default"
                          isPassword={true}
                          className="!w-full !h-10"
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

                    {/* Success Message */}
                    {successMessage && (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-2 flex items-center gap-2">
                        <FiCheck className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 text-xs">
                          {successMessage}
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <ThemeButton
                        type="submit"
                        className="flex items-center gap-2 py-3"
                        disabled={isSubmitting}
                      >
                        <span>Update Password</span>
                      </ThemeButton>
                      <ThemeButton
                        type="button"
                        variant="tertiary"
                        className="flex items-center gap-2 py-3 px-3"
                        onClick={() => setIsChangingPassword(false)}
                        disabled={isSubmitting}
                      >
                        <span>Cancel</span>
                      </ThemeButton>
                    </div>
                  </div>

                  {/* Right Side - Password Requirements */}
                  <div className="space-y-4">
                    <div className="bg-[#EBF1FF]/30 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-foreground mb-3">
                        Password Requirements
                      </h4>
                      <div className="space-y-2">
                        {passwordRequirements.map((requirement, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                values.newPassword.length > 0 &&
                                passwordRequirementsMet[index]
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {values.newPassword.length > 0 &&
                              passwordRequirementsMet[index] ? (
                                <FiCheck className="w-2.5 h-2.5" />
                              ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                              )}
                            </div>
                            <span
                              className={`text-xs ${
                                values.newPassword.length > 0 &&
                                passwordRequirementsMet[index]
                                  ? "text-green-600 font-medium"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {requirement.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Security Tips */}
                    <div className="bg-[#EBF1FF]/30 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-[#163066] mb-2">
                        Security Tips
                      </h4>
                      <ul className="text-xs text-[#163066] space-y-1">
                        <li>• Use a unique password you don't use elsewhere</li>
                        <li>• Consider using a password manager</li>
                        <li>• Avoid using personal information in passwords</li>
                        <li>• Change your password regularly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

export default SecuritySettings;
