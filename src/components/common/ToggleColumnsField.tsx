import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaX } from "react-icons/fa6";
import CustomCheckbox from "./form/CustomCheckbox";

const ToggleColumnsField: React.FC<any> = ({ 
    clearSelection, 
    selectAll,
    setIsChecked,
    isChecked,
    columns,
    visibleColumns,
    toggleColumn, className 
}) => {
    const [showColumnDropdown, setShowColumnDropdown] = useState(false);
    const columnDropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (columnDropdownRef.current && !columnDropdownRef.current.contains(event.target as Node)) {
            setShowColumnDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative ${className}`} ref={columnDropdownRef}>
            <Button
                label="Fields"
                icon={<FaChevronDown className="w-4 h-4" />}
                severity="secondary"
                outlined
                iconPos='right'
                className='flex gap-2 !text-sm !rounded-xl !border-light-stroke !text-secondary-black !font-medium'
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
            />

            {showColumnDropdown && (
                <div className="absolute right-0 top-full mt-1 p-4 w-64 bg-primary-white border border-light-stroke rounded-xl theme-shadow z-10">
                    <div className="mb-4 pb-2 border-b border-light-stroke">
                        <label
                            htmlFor="select-all-columns"
                            className="inline-flex items-center cursor-pointer"
                        >
                            <CustomCheckbox
                                id="select-all-columns"
                                checked={isChecked}
                                onChange={(e) => {
                                    setIsChecked(e.target.checked);
                                    selectAll(e.target.checked);
                                }}
                                className='!border'
                            />
                            <span className="text-xs md:text-sm text-secondary-black ml-2 font-medium font-secondary">
                                Select All
                            </span>
                        </label>
                    </div>

                    <div className="space-y-4 max-h-56 overflow-y-scroll">
                        {columns.map((column: any) => (
                            <div key={column.field} className="flex items-center gap-2">
                                <label
                                    htmlFor={column.field}
                                    className="inline-flex items-center cursor-pointer"
                                >
                                    <CustomCheckbox
                                        id={column.field}
                                        checked={visibleColumns[column.field]}
                                        onChange={() => toggleColumn(column.field)}
                                        className='!border'
                                    />
                                    <span className="text-xs md:text-sm text-secondary-black ml-2 font-medium font-secondary">
                                        {column.header}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-2 border-t border-light-stroke">
                        <button
                            onClick={clearSelection}
                            className="flex items-center gap-2 cursor-pointer justify-between w-full text-sm font-medium text-secondary-black"
                        >
                            Clear Selection
                            <FaX className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default ToggleColumnsField;