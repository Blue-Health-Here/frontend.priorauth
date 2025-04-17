import React, { useState } from "react";
import InputField from "../components/input/InputField";
import CustomCheckbox from "../components/checkbox/CustomCheckbox";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <div className="flex h-screen w-full">
      <div className="w-full md:w-1/2 flex flex-col justify-between py-10 px-6 md:px-8 bg-primary-white">
        <div className="self-start mb-8">
          <img
            src="/images/logo.svg"
            alt="Prior Auth Support Logo"
            className="h-7 sm:h-8 md:h-10"
          />
        </div>

        <div className="flex-grow flex flex-col justify-center items-center w-full max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary-black mb-1">
              Welcome back to, Prior Auth
            </h1>
            <p className="text-secondary-black text-xs sm:text-sm md:text-base font-secondary">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form className="w-full">
            <div className="mb-6">
              <InputField
                id="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                isFocused={emailFocused}
              />
            </div>

            <div className="mb-4">
              <InputField
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                isFocused={passwordFocused}
              />
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
              <CustomCheckbox
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
                <label
                  htmlFor="remember"
                  className="text-xs md:text-sm text-secondary-black ml-2 font-secondary"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-xs md:text-sm text-erro-clip font-secondary">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full text-xs sm:text-sm md:text-base bg-primary-navy-blue text-white py-2 rounded-md mb-6 font-semibold"
            >
              Login
            </button>

            <div className="text-center text-xs sm:text-sm md:text-base text-secondary-black">
              Don't have an account?{"  "}
              <a href="#" className="text-primary-black font-semibold">
                Sign up for free
              </a>
            </div>
          </form>
        </div>

        <div className="md:h-8"></div>
      </div>

      <div className="hidden md:block w-1/2">
        <img
          src="/images/contact-section.png"
          alt="Hands holding each other"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginForm;

