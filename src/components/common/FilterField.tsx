import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import CustomCheckbox from "./form/CustomCheckbox";

const FilterField: React.FC<any> = ({ columns, className }) => {
    const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
    const [selectedOpt, setSelectedOpt] = useState("");
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
                label="Filters"
                icon={<PiSlidersHorizontalBold className='w-5 h-5' />}
                severity="secondary"
                outlined
                iconPos='right'
                className='flex gap-2 !text-sm !rounded-xl !border-light-stroke !text-secondary-black !font-medium'
                onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
            />

            {showFiltersDropdown && (
                <div className="absolute right-0 p-4 top-full mt-1 w-64 bg-primary-white border border-light-stroke rounded-xl theme-shadow z-10">
                    <p className="text-sm text-primary-black mb-4">Filter options</p>
                    <div className="space-y-4">
                        {columns.filter((col: any) => col.filterable).map((column: any) => (
                            <div key={column.field} className="flex items-center">
                                <label
                                    htmlFor={`filter-${column.field}`}
                                    className="inline-flex items-center cursor-pointer"
                                >
                                    <CustomCheckbox
                                        id={`filter-${column.field}`}
                                        onChange={() => {
                                            setSelectedOpt(column.field)
                                        }}
                                        className='!border'
                                        checked={column.field === selectedOpt}
                                    />
                                    <span className="text-xs md:text-sm text-secondary-black ml-2 font-medium font-secondary">
                                        {column.header}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
};

export default FilterField;