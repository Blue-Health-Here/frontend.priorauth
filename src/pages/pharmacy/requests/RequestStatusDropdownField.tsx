import CustomCheckbox from "@/components/common/form/CustomCheckbox";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaX } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

interface RequestStatusDropdownFieldProps {
    data: any[];
    onChange?: (selectedStatuses: string[]) => void;
    className?: string;
}

const RequestStatusDropdownField: React.FC<RequestStatusDropdownFieldProps> = ({ data, onChange, className }) => {
    const [statusesList, setStatusesList] = useState<any[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [statusSearch, setStatusSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const uniqueMap = new Map();
    
        data.forEach(item => {
            if (item.request_status && item.statusClass) {
                uniqueMap.set(item.request_status, {
                    id: item.id,
                    name: item.request_status,
                    sClass: item.statusClass
                });
            }
        });
    
        const uniqueStatuses = Array.from(uniqueMap.values());
        setStatusesList(uniqueStatuses);
    }, [data]);
    
    useEffect(() => {
        // Close dropdown on outside click
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleStatus = (status: string) => {
        const updated = selectedStatuses.includes(status)
            ? selectedStatuses.filter(s => s !== status)
            : [...selectedStatuses, status];

        setSelectedStatuses(updated);
        onChange?.(updated);
    };

    const clearSelection = () => {
        setSelectedStatuses([]);
        onChange?.([]);
    };

    const filteredStatuses = statusSearch !== "" ? 
        statusesList.filter((item: any) => item.name.toLowerCase().includes(statusSearch.toLowerCase())) : statusesList;

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <Button
                severity="secondary"
                outlined
                className="!text-sm !rounded-xl !border-light-stroke !text-secondary-black !font-medium"
                onClick={() => setShowDropdown(prev => !prev)}
            >
                <span className="flex items-center gap-2">
                    Status
                    <FaChevronDown className="w-4 h-4" />
                </span>
            </Button>

            {showDropdown && (
                <div className="absolute right-0 top-full mt-1 p-4 w-80 bg-primary-white border border-light-stroke rounded-xl theme-shadow z-10">
                    {/* Search Input */}
                    <div className="relative mb-4">
                        <InputText
                            value={statusSearch}
                            onChange={(e: any) => setStatusSearch(e.target.value)}
                            placeholder="Search status..."
                            className="!pl-10 !text-sm !rounded-xl !border-light-stroke !w-full"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <FiSearch className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Status List */}
                    {filteredStatuses?.length > 0 && <div className="space-y-4 max-h-56 overflow-y-scroll">
                        {filteredStatuses.map((status, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <label htmlFor={`status-${idx}`} className="inline-flex items-center cursor-pointer">
                                    <CustomCheckbox
                                        id={`status-${idx}`}
                                        checked={selectedStatuses.includes(status.id)}
                                        onChange={() => toggleStatus(status.id)}
                                        className='!border !border-medium-stroke'
                                    />
                                    <span className={`px-3 py-1 ml-2 rounded-full line-clamp-1 max-w-[240px] !text-sm lg:text-base font-normal ${status.sClass}`}>
                                        {status.name}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>}

                    {filteredStatuses.length === 0 && (
                        <div className="text-xs text-dark-stroke font-normal">No status found</div>
                    )}

                    {/* Clear Button */}
                    <div className="pt-3 border-t border-light-stroke mt-4">
                        <button
                            onClick={clearSelection}
                            className="flex items-center gap-2 justify-between w-full text-sm font-medium text-secondary-black"
                        >
                            Clear Selection
                            <FaX className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestStatusDropdownField;
