import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../../components/common/form/InputField';
import { changePasswordValidationSchema } from '../../../../utils/validationSchema';
import ThemeButton from '@/components/common/ThemeButton';
import { FiCheck, FiXCircle, FiAlertTriangle } from 'react-icons/fi';
import { updateProfilePassword } from '@/services/pharmacyService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import toast from 'react-hot-toast';

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

const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData } = useSelector((state: RootState) => state.global);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    navigate('/admin/settings');
  };

  const handleSubmit = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (!profileData?.id) {
      toast.error("User ID not available");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfilePassword(dispatch, profileData.id, {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success("Password updated successfully!");
      navigate('/admin/settings');
    } catch (error) {
      toast.error("Failed to update password");
      console.error("Password update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldBorderColor = (fieldName: string, values: any, errors: any, touched: any) => {
    if (!touched[fieldName]) return 'border-gray-300';

    if (fieldName === 'confirmPassword') {
      const isMatching = values.newPassword && values.confirmPassword &&
        values.newPassword === values.confirmPassword;
      const hasError = errors[fieldName];

      if (isMatching && !hasError) return 'border-green-500';
      if (hasError || (values.confirmPassword && !isMatching)) return 'border-red-500';
    } else {
      if (!errors[fieldName] && values[fieldName]) return 'border-green-500';
      if (errors[fieldName]) return 'border-red-500';
    }

    return 'border-gray-300';
  };

  const getRuleColor = (rule: string, password: string, touched: any, confirmPassword?: string) => {
    if (!touched.newPassword && rule !== 'match') return 'text-quaternary-white';
    if (!touched.confirmPassword && rule === 'match') return 'text-quaternary-white';

    switch (rule) {
      case 'length':
        if (!password) return 'text-quaternary-white';
        return password.length >= 8 ? 'text-green-500' : 'text-red-500';
      case 'lowercase':
        if (!password) return 'text-quaternary-white';
        return /[a-z]/.test(password) ? 'text-green-500' : 'text-red-500';
      case 'uppercase':
        if (!password) return 'text-quaternary-white';
        return /[A-Z]/.test(password) ? 'text-green-500' : 'text-red-500';
      case 'number':
        if (!password) return 'text-quaternary-white';
        return /\d/.test(password) ? 'text-green-500' : 'text-red-500';
      case 'special':
        if (!password) return 'text-quaternary-white';
        return /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-500' : 'text-red-500';
      case 'match':
        if (!password || !confirmPassword) return 'text-quaternary-white';
        return password === confirmPassword ? 'text-green-500' : 'text-red-500';
      default:
        return 'text-quaternary-white';
    }
  };

  return (
    <div className="rounded-2xl bg-primary-white theme-shadow px-5 pt-6 pb-5 md:min-h-[calc(100vh-11rem)] relative">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Change Password</h2>

      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={changePasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setTouched, values, errors, touched }) => {
          
          const passwordsMatch =
            values.newPassword &&
            values.confirmPassword &&
            values.newPassword === values.confirmPassword;
          const currentPasswordMatchesNew =
            values.currentPassword &&
            values.newPassword &&
            values.currentPassword === values.newPassword;

          return (
            <Form
              onSubmit={(e) => {
                setTouched({
                  currentPassword: true,
                  newPassword: true,
                  confirmPassword: true,
                });
                handleSubmit(e);
              }}
            >
              <div className="mt-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="relative">
                    <InputField
                      name="currentPassword"
                      label="Current Password"
                      placeholder="Enter Password"
                      variant="default"
                      isPassword={true}
                      className={`${getFieldBorderColor('currentPassword', values, errors, touched)}`}
                    />
                    {errors.currentPassword && touched.currentPassword && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.currentPassword}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="relative">
                    <InputField
                      name="newPassword"
                      label="New Password"
                      placeholder="Enter Password"
                      variant="default"
                      isPassword={true}
                      className={`${getFieldBorderColor('newPassword', values, errors, touched)}`}
                    />
                    {errors.newPassword && touched.newPassword && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.newPassword}
                      </div>
                    )}
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
                  <div className="space-y-2">
                    <div className="relative">
                      <InputField
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Enter Password"
                        variant="default"
                        isPassword={true}
                        className={`${getFieldBorderColor('confirmPassword', values, errors, touched)}`}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </div>
                      )}
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
                    <div className="text-sm space-y-1">
                      <p className="font-medium text-quaternary-white">Password Requirements:</p>
                      {passwordRequirements.map((requirement, index) => (
                        <p 
                          key={index} 
                          className={getRuleColor(
                            ['length', 'uppercase', 'lowercase', 'number', 'special'][index], 
                            values.newPassword, 
                            touched
                          )}
                        >
                          • {requirement.label}
                        </p>
                      ))}
                      <p className={getRuleColor('match', values.newPassword, touched, values.confirmPassword)}>
                        • Passwords must match
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:absolute bottom-0 md:bottom-5 md:right-5 flex flex-col md:flex-row gap-3 mt-6 md:mt-20">
                <ThemeButton 
                  variant="tertiary" 
                  className="!px-7 !py-3" 
                  onClick={handleCancel} 
                  type="button"
                  disabled={isSubmitting}
                >
                  Cancel
                </ThemeButton>
                <ThemeButton 
                  variant="primary" 
                  className="!px-7 !py-3" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ChangePasswordPage;