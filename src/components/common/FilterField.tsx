import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { PiSlidersHorizontalBold } from "react-icons/pi";

interface FilterFieldProps {
    columns: { field: string; header: string; filterable?: boolean }[];
    selectedValue: string;
    onChange: (value: string) => void;
    className?: string;
}

const FilterField: React.FC<FilterFieldProps> = ({
    columns,
    selectedValue,
    onChange,
    className,
}) => {
    const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowFiltersDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /** Radio‑button helper  */
    const RadioItem = ({
        id,
        value,
        label,
    }: {
        id: string;
        value: string;
        label: string;
    }) => (
        <label
            htmlFor={id}
            className="flex items-start rounded-lg cursor-pointer peer-disabled:cursor-not-allowed"
        >
            <input
                id={id}
                type="radio"
                name="filter-option"
                value={value}
                checked={selectedValue === value}
                onChange={() => onChange(value)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-quaternary-navy-blue"
            />
            <span className="text-xs md:text-sm text-secondary-black ml-2 font-medium font-secondary">
                {label}
            </span>
        </label>
    );

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <Button
                severity="secondary"
                outlined
                className="!text-sm !rounded-lg !border-light-stroke !text-secondary-black !font-medium"
                onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
            >
                <span className="flex items-center gap-2">
                    Group&nbsp;By
                    <PiSlidersHorizontalBold className="w-5 h-5" />
                </span>
            </Button>

            {showFiltersDropdown && (
                <div className="absolute right-0 p-4 top-full mt-1 w-64 bg-primary-white border border-light-stroke rounded-lg theme-shadow z-10">
                    <p className="text-sm text-primary-black mb-4 font-semibold">Group‑by options</p>
                    <div className="space-y-4">
                        {/* “None” / clear‑selection option */}
                        <RadioItem id="filter-none" value="" label="None (clear grouping)" />

                        {/* Actual columns */}
                        {columns
                            .filter((col) => col.filterable)
                            .map((col) => (
                                <RadioItem
                                    key={col.field}
                                    id={`filter-${col.field}`}
                                    value={col.field}
                                    label={col.header}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterField;
