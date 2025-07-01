import React from "react";
import { useField } from "formik";
import { Label } from "../Label";
import { cn } from "@/utils/helper";

interface RadioOption {
    value: string | number;
    label: string;
}

interface RadioFieldProps {
    label: string;
    name: string;
    options: RadioOption[];
    className?: string;
    ref?: any;
}

const RadioField: React.FC<RadioFieldProps> = ({ className, ref, label, options, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <Label size="xs">{label}</Label>
            <div className="flex gap-x-14 items-center justify-center">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center">
                        <input
                            type="radio"
                            id={`${props.name}-${option.value}`}
                            className={cn(
                                "w-4 h-4",
                                className,
                            )}
                            ref={ref}
                            {...field}
                            {...props}
                            value={option.value}
                            checked={field.value == option.value}
                        />
                        <Label
                            size="xs"
                            htmlFor={`${props.name}-${option.value}`}
                            className="ml-2 cursor-pointer"
                        >
                            {option.label}
                        </Label>
                    </div>
                ))}
            </div>
            {meta.touched && meta.error && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
            )}
        </div>
    );
};

export default RadioField;