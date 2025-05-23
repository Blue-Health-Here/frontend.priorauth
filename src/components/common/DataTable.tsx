import React, { useEffect, useState } from 'react';
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Pagination from './Pagination';
import { Dropdown } from 'primereact/dropdown';
import { getReqBgStatusStyle, getReqStatusTextColor, getStatusStyle } from '../../utils/helper';
import { reqStatusOptions } from '../../utils/constants';
import { DataTableProps } from '../../utils/types';
import { Link } from 'react-router-dom';

const DataTable: React.FC<DataTableProps> = ({
    columns,
    data,
    className,
    paginator = false,
    rows = 10,
    rowsPerPageOptions = [5, 10, 25, 50],
    isShadow = true,
    isPagination = false,
    onStatusChange,
    headerComponent
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        setTableData(data);
    }, [data]);

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
                return (
                    <Link to={'/admin/requests/' + rowData.id + '/request-details'}>
                        <span className={getStatusStyle(cellData.toString())}>{cellData}</span>
                    </Link>
                )
            }
            if (column.key === 'medication') {
                return (
                    <Link to={'/admin/requests/' + rowData.id + '/request-details'}>
                        <span className={getStatusStyle(cellData.toString())}>{cellData}</span>
                    </Link>
                )
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

    return (
        <>
            <div className={`bg-primary-white rounded-2xl ${isShadow ? 'shadow-lg' : ''} px-4 py-4 lg:p-6 ${className}`}>
                {headerComponent}
                <PrimeDataTable
                    value={tableData}
                    paginator={paginator}
                    rows={rows}
                    rowsPerPageOptions={rowsPerPageOptions}
                    globalFilterFields={columns.map(col => col.key)}
                    emptyMessage="No records found"
                    className="mt-2 border rounded-lg overflow-hidden border-quaternary-navy-blue"
                    resizableColumns
                    columnResizeMode="fit"
                    tableStyle={{ minWidth: '100%' }}
                >
                    {columns.map((col, i) => (
                        <Column
                            key={i}
                            field={col.key}
                            header={col.header}
                            style={{ width: col.width || 'auto' }}
                            body={(rowData) => renderCellContent(rowData, col)}
                        />
                    ))}
                </PrimeDataTable>
            </div>
            {tableData?.length > 0 && isPagination && (
                <Pagination
                    currentPage={currentPage}
                    totalEntries={4}
                    entriesPerPage={4}
                    onPageChange={setCurrentPage} />
            )}
        </>
    );
};

export default DataTable;