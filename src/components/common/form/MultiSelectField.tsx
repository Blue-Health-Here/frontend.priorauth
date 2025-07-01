import React from "react";
import Select from "react-select";
import { useField } from "formik";
import { Label } from "../Label";
import { cn } from "@/utils/helper";

interface OptionType {
    label?: string;
    value: string | number;
}

interface MultiSelectFieldProps {
    label?: string;
    name: string;
    options: OptionType[];
    className?: string;
}

const MultiSelectField: React.FC<MultiSelectFieldProps & React.ComponentProps<typeof Select>> = ({
    label,
    name,
    options,
    className,
    ...props
}) => {
    const [field, meta, helpers] = useField(name);

    const handleChange = (selectedOptions: OptionType[]) => {
        const values = selectedOptions.map(option => option.value);

        if (values.includes("all")) {
            helpers.setValue(["all"]); // If "All" is selected, keep only "All"
        } else {
            helpers.setValue(values); // Normal selection
        }
        helpers.setTouched(true); 
    };

    return (
        <div>
            {label && <Label size="xs" className="text-grey" htmlFor={name}>{label}</Label>}
            <Select
                isMulti
                className={cn(
                    "flex w-full rounded-md placeholder:text-themeLight !border !border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                {...props}
                options={options}
                value={options.filter(option => field.value?.includes(option.value))}
                onChange={(selected) => handleChange(selected as OptionType[])}
                onBlur={() => helpers.setTouched(true)}
                styles={{
                    control: (base) => ({
                        ...base,
                        borderWidth: 0,
                        width: "100%",
                        borderRadius: 6,
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: "#B9B9C3",
                        fontSize: "14px",
                    }),
                }}
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default MultiSelectField;
