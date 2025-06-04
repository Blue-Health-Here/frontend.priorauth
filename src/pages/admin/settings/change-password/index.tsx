import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputField  from '../../../../components/common/form/InputField';
import Button from '../../../../components/common/Button';
import { changePasswordValidationSchema } from '../../../../utils/validationSchema';

const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/admin/settings');
  };

  return (
    <div className="rounded-2xl bg-primary-white shadow-lg px-5 pt-6 pb-5 md:min-h-[calc(100vh-11rem)] relative">
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
            <div className="mt-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                  name="password"
                  label="Current Password"
                  placeholder="Enter Password"
                  variant="default"
                  isPassword={true}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter Password"
                  variant="default"
                  isPassword={true}
                />
                <InputField
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Enter Password"
                  variant="default"
                  isPassword={true}
                />
              </div>
            </div>
            <div className="md:absolute bottom-0 md:bottom-5 md:right-5 flex flex-col md:flex-row gap-3 mt-6 md:mt-20">
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

export default ChangePasswordPage;
