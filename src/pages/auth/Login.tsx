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
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                src="/images/updated-logo.svg"
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
                loginError ? "text-[#FF2E37]" : "text-secondary-black"
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
                <div className="mb-6">
                  <label
                    htmlFor="userName"
                    className="block text-sm text-[#7A7A7A] mb-1"
                  >
                    Username
                  </label>
                  <InputField
                    name="userName"
                    type="text"
                    placeholder="Enter username"
                    variant="FloatingLabel"
                    className={`w-full max-w-[466px] h-[40px] border ${
                      loginError ? "border-[#FF2E37]" : "border-[#EBEBEB]"
                    } rounded-lg px-4 text-gray-900 placeholder:text-[#9E9E9E] placeholder:text-sm focus:outline-none ${
                      loginError ? "border-[#FF2E37]" : ""
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm text-[#7A7A7A] mb-1"
                  >
                    Password
                  </label>
                  <div className="relative w-full max-w-[466px]">
                    <InputField
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      variant="FloatingLabel"
                      className={`w-full h-[40px] border ${
                        loginError ? "border-[#FF2E37]" : "border-[#EBEBEB]"
                      } rounded-lg px-4 pr-10 text-gray-900 placeholder:text-[#9E9E9E] placeholder:text-sm focus:outline-none ${
                        loginError ? "border-[#FF2E37]" : ""
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

                <div className="flex items-center justify-between mb-8 w-full max-w-[466px]">
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

                <div className="flex justify-center mb-6">
                  <button
                    type="submit"
                    className="w-full max-w-[360px] cursor-pointer text-xs sm:text-sm bg-primary-navy-blue text-white py-3.5 rounded-lg"
                  >
                    Login
                  </button>
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

      <div className="hidden md:block w-1/2 p-10 bg-[#EBF1FF]">
        <img
          src="/images/contact-section.png"
          alt="Hands holding each other"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
    </div>
  );
};

export default Login;