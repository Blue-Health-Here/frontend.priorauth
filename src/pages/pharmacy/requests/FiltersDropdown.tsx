import React, { useEffect, useRef, useState } from "react";
import { FaX } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { InputText } from "primereact/inputtext";
import CustomCheckbox from "@/components/common/form/CustomCheckbox";
import { Accordion, AccordionTab } from "primereact/accordion";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";

interface FiltersDropdownProps {
  options: string[];
  selectedOption: string | null;
  onChange: (option: string | null) => void;
  className?: string;
  getStatusClass?: (status: string) => string;
}

const FiltersDropdown: React.FC<FiltersDropdownProps> = ({
  options,
  selectedOption,
  onChange,
  className,
  getStatusClass,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = searchTerm
    ? options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  const toggleOption = (option: string) => {
    if (selectedOption === option) {
      onChange(null);
    } else {
      onChange(option);
    }
  };

  const clearSelection = () => {
    onChange(null);
    setSearchTerm("");
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Desktop version */}
      <div className="hidden md:block">
        <button
          className={`flex items-center justify-between w-full text-sm font-medium text-secondary-black
            border border-light-stroke rounded-xl px-3 py-3  min-w-[90px] bg-primary-white`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>Filters</span>
          {/* Replaced FaChevronDown with filters.svg */}
          <img src="/filters.svg" alt="Filters" className="w-3 h-3 ml-1 " />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-1 w-60 bg-primary-white  border border-light-stroke rounded-xl theme-shadow z-10 p-4 ">
            <div className="relative mb-4 ">
              <InputText
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                placeholder="Search status..."
                className="!pl-10 !text-sm !rounded-xl !border-light-stroke !w-full"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FiSearch className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto">
              {filteredOptions.map((option, idx) => {
                const statusClass = getStatusClass ? getStatusClass(option) : '';
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2"
                  >
                    <label
                      htmlFor={`filter-option-${idx}`}
                      className="inline-flex items-center cursor-pointer"
                    >
                      <CustomCheckbox
                        id={`filter-option-${idx}`}
                        checked={selectedOption === option}
                        onChange={() => toggleOption(option)}
                        className="!border !border-medium-stroke"
                      />
                      <span
                        className={`px-3 py-1 ml-2 rounded-full line-clamp-1 max-w-[180px] text-sm font-normal ${statusClass}`}
                      >
                        {option}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>

            {filteredOptions.length === 0 && (
              <div className="text-xs text-dark-stroke font-normal">
                No status found
              </div>
            )}

            {(selectedOption || searchTerm) && (
              <div className="pt-3 border-t border-light-stroke mt-4">
                <button
                  onClick={clearSelection}
                  className="flex items-center gap-2 justify-between w-full text-sm font-medium text-secondary-black"
                >
                  Clear Filter
                  <FaX className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile version */}
      <div className="md:hidden">
        <Accordion 
          multiple 
          activeIndex={[]}
          collapseIcon={<LiaAngleUpSolid className="w-4 h-4 text-primary-black absolute right-3" />} 
          expandIcon={<LiaAngleDownSolid className="w-4 h-4 text-primary-black absolute right-3" />} 
          className="theme-accordion"
        >
          <AccordionTab 
            header={
              <div className="flex items-center gap-2">
                {/* Replaced the icon with filters.svg */}
             <div className="w-5 h-5 rounded-sm bg-[#EBF1FF] flex items-center justify-center">
                  <img src="/Ellipse 441.svg" alt="" className="w-2.5 h-2.5" />
                </div>
                <span className="text-xs font-medium">Filters</span>
              </div>
            }
          >
            <div className="space-y-3">
              <div className="relative mb-3">
                <InputText
                  value={searchTerm}
                  onChange={(e: any) => setSearchTerm(e.target.value)}
                  placeholder="Search status..."
                  className="!pl-8 !text-xs !rounded-lg !border-light-stroke !w-full !py-2"
                />
                <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiSearch className="w-4 h-4" />
                </div>
              </div>

              {filteredOptions?.length > 0 && (
                <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1 -mr-2">
                  {filteredOptions.map((option, idx) => {
                    const statusClass = getStatusClass ? getStatusClass(option) : '';
                    return (
                      <div key={idx} className="flex items-center gap-1.5">
                        <label
                          htmlFor={`mobile-filter-option-${idx}`}
                          className="inline-flex items-center cursor-pointer"
                        >
                          <CustomCheckbox
                            id={`mobile-filter-option-${idx}`}
                            checked={selectedOption === option}
                            onChange={() => toggleOption(option)}
                            className="!border !border-medium-stroke !w-4 !h-4"
                          />
                          <span
                            className={`px-2 py-1 ml-1.5 rounded-full line-clamp-1 max-w-[180px] text-xs font-normal ${statusClass}`}
                          >
                            {option}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}

              {filteredOptions.length === 0 && (
                <div className="text-[10px] text-dark-stroke font-normal">
                  No status found
                </div>
              )}

              {(selectedOption || searchTerm) && (
                <div className="pt-2 border-t border-light-stroke mt-3">
                  <button
                    onClick={clearSelection}
                    className="flex items-center gap-1.5 justify-between w-full text-xs font-medium text-secondary-black py-1"
                  >
                    Clear Filter
                    <FaX className="w-2.5 h-2.5" />
                  </button>
                </div>
              )}
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};

export default FiltersDropdown;