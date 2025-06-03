import React, { useState } from "react";
import { useField } from "formik";
import { Label } from "../Label";

interface InputFieldProps {
  id?: string;
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  variant?: "default" | "FloatingLabel";
  className?: string;
  errorColor?: string;
}

export const inputStyles = {
  defaultInput:
    "w-full border-b border-medium-stroke font-secondary pb-2 pt-1 placeholder-primary-black focus:outline-none focus:border-dark-stroke placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base placeholder:text-gray-400 text-primary-black text-sm font-bold", // 
  contactInput:
    "w-full bg-transparent border-b border-primary-white py-2 text-primary-white placeholder-primary-white font-secondary focus:outline-none focus:border-primary-white placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base",
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  variant = "default",
  className = "",
  errorColor = "text-red-500",
}) => {
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const showLabelUp = isFocused || field.value;

  if (variant === "FloatingLabel") {
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
          className={`w-full h-[40px] border rounded-lg px-4 font-secondary text-primary-black text-sm font-medium placeholder:text-[#9E9E9E] placeholder:text-sm focus:outline-none ${className}`}
        />

        {meta.touched && meta.error && (
          <p className="text-red-500 text-xs mt-1 font-secondary">
            {meta.error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {label && (
        <Label className="text-tertiary-black text-xs md:text-base">
          {label}
        </Label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`${inputStyles.defaultInput} ${className}`}
        {...field}
      />
      {meta.touched && meta.error && (
        <p className={`${errorColor} mt-1 text-xs font-secondary`}>
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default InputField;