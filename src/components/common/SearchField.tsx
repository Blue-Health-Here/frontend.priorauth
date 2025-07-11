import { InputText } from "primereact/inputtext";
import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchField: React.FC<any> = ({ globalFilter, setGlobalFilter }) => {
    return (
        <div className="relative h-full">
            <InputText
                value={globalFilter}
                onChange={(e: any) => setGlobalFilter(e.target.value)}
                placeholder="Search for request here..."
                className="!pl-10 !rounded-lg !border-light-stroke h-full !text-sm" // Force full height
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FiSearch className="w-4 h-4" />
            </div>
        </div>
    )
};

export default SearchField;