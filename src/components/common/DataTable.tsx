import React, { useEffect, useState } from 'react';
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import MoreOptionsMenu from './MoreOptionsMenu';
import { Formik, Form } from 'formik';
import SelectField from './form/SelectField';
import Button from './Button';
import Pagination from './Pagination';
import { Dropdown } from 'primereact/dropdown';
import { getReqBgStatusStyle, getReqStatusTextColor, getStatusStyle } from '../../utils/helper';
import { reqStatusOptions } from '../../utils/constants';
import { Link } from 'react-router-dom';

interface DataTableProps {
    title: string;
    columns: any[];
    data: any[];
    location?: string;
    customHeader?: React.ReactNode;
    className?: string;
    paginator?: boolean;
    rows?: number;
    rowsPerPageOptions?: number[];
    isShadow?: boolean;
    customHeaderButtonText?: string;
    customHeaderButtonLink?: string;
    isPagination?: boolean;
    onStatusChange?: (rowData: any, newStatus: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({
    title,
    columns,
    data,
    location,
    customHeader,
    className,
    paginator = false,
    rows = 10,
    rowsPerPageOptions = [5, 10, 25, 50],
    isShadow = true,
    customHeaderButtonText,
    customHeaderButtonLink,
    isPagination = false,
    onStatusChange
}) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const menuItems = [
        {
            label: `View All ${title}`,
            onClick: () => { },
        },
        {
            label: `Add New ${title}`,
            onClick: () => { },
        },
        {
            label: 'Export List',
            onClick: () => { },
        },
        {
            label: 'View Analytics',
            onClick: () => { },
        },
        {
            label: 'Refresh List',
            onClick: () => { },
        },
    ];

    const toggleDropdown = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const handleStatusChange = (rowData: any, newStatus: any) => {
        // console.log(newStatus, rowData, "Dasdsad");
        // Create a copy of the table data
        const updatedData = tableData.map(item => {
            // Find the row that was updated
            if (item.id === rowData.id) {
                // Return a new object with the updated status
                return { ...item, request_status: newStatus };
            }
            return item;
        });

        // Update the table data state
        setTableData(updatedData);

        // Call the parent component's onStatusChange callback if provided
        if (onStatusChange) {
            onStatusChange(rowData, newStatus);
        }
    };

    const optionTemplate = (option: any) => {
        return (
            <span>{option.label}</span>
        );
    };

    const valueTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <span className={`mr-4 text-sm ${getReqStatusTextColor(option.value)}`}>{option.label}</span>
            );
        }
        return <span className="text-muted">{props.placeholder}</span>;
    };

    const renderCellContent = (rowData: any, column: any) => {
        const cellData = rowData[column.key];
        if (!cellData) return '';

        if (column.key === 'request_status') {
            const selectedOption = reqStatusOptions.find(option => option.value === cellData);
            return (
                <div className="flex items-center">
                    <Dropdown
                        value={selectedOption?.value}
                        options={reqStatusOptions}
                        onChange={(e) => handleStatusChange(rowData, e.value)}
                        className={`w-full max-w-[230px] ${getReqBgStatusStyle(cellData)}`}
                        placeholder="Select Status"
                        optionGroupTemplate={optionTemplate}
                        valueTemplate={valueTemplate}
                    />
                </div>
            );
        }

        if (typeof cellData === 'string' || typeof cellData === 'number') {
            // Check if the column is a status column
            if (column.key.toLowerCase().includes('status')) {
                return <span className={getStatusStyle(cellData.toString())}>{cellData}</span>;
            }
            return cellData;
        }

        //for complex cell types
        if (typeof cellData === 'object') {
            switch (cellData.type) {
                case 'avatar':
                    return (
                        <div className="flex items-center min-w-[120px]">
                            <img src={cellData.image} alt="" className="w-8 h-8 rounded-full mr-2 shrink-0" />
                            <span className="truncate">{cellData.text}</span>
                        </div>
                    );
                case 'icon':
                    return (
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full ${cellData.color} flex items-center justify-center text-primary-white mr-2 font-bold text-lg`}>
                                {cellData.icon}
                            </div>
                            <span>{cellData.text}</span>
                        </div>
                    );
                case 'badge':
                    let badgeClass = 'px-3 py-1 rounded-full text-xs sm:text-sm lg:text-base font-seccondary';
                    switch (cellData.variant) {
                        case 'success':
                            badgeClass += ' bg-success-chip-bg-color text-success-chip';
                            break;
                        case 'info':
                            badgeClass += ' bg-information-chip-bg-color text-information-chip';
                            break;
                        case 'warning':
                            badgeClass += ' bg-warning-chip-bg-color text-warning-chip';
                            break;
                        case 'gray':
                            badgeClass += ' bg-secondary-background text-tertiary-black';
                            break;
                        default:
                            badgeClass += ' bg-gray-100 text-gray-800';
                    }
                    return <span className={badgeClass}>{cellData.text}</span>;
                default:
                    return cellData.text || '';
            }
        }

        return '';
    };

    const DefaultHeader = () => (
        <div className="flex justify-between items-center relative">
            <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-primary-black leading-[110%]">
                {location ? `${title} (${location})` : title}
            </h2>
            <div className="relative">
                <button
                    className="border border-medium-stroke rounded-lg p-3 text-tertiary-white cursor-pointer"
                    onClick={toggleDropdown}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                    </svg>
                </button>
                <MoreOptionsMenu
                    items={menuItems}
                    isOpen={isOpenMenu}
                    onClose={() => setIsOpenMenu(false)}
                    headerText={location ? `${title} (${location})` : `${title} Options`}
                />
            </div>
        </div>
    );

    const CustomHeader = () => (
        <div className="flex flex-col md:flex-col lg:flex-row gap-4 pb-2">
            <h1 className="text-lg md:text-xl font-semibold flex-1 text-nowrap lg:text-2xl">
                {location ? `${title} (${location})` : title}
            </h1>
            <Formik
                initialValues={{ category: "", search: "" }}
                onSubmit={() => { }}
            >
                {() => (
                    <Form className="flex md:min-w-64 flex-wrap text-grey gap-3 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                        <SelectField
                            className="border border-medium-stroke rounded-lg p-2 font-medium min-w-48"
                            parentClassName="flex-1"
                            name="sort"
                            options={[
                                { value: "sortby", label: "Sort By" },
                                { value: "operational", label: "Operational" },
                            ]}
                        />
                        <SelectField
                            className="border border-medium-stroke rounded-lg p-2 font-medium min-w-48"
                            parentClassName="flex-1"
                            name="filter"
                            options={[
                                { value: "filterby", label: "Filter By" },
                                { value: "operational", label: "Operational" },
                            ]}
                        />
                    </Form>
                )}
            </Formik>
            {customHeaderButtonText && <Link to={customHeaderButtonLink ?? ""}><Button title={customHeaderButtonText} className="w-full sm:w-40" /></Link>}
        </div>
    );

    return (
        <div className={`bg-primary-white rounded-2xl ${isShadow ? 'shadow-lg' : ''} px-6 py-4 ${className}`}>
            {customHeader ? title && <CustomHeader /> : title && <DefaultHeader />}

            <PrimeDataTable
                value={tableData}
                paginator={paginator}
                rows={rows}
                rowsPerPageOptions={rowsPerPageOptions}
                globalFilterFields={columns.map(col => col.key)}
                emptyMessage="No records found"
                className="mt-2 pb-4"
                resizableColumns
                columnResizeMode="fit"
                tableStyle={{ minWidth: '100%' }}
            >
                {columns.map((col, i) => (
                    <Column
                        key={i}
                        field={col.key}
                        header={col.header}
                        sortable={col.key !== 'request_status'}
                        filter={col.key !== 'request_status'}
                        filterPlaceholder={`Search ${col.header}`}
                        style={{ width: col.width || 'auto' }}
                        body={(rowData) => renderCellContent(rowData, col)}
                    />
                ))}
            </PrimeDataTable>
            {tableData?.length > 0 && isPagination && (
                <Pagination
                    currentPage={currentPage}
                    totalEntries={4}
                    entriesPerPage={4}
                    onPageChange={setCurrentPage} />
            )}
        </div>
    );
};

export default DataTable;