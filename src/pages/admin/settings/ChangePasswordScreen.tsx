import { Form, Formik } from 'formik';
import React from 'react';
import InputField, { inputStyles } from '../../../components/common/form/InputField';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { changePasswordValidationSchema } from '../../../utils/validationSchema';

const ChangePasswordScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/admin/settings');
  };

  return (
    <div className="rounded-2xl bg-primary-white shadow-lg px-5 pt-6 pb-5 min-h-[calc(100vh-11rem)] relative">
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
        {({ handleSubmit, setTouched }) => (
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
            <div className="md:w-md grid grid-cols-1 gap-6 mt-10">
              <InputField
                className={inputStyles.defaultInput}
                type="password"
                label="Current Password"
                placeholder="**********************"
                name="currentPassword"
              />
              <InputField
                className={inputStyles.defaultInput}
                type="password"
                label="New Password"
                placeholder="**********************"
                name="newPassword"
              />
              <InputField
                className={inputStyles.defaultInput}
                type="password"
                label="Confirm New Password"
                placeholder="**********************"
                name="confirmPassword"
              />
            </div>
            <div className="md:absolute md:bottom-5 md:right-5 flex flex-col md:flex-row gap-3 mt-20">
              <Button
                title="Cancel"
                textColor="text-primary-sky-blue"
                className="w-full md:w-24 px-6 bg-primary-white border border-primary-sky-blue hover:bg-primary-sky-blue hover:text-primary-white"
                noHover
                onClick={handleCancel}
              />
              <Button
                title="Update"
                className="w-full md:w-24 px-6 bg-primary-blue text-white"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordScreen;
