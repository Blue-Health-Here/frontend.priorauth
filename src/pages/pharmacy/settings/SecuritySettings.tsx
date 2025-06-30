import { Form, Formik } from 'formik';
import InputField from '@/components/common/form/InputField';
import ThemeButton from '@/components/common/ThemeButton';
import { changePasswordValidationSchema } from '@/utils/validationSchema';
import { FiLock, FiCheck, FiXCircle, FiAlertTriangle } from 'react-icons/fi';
import { useState } from 'react';

const passwordRequirements = [
  { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
  { label: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
  { label: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
  { label: 'One number', test: (pwd: string) => /\d/.test(pwd) },
  { label: 'One special character', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
];

const SecuritySettings = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-base font-semibold text-foreground mb-4">Security Settings</h3>
      {!isChangingPassword ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center p-1">
              <FiLock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Password</p>
              <p className="text-sm font-medium">••••••••</p>
            </div>
          </div>
          <ThemeButton onClick={() => setIsChangingPassword(true)} variant="outline">
            Change Password
          </ThemeButton>
        </div>
      ) : (
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={changePasswordValidationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values, "values");
            // Simulate API call
            setTimeout(() => {
              setSuccessMessage('Password changed successfully!');
              setSubmitting(false);
              resetForm();
              setTimeout(() => {
                setIsChangingPassword(false);
                setSuccessMessage('');
              }, 2000);
            }, 1000);
          }}
        >
          {({ values, errors, touched, isSubmitting, handleSubmit }) => {
            const passwordRequirementsMet = passwordRequirements.map((req) => req.test(values.newPassword));
            const passwordsMatch = values.newPassword && values.confirmPassword && values.newPassword === values.confirmPassword;
            const currentPasswordMatchesNew = values.currentPassword && values.newPassword && values.currentPassword === values.newPassword;
            return (
              <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Side - Password Form */}
                  <div className="space-y-6">
                    {/* Current Password */}
                    <InputField
                      name="currentPassword"
                      label="Current Password"
                      placeholder="Enter current password"
                      variant="default"
                      isPassword={true}
                    />
                    {/* New Password */}
                    <div className="space-y-2">
                      <InputField
                        name="newPassword"
                        label="New Password"
                        placeholder="Enter new password"
                        variant="default"
                        isPassword={true}
                      />
                      {currentPasswordMatchesNew && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center bg-orange-100 text-orange-600">
                            <FiAlertTriangle className="w-2.5 h-2.5" />
                          </div>
                          <span className="text-xs text-orange-600">
                            New password must be different from current password
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <InputField
                        name="confirmPassword"
                        label="Confirm New Password"
                        placeholder="Confirm new password"
                        variant="default"
                        isPassword={true}
                      />
                      {values.confirmPassword.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordsMatch ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                          >
                            {passwordsMatch ? <FiCheck className="w-2.5 h-2.5" /> : <FiXCircle className="w-2.5 h-2.5" />}
                          </div>
                          <span className={`text-xs ${passwordsMatch ? 'text-green-600 font-medium' : 'text-red-600'}`}>
                            {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Error Messages */}
                    {Object.values(errors).length > 0 && Object.values(touched).some(Boolean) && (
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
                        <span className="text-green-800 text-xs">{successMessage}</span>
                      </div>
                    )}
                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <ThemeButton type="submit" className="flex-1" disabled={isSubmitting}>
                        Save Password
                      </ThemeButton>
                      <ThemeButton
                        type="button"
                        variant="tertiary"
                        className="flex-1"
                        onClick={() => setIsChangingPassword(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </ThemeButton>
                    </div>
                  </div>
                  {/* Right Side - Password Requirements */}
                  <div className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-foreground mb-3">Password Requirements</h4>
                      <div className="space-y-2">
                        {passwordRequirements.map((requirement, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center ${values.newPassword.length > 0 && passwordRequirementsMet[index]
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-100 text-gray-400'
                                }`}
                            >
                              {values.newPassword.length > 0 && passwordRequirementsMet[index] ? (
                                <FiCheck className="w-2.5 h-2.5" />
                              ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                              )}
                            </div>
                            <span
                              className={`text-xs ${values.newPassword.length > 0 && passwordRequirementsMet[index]
                                ? 'text-green-600 font-medium'
                                : 'text-muted-foreground'
                                }`}
                            >
                              {requirement.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Additional Security Tips */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Security Tips</h4>
                      <ul className="text-xs text-blue-800 space-y-1">
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