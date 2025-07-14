import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../../components/common/form/InputField';
import Button from '../../../../components/common/Button';
import { changePasswordValidationSchema } from '../../../../utils/validationSchema';
import ThemeButton from '@/components/common/ThemeButton';

const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/admin/settings');
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
        onSubmit={(values) => {
          console.log('Submitted Values:', values);
        }}
      >
        {({ handleSubmit, setTouched, values, errors, touched }) => (
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
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="font-medium text-quaternary-white">Your password must contain:</p>
                    <p className={getRuleColor('uppercase', values.newPassword, touched, values.confirmPassword)}>
                      • Uppercase letter
                    </p>
                    <p className={getRuleColor('lowercase', values.newPassword, touched, values.confirmPassword)}>
                      • Lowercase letter
                    </p>
                    <p className={getRuleColor('special', values.newPassword, touched, values.confirmPassword)}>
                      • Special character
                    </p>
                    <p className={getRuleColor('number', values.newPassword, touched, values.confirmPassword)}>
                      • A number
                    </p>
                    <p className={getRuleColor('length', values.newPassword, touched, values.confirmPassword)}>
                      • At least 8 characters long
                    </p>
                    <p className={getRuleColor('match', values.newPassword, touched, values.confirmPassword)}>
                      • Passwords must match
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:absolute bottom-0 md:bottom-5 md:right-5 flex flex-col md:flex-row gap-3 mt-6 md:mt-20">
              <ThemeButton variant="tertiary" className="!px-7 !py-3" onClick={handleCancel} type="button">
                Cancel
              </ThemeButton>
              <ThemeButton variant="primary" className="!px-7 !py-3" type="submit">
                Update
              </ThemeButton>
              {/* <Button
                title="Cancel"
                textColor="text-primary-sky-blue"
                className="w-full md:w-24 px-6 bg-primary-white border border-primary-sky-blue hover:bg-primary-sky-blue hover:text-primary-white"
                noHover
                onClick={handleCancel}
              />
              <Button
                title="Update"
                className="w-full md:w-24 px-6 bg-primary-blue text-white"
                type="submit"
              /> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordPage;