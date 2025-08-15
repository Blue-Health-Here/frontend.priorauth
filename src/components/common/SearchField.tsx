import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "../ui/input";

const SearchField: React.FC<any> = ({ globalFilter, setGlobalFilter, placeholder, className, parentClassName }) => {
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
        <div className={`relative h-full w-full ${parentClassName}`}>
            <Input
                value={globalFilter}
                onChange={(e: any) => setGlobalFilter(e.target.value)}
                placeholder={isMobile ? "Search" : placeholder || "Search for request here"}
                className={`!pl-10 !rounded-full bg-input-bg !py-3.5 border-input-stroke sm:min-w-[300px] !text-sm w-full h-full ${className}`}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FiSearch className="w-4 h-4" />
            </div>
        </div>
    )
};

export default SearchField;






