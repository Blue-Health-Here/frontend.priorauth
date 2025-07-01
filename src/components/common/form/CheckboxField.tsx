import React from "react";
import { useField } from "formik";
import { Label } from "../Label";
import { cn } from "@/utils/helper";

interface CheckboxFieldProps {
    label: string;
    name: string;
    className?: string;
    ref?: any;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ className, ref, label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <Label size="xs" htmlFor={props.name}>{label}</Label>
            <input
                type="checkbox"
                className={cn(
                    "h-4 w-4 text-themeLight border-input bg-background focus:ring-themeLight",
                    className,
                )}
                ref={ref}
                {...props}
                {...field}
            />
            {meta.touched && meta.error && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
            )}
        </div>
    );
};

export default CheckboxField;