import React from "react";
import { useField } from "formik";
import { Label } from "../Label";
import { cn } from "../../../utils/helper";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  className?: string;
  parentClassName?: string;
  placeholder?:string;
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, parentClassName, label, options, placeholder = "Select an option", ...props }, ref) => {
    const [field, meta] = useField(props);

    return (
      <div className={parentClassName}>
        {label && (
          <Label htmlFor={props.name} className="text-quaternary-white text-sm font-secondary">
            {label}
          </Label>
        )}

        <select
          ref={ref}
          className={cn(
            "flex h-10 w-full text-xs text-tertiary-black rounded-lg border border-light-stroke bg-primary-white px-4 py-2 placeholder:text-tertiary-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            meta.touched && meta.error ? "border-red-500 focus:ring-red-500" : "",
            className
          )}
          {...field}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option className="option" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {meta.touched && meta.error && (
          <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
export default SelectField;
