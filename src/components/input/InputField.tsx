// components/InputField.tsx

import React, { useState } from "react";
import { useField } from "formik";

interface InputFieldProps {
  id?: string;
  name: string;

  type?: string;
  label?: string;
  placeholder?: string;
  variant?: "default" | "contact";
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  variant = "default",
  className = "",
}) => {
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const showLabelUp = isFocused || field.value;

  if (variant === "contact") {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full bg-transparent border-b border-primary-white py-2 text-primary-white placeholder-primary-white font-secondary 
        focus:outline-none focus:border-primary-white placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base ${className}`}
        {...field}
      />
    );
  }

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className={`absolute transition-all duration-200 font-secondary ${
            showLabelUp
              ? "text-xs md:text-sm text-tertiary-black top-0"
              : "text-xs sm:text-sm md:text-base text-tertiary-black top-7"
          }`}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...field}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          field.onBlur(e);
        }}
        className={`w-full border-b border-dark-stroke font-secondary pb-2 pt-6 placeholder-accent focus:outline-none focus:border-dark-stroke 
        placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base ${className}`}
      />

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1 font-secondary">{meta.error}</p>
      )}
    </div>
  );
};

export default InputField;
