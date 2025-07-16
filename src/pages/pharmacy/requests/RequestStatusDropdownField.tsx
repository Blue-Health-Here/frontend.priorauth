import CustomCheckbox from "@/components/common/form/CustomCheckbox";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaX } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { Accordion, AccordionTab } from "primereact/accordion";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";

interface RequestStatusDropdownFieldProps {
  data: any[];
  onChange?: (selectedStatuses: string[]) => void;
  className?: string;
}

const RequestStatusDropdownField: React.FC<RequestStatusDropdownFieldProps> = ({
  data,
  onChange,
  className,
}) => {
  const [statusesList, setStatusesList] = useState<any[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [statusSearch, setStatusSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const uniqueMap = new Map();

    data.forEach((item) => {
      if (item.name && item.statusClass) {
        uniqueMap.set(item.name, {
          name: item.name,
          sClass: item.statusClass,
        });
      }
    });

    const uniqueStatuses = Array.from(uniqueMap.values());
    setStatusesList(uniqueStatuses);
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStatus = (status: string) => {
    const updated = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(updated);
    onChange?.(updated);
  };

  const clearSelection = () => {
    setSelectedStatuses([]);
    onChange?.([]);
  };

  const filteredStatuses =
    statusSearch !== ""
      ? statusesList.filter((item: any) =>
          item.name.toLowerCase().includes(statusSearch.toLowerCase())
        )
      : statusesList;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Desktop version - unchanged */}
      <div className="hidden md:block">
        <button
          className={`flex items-center justify-between w-full text-sm font-medium text-secondary-black
            border border-light-stroke rounded-xl px-3 py-3 bg-white`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="flex items-center gap-2">
            <span>Status</span>
          </div>
          <FaChevronDown className="w-3 h-3 ml-2" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-1 w-80 bg-primary-white border border-light-stroke rounded-xl theme-shadow z-10 p-4">
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
            {filteredStatuses?.length > 0 && (
              <div className="space-y-4 max-h-56 overflow-y-auto">
                {filteredStatuses.map((status, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <label
                      htmlFor={`status-${idx}`}
                      className="inline-flex items-center cursor-pointer"
                    >
                      <CustomCheckbox
                        id={`status-${idx}`}
                        checked={selectedStatuses.includes(status.name)}
                        onChange={() => toggleStatus(status.name)}
                        className="!border !border-medium-stroke"
                      />
                      <span
                        className={`px-3 py-1 ml-2 rounded-full line-clamp-1 max-w-[240px] !text-sm lg:text-base font-normal ${status.sClass}`}
                      >
                        {status.name}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {filteredStatuses.length === 0 && (
              <div className="text-xs text-dark-stroke font-normal">
                No status found
              </div>
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

      {/* Mobile version - Enhanced for responsiveness */}
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
                <div className="w-5 h-5 rounded-sm bg-[#EBF1FF] flex items-center justify-center">
                  <img src="/Ellipse 441.svg" alt="" className="w-2.5 h-2.5" />
                </div>
                <span className="text-xs font-medium">Status</span>
              </div>
            }
          >
            <div className="space-y-3">
              {/* Search Input - smaller for mobile */}
              <div className="relative mb-3">
                <InputText
                  value={statusSearch}
                  onChange={(e: any) => setStatusSearch(e.target.value)}
                  placeholder="Search status..."
                  className="!pl-8 !text-xs !rounded-lg !border-light-stroke !w-full !py-2"
                />
                <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiSearch className="w-4 h-4" />
                </div>
              </div>

              {/* Status List - compact for mobile */}
              {filteredStatuses?.length > 0 && (
                <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1 -mr-2">
                  {filteredStatuses.map((status, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <label
                        htmlFor={`mobile-status-${idx}`}
                        className="inline-flex items-center cursor-pointer"
                      >
                        <CustomCheckbox
                          id={`mobile-status-${idx}`}
                          checked={selectedStatuses.includes(status.name)}
                          onChange={() => toggleStatus(status.name)}
                          className="!border !border-medium-stroke !w-4 !h-4"
                        />
                        <span
                          className={`px-2 py-1 ml-1.5 rounded-full line-clamp-1 max-w-[180px] text-xs font-normal ${status.sClass}`}
                        >
                          {status.name}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {filteredStatuses.length === 0 && (
                <div className="text-[10px] text-dark-stroke font-normal">
                  No status found
                </div>
              )}

              {/* Clear Button - smaller for mobile */}
              <div className="pt-2 border-t border-light-stroke mt-3">
                <button
                  onClick={clearSelection}
                  className="flex items-center gap-1.5 justify-between w-full text-xs font-medium text-secondary-black py-1"
                >
                  Clear Selection
                  <FaX className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};

export default RequestStatusDropdownField;