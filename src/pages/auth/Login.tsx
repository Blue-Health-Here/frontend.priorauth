import React, { useState } from "react";
import InputField from "../../components/common/form/InputField";
import CustomCheckbox from "../../components/common/form/CustomCheckbox";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik, FormikValues } from "formik";
import { signInInitialVals } from "../../utils/initialVals";
import { signInValidationSchema } from "../../utils/validationSchema";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { submitLogin } from "../../services/authService";
import ThemeButton from "@/components/common/ThemeButton";
import { useTheme } from "@/hooks/useTheme";

const Login: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleSubmit = async (values: FormikValues) => {
    try {
      setLoginError(false);
      const response = await submitLogin(dispatch, values);
      if (response) {
        if (response.roleCode === "pharmacyUser") navigate("/pharmacy");
        else navigate("/admin");
      }
    } catch (error: any) {
      setLoginError(true);
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-full md:w-1/2 flex flex-col py-10 pt-30 px-6 md:px-8 bg-primary-white">
        <div className="w-full max-w-[500px] mx-auto flex flex-col">
          <div className="mt-10 mb-5 w-max">
            <Link to="/" className="w-max">
              <img
                src={isDark ? "/icons/logo-login-light.svg" : "/images/updated-logo.svg"}
                alt="Prior Auth Support Logo"
                className="h-12 sm:h-14 md:h-12 w-max"
              />
            </Link>
          </div>
          <div className="mb-8">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary-black mb-2">
              Welcome back
            </h1>
            <p
              className={`text-xs sm:text-sm md:text-base font-secondary ${
                loginError ? "text-error-clip" : "text-secondary-black"
              }`}
            >
              {loginError
                ? "No information found for this record. Try again."
                : "Please enter your details"}
            </p>
          </div>
          <Formik
            initialValues={signInInitialVals}
            validationSchema={signInValidationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="userName"
                    className="block text-sm text-quaternary-white mb-1"
                  >
                    Username
                  </label>
                  <InputField
                    name="userName"
                    type="text"
                    placeholder="Enter username"
                    variant="FloatingLabel"
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm text-quaternary-white mb-1"
                  >
                    Password
                  </label>
                  <InputField
                    name="password"
                    isPassword={true}
                    placeholder="Enter your password"
                    className="!px-4 !py-2 w-full"
                  />
                </div>

                <div className="flex items-center justify-between mb-8 w-full">
                  <label
                    htmlFor="remember"
                    className="inline-flex items-center cursor-pointer"
                  >
                    <CustomCheckbox
                      id="remember"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <span className="text-xs md:text-sm text-secondary-black ml-2 font-secondary">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="#"
                    className="text-xs md:text-sm text-[#007AFA] font-medium underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex justify-center mb-4">
                  <ThemeButton variant="primary" type="submit" className="max-w-[360px] !py-3.5 cursor-pointer sm:min-w-[400px]">Login</ThemeButton>
                </div>

                <div className="text-center text-xs sm:text-sm md:text-base text-secondary-black">
                  Don't have an account?{"  "}
                  <Link to="#" className="text-[#007AFA] font-medium underline">
                    Sign up for free
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="hidden md:block w-1/2 p-10 bg-tabs-active-body">
        <img
          src="/login-img.jpg"
          alt="Hands holding each other"
          className="w-full h-full object-cover rounded-3xl"
          style={{ maxHeight: 'calc(100vh - 5rem)' }}
        />
      </div>
    </div>
  );
};

export default Login;