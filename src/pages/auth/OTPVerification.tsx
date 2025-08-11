import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const OTPVerification: React.FC = () => {
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);
  const [isOtpIncorrect, setIsOtpIncorrect] = useState(false);
  // const [timeRemaining, setTimeRemaining] = useState("14:59");

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleOtpChange = (index: number, value: string): void => {
    if (isOtpIncorrect) setIsOtpIncorrect(false);

    if (value.match(/^[0-9]$/) || value === "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value !== "" && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpValues.join("");

    if (enteredOtp !== "1234") {
      setIsOtpIncorrect(true);
    } else {
      console.log("OTP verified successfully!");
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Verification Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-between py-10 px-6 md:px-8 bg-primary-white">
        <div className="flex-grow flex flex-col gap-8 md:gap-6 justify-center w-full max-w-md mx-auto">
          {/* Logo container */}
          <div className="">
            <img
              src="/updated-logo.svg"
              alt="Prior Auth Support Logo"
              className="h-10 sm:h-12 mt-6"
            />
          </div>

          {/* Text container */}
          <div className="space-y-3 w-full">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary-black text-left">
              Verify Details
            </h1>
            <p className="text-secondary-black text-xs sm:text-sm md:text-base font-secondary text-left">
              We've sent a code to{" "}
              <Link to="/resend-otp" className="font-bold">
                laslie.alexander@gmail.com
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {/* OTP inputs container - kept original left alignment */}
            <div className="flex justify-center sm:ustify-start items-center gap-4">
              {otpValues.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-10 sm:w-12 md:w-14 lg:w-24 h-14 text-center text-xl font-medium 
                            border rounded-xl focus:outline-none py-2
                            transition-colors duration-200
                            ${isOtpIncorrect
                      ? "border-[#FF2E37] text-[#FF2E37]"
                      : "border-[#EBEBEB] focus:border-[#87CEEB]"
                    }`}
                />
              ))}
            </div>

            {/* Only this message container is centered */}
            <div className="text-center mt-3 min-h-[20px]">
              {isOtpIncorrect ? (
                <p className="text-[#FF2E37] text-sm">
                  Incorrect code, try again.
                </p>
              ) : (
                <p className="text-[#A3A3A3] text-sm">
                  Your link expires in{" "}
                  <span className="text-quaternary-white">14:59</span>
                </p>
              )}
            </div>

            {/* Submit button - kept original styling */}
            <div className="flex justify-center w-full mt-8">
              <button
                type="submit"
                className="w-[360px] py-4 rounded-lg bg-primary-navy-blue text-white text-sm"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Resend code link - kept original styling */}
          <div className="text-center">
            <p className="text-secondary-black text-xs sm:text-sm md:text-base font-secondary inline">
              Didn't receive your code?{" "}
              <Link
                to="/"
                className="text-[#007AFF] font-semibold text-sm md:text-base underline hover:underline"
              >
                Resend Code
              </Link>
            </p>
          </div>
        </div>

        <div className="md:h-8"></div>
      </div>

      {/* Right side - Image */}
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

export default OTPVerification;
