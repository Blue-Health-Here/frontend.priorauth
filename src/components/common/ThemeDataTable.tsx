import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaEye, FaX } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import { PiSlidersHorizontalBold } from "react-icons/pi";
import CustomCheckbox from './form/CustomCheckbox';

// Main Reusable DataTable Component
const ThemeDataTable: React.FC<any> = ({
    data = [],
    columns = [],
    title = "Data Table",
    searchPlaceholder = "Search for request here",
    showFilters = true,
    showFieldToggle = true,
    showSearch = true,
    pageSize = 10,
    onRowClick = null,
    loading = false,
    emptyMessage = "No data available",
    isShadow = true,
    isPaginator = true,
    className = '',
    handleClickOpenPasswordModal
}) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [visibleColumns, setVisibleColumns] = useState(
        columns.reduce((acc: any, col: any) => ({ ...acc, [col.field]: col.visible !== false }), {})
    );
    const [showColumnDropdown, setShowColumnDropdown] = useState(false);
    const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
    const dt = useRef(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const columnDropdownRef = useRef<HTMLDivElement>(null);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const toggleColumn = (columnField: any) => {
        setVisibleColumns((prev: any) => ({
            ...prev,
            [columnField]: !prev[columnField]
        }));
    };

    const clearSelection = () => {
        setVisibleColumns(
            columns.reduce((acc: any, col: any) => ({ ...acc, [col.field]: false }), {})
        );
        setIsChecked(false);
    };

    const selectAll = (value: any) => {
        setVisibleColumns(
            columns.reduce((acc: any, col: any) => ({ ...acc, [col.field]: value }), {})
        );
    };

    const passwordBodyTemplate = (rowData: any, field: any) => {
        return (
            <div className="flex items-center gap-2">
                <span className="text-gray-600">••••••••••</span>
                <FaEye className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600" onClick={handleClickOpenPasswordModal} />
            </div>
        );
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowFiltersDropdown(false);
        }
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

    useEffect(() => {
        if (Object.keys(visibleColumns).filter((item) => visibleColumns[item]).length === columns.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [visibleColumns]);

    const header = (
        <div className="flex items-center justify-start gap-4">
            {showSearch && <div className="relative flex-1 max-w-md h-full">
                <InputText
                    value={globalFilter}
                    onChange={(e: any) => setGlobalFilter(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full !pl-10 !h-full !text-sm !rounded-xl !border-light-stroke"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiSearch className='w-5 h-5' />
                </div>
            </div>}

            <div className="flex items-center gap-4">
                {showFilters && (
                    <div className="relative" ref={dropdownRef}>
                        <Button
                            label="Filters"
                            icon={<PiSlidersHorizontalBold className='w-5 h-5' />}
                            severity="secondary"
                            outlined
                            iconPos='right'
                            className='flex gap-2 !text-sm !rounded-xl !border-light-stroke !text-secondary-black !font-medium'
                            onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
                        />

                        {showFiltersDropdown && (
                            <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-[9999]">
                                <div className="p-4">
                                    <p className="text-sm text-gray-600 mb-3">Filter options</p>
                                    <div className="space-y-2">
                                        {columns.filter((col: any) => col.filterable).map((column: any) => (
                                            <div key={column.field} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`filter-${column.field}`}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor={`filter-${column.field}`}
                                                    className="ml-2 text-sm text-gray-700"
                                                >
                                                    {column.header}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {showFieldToggle && (
                    <div className="relative" ref={columnDropdownRef}>
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
                )}
            </div>
        </div>
    );

    return (
        <div className={`bg-primary-white rounded-2xl theme-datatable ${isShadow ? 'theme-shadow' : ''} px-4 py-4 ${className}`}>
            <h2 className='text-xl font-medium pb-4'>{title}</h2>
            <DataTable
                ref={dt}
                value={data}
                paginator={isPaginator}
                rows={pageSize}
                rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {last} of {totalRecords} entries"
                globalFilter={globalFilter}
                header={(showSearch || showFilters || showFieldToggle) ? header : null}
                emptyMessage={emptyMessage}
                loading={loading}
                className="custom-paginator"
                onRowClick={onRowClick}
            >
                {columns
                    .filter((column: any) => visibleColumns[column.field])
                    .map((column: any) => (
                        <Column
                            key={column.field}
                            field={column.field}
                            header={column.header}
                            body={column.type === 'password' ? (rowData: any) => passwordBodyTemplate(rowData, column.field) : column.body}
                        // sortable={column.sortable !== false}
                        // filter={column.filterable}
                        // filterPlaceholder={`Search by ${column.header}`}
                        />
                    ))}
            </DataTable>
        </div>
    );
};

export default ThemeDataTable;
