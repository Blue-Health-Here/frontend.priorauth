import React, { InputHTMLAttributes, useState } from "react";
import { useField } from "formik";
import { Label } from "../Label";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  variant?: "default" | "FloatingLabel" | "password" | 'setting';
  className?: string;
  errorColor?: string;
  isPassword?: boolean;
}

export const inputStyles = {
  default:
    "w-full border-b border-medium-stroke font-secondary pb-2 pt-1 placeholder-primary-black focus:outline-none focus:border-dark-stroke placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base placeholder:text-gray-400 text-primary-black text-sm font-bold",
  contactInput:
    "w-full bg-transparent border-b border-primary-white py-2 text-primary-white placeholder-primary-white font-secondary focus:outline-none focus:border-primary-white placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base",
  defaultInput:
    "w-full h-10 border border-light-stroke rounded-lg px-4 pr-12 font-secondary text-primary-black text-sm font-medium placeholder:text-tertiary-black placeholder:text-sm focus:outline-none transition-colors duration-200",
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
  isPassword = false,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : "text";
  const showLabelUp = isFocused || field.value;

  // defualt & password field
  if (variant === "default") {
    return (
      <div className="space-y-1">
        {label && (
          <Label className="text-quaternary-white text-sm font-secondary">
            {label}
          </Label>
        )}
        <div className="relative">
          <input
            id={id}
            {...rest}
            type={inputType}
            placeholder={placeholder}
            {...field}
            className={`${inputStyles.defaultInput} ${className}`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <FiEyeOff size={18} className="text-[#525252] cursor-pointer" />
              ) : (
                <FiEye size={18} className="text-[#525252] cursor-pointer" />
              )}
            </button>
          )}
        </div>
        {meta.touched && meta.error && (
          <p className="text-red-500 text-xs font-secondary">
            {meta.error}
          </p>
        )}
        
      </div>
    );
  }

  // Floating Label variant
  if (variant === "FloatingLabel") {
    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={id}
            className={`absolute transition-all duration-200 font-secondary ${showLabelUp
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
          className={`w-full h-[40px] border rounded-lg px-4 font-secondary border-input-stroke text-primary-black text-sm font-medium placeholder:text-[#9E9E9E] placeholder:text-sm focus:outline-none ${className}`}
        />

        {meta.touched && meta.error && (
          <p className="text-red-500 text-xs mt-1 font-secondary">
            {meta.error}
          </p>
        )}
      </div>
    );
  }

  // Default variant
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
        className={`${inputStyles.default} ${className}`}
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