// components/InputField.tsx

import React from "react";

interface InputFieldProps {
  id?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
  placeholder?: string;
  isFocused?: boolean;
  variant?: "default" | "contact";
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type = "text",
  value = "",
  onChange,
  onFocus,
  onBlur,
  label,
  placeholder,
  isFocused,
  variant = "default",
  className = "",
}) => {
  if (variant === "contact") {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full bg-transparent border-b border-primary-white py-2 text-primary-white placeholder-primary-white font-secondary 
        focus:outline-none focus:border-primary-white placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base ${className}`}
      />
    );
  }

  // Default variant with floating label
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className={`absolute transition-all duration-200 font-secondary ${
            isFocused || value ? "text-xs md:text-sm text-tertiary-black top-0" : "text-xs sm:text-sm md:text-base text-tertiary-black top-7"
          }`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full border-b border-dark-stroke font-secondary pb-2 pt-6 placeholder-accent focus:outline-none focus:border-dark-stroke placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base ${className}`}
      />
    </div>
  );
};

export default InputField;
