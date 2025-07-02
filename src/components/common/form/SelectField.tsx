import React, { useState } from "react";
import { useField } from "formik";
import { Label } from "../Label";
import { cn } from "@/utils/helper";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  className?: string;
  parentClassName?: string;
  placeholder?: string;
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, parentClassName, label, options, placeholder = "Select an option", ...props }, ref) => {
    const [field, meta] = useField(props);
    const [isOpen, setIsOpen] = useState(false);

    // Destructure onBlur from both field and props
    const { onBlur: fieldOnBlur, ...restField } = field;
    const { onBlur: propOnBlur, ...restProps } = props;

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      fieldOnBlur?.(e);   // Formik
      propOnBlur?.(e);    // Parent
      setIsOpen(false);   // Local state
    };

    return (
      <div className={cn("relative", parentClassName)}>
        {label && (
          <Label htmlFor={props.name} className="text-quaternary-white text-sm font-secondary">
            {label}
          </Label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "appearance-none flex h-10 w-full text-xs text-tertiary-black rounded-lg border border-light-stroke bg-primary-white px-4 py-2 pr-10 placeholder:text-tertiary-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              meta.touched && meta.error ? "border-red-500 focus:ring-red-500" : "",
              className
            )}
            onFocus={() => setIsOpen(true)}
            onBlur={handleBlur}
            {...restField}
            {...restProps}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>

        {meta.touched && meta.error && (
          <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
export default SelectField;
