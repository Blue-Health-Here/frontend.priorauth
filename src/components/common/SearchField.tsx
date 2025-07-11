import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchField: React.FC<any> = ({ globalFilter, setGlobalFilter }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative h-full w-full">
            <InputText
                value={globalFilter}
                onChange={(e: any) => setGlobalFilter(e.target.value)}
                placeholder={isMobile ? "Search" : "Search for request here"}
                className="!pl-10 !rounded-xl !border-light-stroke h-full !text-sm w-full"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FiSearch className="w-4 h-4" />
            </div>
        </div>
    )
};

export default SearchField;






