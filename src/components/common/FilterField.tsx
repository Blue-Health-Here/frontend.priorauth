import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";

interface FilterFieldProps {
  columns: any[];
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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowFiltersDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Mobile button */}
      <button
        className="flex md:hidden items-center justify-between w-full text-sm font-medium text-secondary-black"
        onClick={() => setShowFiltersDropdown((prev) => !prev)}
      >
        <span>Group By</span>
        <FaChevronDown className="w-3 h-3" />
      </button>

      {/* Desktop button */}
      <div className="hidden md:flex">
        <Button
          severity="secondary"
          outlined
          className="hidden md:flex !text-sm !rounded-xl !border-light-stroke !text-secondary-black !font-medium"
          onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
        >
          <span className="hidden md:flex items-center gap-2">
            Group By
            <PiSlidersHorizontalBold className="w-5 h-5" />
          </span>
        </Button>
      </div>

      {showFiltersDropdown && (
        <div className="fixed md:absolute inset-0 md:inset-auto md:right-0 md:top-full md:mt-1 p-4 w-full md:w-64 bg-primary-white border border-light-stroke rounded-none md:rounded-xl theme-shadow z-50 md:z-10">
          {/* Close button for mobile */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Group By options</h3>
            <button
              onClick={() => setShowFiltersDropdown(false)}
              className="text-gray-500"
            >
              <FaX className="w-5 h-5" />
            </button>
          </div>

          <p className="hidden md:block text-sm text-primary-black mb-4">
            Group By options
          </p>
          <div className="space-y-4">
            {columns
              .filter((col) => col.filterable)
              .map((column) => (
                <label
                  key={column.field}
                  htmlFor={`filter-${column.field}`}
                  className="flex items-start rounded-lg peer-disabled:cursor-not-allowed cursor-pointer"
                >
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
  );
};

export default FilterField;
