import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useRef } from 'react';
import { AiOutlineEye } from "react-icons/ai";

const ThemeDataTable: React.FC<any> = ({
    data = [],
    columns = [],
    pageSize = 10,
    onRowClick = null,
    loading = false,
    emptyMessage = "No data available",
    isPaginator = true,
    handleClickOpenPasswordModal,
    visibleColumns, header, globalFilter, globalFilterFields
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
        <DataTable
            ref={dt}
            value={data}
            paginator={isPaginator}
            rows={pageSize}
            rowsPerPageOptions={[5, 10, 25, 50]}
            paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {last} of {totalRecords} entries"
            globalFilter={globalFilter}
            globalFilterFields={globalFilterFields}
            header={header || null}
            emptyMessage={emptyMessage}
            loading={loading}
            className="custom-paginator"
            onRowClick={onRowClick}
            rowClassName={() => 'cursor-pointer hover:!bg-gray-50 active:bg-gray-100 transition duration-200'}
        >
            {columns
                .filter((column: any) => visibleColumns[column.field])
                .map((column: any) => (
                    <Column
                        key={column.field}
                        field={column.field}
                        header={column.header}
                        body={column.type === 'password' ? () => passwordBodyTemplate() : 
                            column.customTemplate ? (rowData) => column.render(rowData, column.field) : column.body}
                        // sortable={column.sortable !== false}
                        // filter={column.filterable}
                        // filterPlaceholder={`Search by ${column.header}`}
                    />
                ))}
        </DataTable>
    );
};

export default ThemeDataTable;
