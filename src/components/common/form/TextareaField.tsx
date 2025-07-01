import React, { TextareaHTMLAttributes } from "react";
import { useField } from "formik";
import { Label } from "../Label";
import { cn } from "@/utils/helper";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    placeholder?: string;
    className?: string;
    ref?: any;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ className, name, ref, label, onChange, disabled = false }) => {
    const [field, meta] = useField(name);

    console.log(field, "field");    
    return (
        <div>
            <Label htmlFor={name} className="text-quaternary-white text-sm font-secondary">
                {label}
            </Label>
            <textarea
                className={cn(
                    "flex h-20 w-full rounded-md placeholder:text-themeLight border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                disabled={disabled}
                onChange={(e: any) => onChange && onChange(e)}
                ref={ref}
            />
            {meta.touched && meta.error && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
            )}
        </div>
    );
};

export default TextareaField;