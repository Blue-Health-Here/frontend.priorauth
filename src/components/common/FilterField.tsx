import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { PiSlidersHorizontalBold } from "react-icons/pi";

interface FilterFieldProps {
    columns: any[];
    selectedValue: string;
    onChange: (value: string) => void;
    className?: string;
}

const FilterField: React.FC<FilterFieldProps> = ({ columns, selectedValue, onChange, className }) => {
    const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowFiltersDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <Button
                severity="secondary"
                outlined
                className="!text-sm !rounded-xl !border-light-stroke !text-secondary-black !font-medium"
                onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
            >
                <span className="flex items-center gap-2">
                    Group By
                    <PiSlidersHorizontalBold className='w-5 h-5' />
                </span>
            </Button>

            {showFiltersDropdown && (
                <div className="absolute right-0 p-4 top-full mt-1 w-64 bg-primary-white border border-light-stroke rounded-xl theme-shadow z-10">
                    <p className="text-sm text-primary-black mb-4">Group By options</p>
                    <div className="space-y-4">
                        {columns.filter(col => col.filterable).map((column) => (
                            <label
                                key={column.field}
                                htmlFor={`filter-${column.field}`}
                                className="flex items-start rounded-lg peer-disabled:cursor-not-allowed cursor-pointer">
                                <input
                                    id={`filter-${column.field}`}
                                    type="radio"
                                    name="filter-option"
                                    onChange={() => onChange(column.field)}
                                    checked={selectedValue === column.field}
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-xs md:text-sm text-secondary-black ml-2 font-medium font-secondary">
                                    {column.header}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
};

export default FilterField;
