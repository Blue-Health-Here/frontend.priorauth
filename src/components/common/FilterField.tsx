import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";
import { FaChevronDown } from "react-icons/fa6";

interface FilterFieldProps {
  columns: { field: string; header: string; filterable?: boolean }[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string
}

const FilterField: React.FC<FilterFieldProps> = ({
  columns,
  selectedValue,
  onChange,
  className,
  label = "Group By"
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
      {/* Desktop version - unchanged */}
      <div className="hidden md:block">
        <Button
          severity="secondary"
          outlined
          className={"!text-sm !rounded-xl !border-light-stroke dark:!border-[#2a2a2a] text-secondary-black !font-medium !px-3" + (selectedValue ? " !py-2" : "")}
          onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
        >
          <span className="flex items-center gap-2 whitespace-nowrap">
            {label} {selectedValue && <span className="px-2.5 py-1.5 text-xs rounded-md bg-blue-navigation-link-button text-white">1</span>}
            <FaChevronDown className="w-3 h-3 ml-1" />
          </span>
        </Button>

        {showFiltersDropdown && (
          <div className="absolute right-0 top-full mt-1 w-64 bg-primary-white border border-light-stroke rounded-xl theme-shadow z-10 p-4">
            <p className="text-sm text-primary-black mb-4">Group By options</p>
            <div className="space-y-4">
              {/* "None" / clear-selection option */}
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

      {/* Mobile version - Enhanced for responsiveness */}
      <div className="md:hidden">
        <Accordion
          multiple
          activeIndex={[]}
          collapseIcon={<LiaAngleUpSolid className="w-3.5 h-3.5 text-primary-black absolute right-3" />}
          expandIcon={<LiaAngleDownSolid className="w-3.5 h-3.5 text-primary-black absolute right-3" />}
          className="theme-accordion"
        >
          <AccordionTab
            header={
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm bg-[#EBF1FF] flex items-center justify-center">
                  <img src="/Vector (16).svg" alt="" className="w-2.5 h-2.5" />
                </div>
                <span className="text-xs font-medium">Group By</span>
              </div>
            }
          >
            <div className="space-y-3">
              {columns
                .filter((col) => col.filterable)
                .map((column) => (
                  <label
                    key={`mobile-filter-${column.field}`}
                    htmlFor={`mobile-filter-${column.field}`}
                    className="flex items-center rounded-lg peer-disabled:cursor-not-allowed cursor-pointer py-1"
                  >
                    <input
                      id={`mobile-filter-${column.field}`}
                      type="radio"
                      name="mobile-filter-option"
                      onChange={() => onChange(column.field)}
                      checked={selectedValue === column.field}
                      className="h-3.5 w-3.5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-xs text-secondary-black ml-1.5 font-medium font-secondary">
                      {column.header}
                    </span>
                  </label>
                ))}
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};

export default FilterField;