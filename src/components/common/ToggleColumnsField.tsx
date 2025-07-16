import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaX } from "react-icons/fa6";
import CustomCheckbox from "./form/CustomCheckbox";
import { Accordion, AccordionTab } from "primereact/accordion";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";

interface ToggleColumnsFieldProps {
  clearSelection: () => void;
  selectAll: (value: boolean) => void;
  setIsChecked: (value: boolean) => void;
  isChecked: boolean;
  columns: any[];
  visibleColumns: any;
  toggleColumn: (columnField: string) => void;
  className?: string;
  buttonText?: string;
}

const ToggleColumnsField: React.FC<ToggleColumnsFieldProps> = ({
  clearSelection,
  selectAll,
  setIsChecked,
  isChecked,
  columns,
  visibleColumns,
  toggleColumn,
  className,
  buttonText = "Fields",
}) => {
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const columnDropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      columnDropdownRef.current &&
      !columnDropdownRef.current.contains(event.target as Node)
    ) {
      setShowColumnDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={columnDropdownRef}>
      {/* Desktop version - unchanged */}
      <div className="hidden md:block">
        <Button
          severity="secondary"
          outlined
          className="!text-sm !rounded-xl !border-light-stroke !text-secondary-black !font-medium whitespace-nowrap !px-3 md:!px-4"
          onClick={() => setShowColumnDropdown(!showColumnDropdown)}
        >
          <span className="flex items-center gap-2">
            <span className="text-xs md:text-sm">{buttonText}</span>
            <FaChevronDown className="w-3 h-3" />
          </span>
        </Button>

        {showColumnDropdown && (
          <div className="absolute right-0 top-full mt-1 w-64 bg-primary-white border border-light-stroke rounded-xl theme-shadow z-10 p-4">
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
                  className="!border"
                />
                <span className="text-xs md:text-sm text-secondary-black ml-2 font-medium font-secondary">
                  Select All
                </span>
              </label>
            </div>

            <div className="space-y-4 max-h-56 overflow-y-auto">
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
                      className="!border"
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
                  <img src="/Vector (17).svg" alt="" className="w-2.5 h-2.5" />
                </div>
                <span className="text-xs font-medium">{buttonText}</span>
              </div>
            }
          >
            <div className="space-y-3">
              <div className="mb-3 pb-1.5 border-b border-light-stroke">
                <label
                  htmlFor="mobile-select-all-columns"
                  className="inline-flex items-center cursor-pointer"
                >
                  <CustomCheckbox
                    id="mobile-select-all-columns"
                    checked={isChecked}
                    onChange={(e) => {
                      setIsChecked(e.target.checked);
                      selectAll(e.target.checked);
                    }}
                    className="!border !w-3.5 !h-3.5"
                  />
                  <span className="text-xs text-secondary-black ml-1.5 font-medium font-secondary">
                    Select All
                  </span>
                </label>
              </div>

              <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1 -mr-2">
                {columns.map((column: any) => (
                  <div key={`mobile-${column.field}`} className="flex items-center gap-1.5">
                    <label
                      htmlFor={`mobile-${column.field}`}
                      className="inline-flex items-center cursor-pointer"
                    >
                      <CustomCheckbox
                        id={`mobile-${column.field}`}
                        checked={visibleColumns[column.field]}
                        onChange={() => toggleColumn(column.field)}
                        className="!border !w-3.5 !h-3.5"
                      />
                      <span className="text-xs text-secondary-black ml-1.5 font-medium font-secondary">
                        {column.header}
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-1.5 border-t border-light-stroke">
                <button
                  onClick={clearSelection}
                  className="flex items-center gap-1.5 cursor-pointer justify-between w-full text-xs font-medium text-secondary-black py-1"
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

export default ToggleColumnsField;