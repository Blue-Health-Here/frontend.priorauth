import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useRef } from 'react';
import { AiOutlineEye } from "react-icons/ai";

// Main Reusable DataTable Component
const ThemeDataTable: React.FC<any> = ({
    data = [],
    columns = [],
    title = "Data Table",
    pageSize = 10,
    onRowClick = null,
    loading = false,
    emptyMessage = "No data available",
    isShadow = true,
    isPaginator = true,
    className = '',
    handleClickOpenPasswordModal,
    visibleColumns, header, globalFilter
}) => {
    const dt = useRef(null);

    const passwordBodyTemplate = () => {
        return (
            <div className="flex items-center gap-2">
                <span className="text-gray-600">••••••••••</span>
                <AiOutlineEye className="w-4 h-4 text-blue-navigation-link-button cursor-pointer" onClick={handleClickOpenPasswordModal} />
            </div>
        );
    };

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
                header={header || null}
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
                            body={column.type === 'password' ? () => passwordBodyTemplate() : column.body}
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
