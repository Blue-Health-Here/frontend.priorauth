import React from "react";
import { useField } from "formik";
import { cn } from "../../../lib/utils";
import { Label } from "../Label";
 
interface SelectFieldProps {
    label?: string;
    name: string;
    options: { value: string; label: string }[];
    className?: string;
    parentClassName?: string;
    ref?: any;
}

const SelectField: React.FC<SelectFieldProps> = ({ className, parentClassName, ref, label, options, ...props }) => {
    const [field, meta] = useField(props);
 
    return (
        <div className={parentClassName}>
            {label && <Label size="xs" htmlFor={props.name}>{label}</Label>}
            <select
                className={cn(
                    "flex h-12 w-full text-xs text-tertiary-black rounded-lg placeholder:text-themeLight border border-input bg-primary-white px-7 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={ref}
                {...props}
                {...field}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {meta.touched && meta.error && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
            )}
        </div>
    );
};
 
export default SelectField;