"use client";

import React, { useEffect, useState } from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "../Label";
import { cn } from "@/utils/helper";

interface DateFieldProps {
    label?: string;
    name: string;
    placeholder?: string;
    className?: string;
    ref?: any;
    minDate?: Date;
    Icon?: React.ComponentType<{ className?: string }>;
}

const DateField: React.FC<DateFieldProps> = ({ className, ref, label, Icon, ...props }) => {
    const [field, meta, helpers] = useField(props);
    // Use null for the initial state to prevent hydration mismatch
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    
    // Set the date only in useEffect to ensure it runs client-side
    useEffect(() => {
        if (field.value) {
            setSelectedDate(field.value);
        }
    }, [field.value]);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        helpers.setValue(date);
    };

    return (
        <div>
            {label && <Label size="xs" htmlFor={props.name}>{label}</Label>}
            <div className="relative">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className={cn(
                        "flex h-10 w-full rounded-md placeholder:text-themeLight border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                    )}
                    placeholderText={props.placeholder}
                    ref={ref}
                    minDate={props.minDate}
                />
                {Icon && (
                    <span className="h-5 w-5 absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <Icon />
                    </span>
                )}
            </div>
            {meta.touched && meta.error && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
            )}
        </div>
    );
};

export default DateField;