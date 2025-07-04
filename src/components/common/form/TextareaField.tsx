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
    rows?: any;
    cols?: any;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ className, name, ref, label, rows, cols, onChange, disabled = false }) => {
    const [, meta] = useField(name);

    return (
        <div>
            <Label htmlFor={name} className="text-quaternary-white text-sm font-secondary">
                {label}
            </Label>
            <textarea
                className={cn("", className)}
                disabled={disabled}
                rows={rows}
                cols={cols}
                onChange={(e: any) => onChange && onChange(e)}
                ref={ref}
            />
            {meta.touched && meta.error && (
                <p className="text-red-500 text-xs font-secondary">{meta.error}</p>
            )}
        </div>
    );
};

export default TextareaField;