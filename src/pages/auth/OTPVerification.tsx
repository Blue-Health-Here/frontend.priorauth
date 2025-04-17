import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const OTPVerification: React.FC = () => {
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);

  // Use proper typing for refs
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Handle OTP input changes with proper type annotations
  const handleOtpChange = (index: number, value: string): void => {
    if (value.match(/^[0-9]$/) || value === "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Auto-focus next input after entering a digit
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  // Handle backspace key with type annotations
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Verification Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-between py-10 px-6 md:px-8 bg-primary-white">
        <div className="self-start mb-8">
          <img
            src="/images/logo.svg"
            alt="Prior Auth Support Logo"
            className="h-7 sm:h-8 md:h-10"
          />
        </div>

        <div className="flex-grow flex flex-col gap-8 md:gap-11 justify-center items-center w-full max-w-md mx-auto">
          <div className="text-center space-y-3">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary-black">
              Verify Email
            </h1>
            <p className="text-secondary-black text-xs sm:text-sm md:text-base font-secondary">
              A 4 digit OTP has been sent to your email address{" "}
              <Link
                to="/resend-otp"
                className="text-blue-navigation-link-button"
              >
                laslie.alexander@gmail.com.
              </Link>{" "}
              This code is valid for only 1 minute.
            </p>
            <Link
              to="/"
              className="text-primary-navy-blue font-semibold text-sm md:text-lg lg:text-xl"
            >
              Change Email
            </Link>
          </div>

          <form className="w-full">
            <div className="flex justify-center items-center gap-4">
              {otpValues.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 sm:w-12 md:w-14 lg:w-16 h-12 text-center text-xl border-b-2 border-dark-stroke focus:border-dark-stroke focus:outline-none py-2"
                  />
              ))}
            </div>

          </form>
            <div className="text-center space-y-3">
              <p className="text-secondary-black text-xs sm:text-sm md:text-base font-secondary">
                If you didn’t receive the code then click on the button below.
              </p>
              <Link
                to="/"
                className="text-primary-navy-blue font-semibold text-sm md:text-lg lg:text-xl"
              >
                Resend Code
              </Link>
            </div>
        </div>

        <div className="md:h-8"></div>
      </div>

      {/* Right side - Image */}
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

export default OTPVerification;
