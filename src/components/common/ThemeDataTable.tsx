// import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
// import React, { useRef } from 'react';
// import { AiOutlineEye } from "react-icons/ai";

// const ThemeDataTable: React.FC<any> = ({
//     data = [],
//     columns = [],
//     pageSize = 10,
//     onRowClick = null,
//     loading = false,
//     emptyMessage = "No data available",
//     isPaginator = true,
//     handleClickOpenPasswordModal,
//     visibleColumns, header, globalFilter, globalFilterFields
// }) => {
//     const dt = useRef(null);

//     const passwordBodyTemplate = () => {
//         return (
//             <div className="flex items-center gap-2">
//                 <span className="text-gray-600">••••••••••</span>
//                 <AiOutlineEye className="w-4 h-4 text-blue-navigation-link-button cursor-pointer" onClick={handleClickOpenPasswordModal} />
//             </div>
//         );
//     };

//     return (
//         <DataTable
//             ref={dt}
//             value={data}
//             paginator={isPaginator}
//             rows={pageSize}
//             rowsPerPageOptions={[5, 10, 25, 50]}
//             paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
//             currentPageReportTemplate="Showing {last} of {totalRecords} entries"
//             globalFilter={globalFilter}
//             globalFilterFields={globalFilterFields}
//             header={header || null}
//             emptyMessage={emptyMessage}
//             loading={loading}
//             className="custom-paginator"
//             onRowClick={onRowClick}
//             rowClassName={() => 'cursor-pointer hover:!bg-gray-50 active:bg-gray-100 transition duration-200'}
//         >
//             {columns
//                 .filter((column: any) => visibleColumns[column.field])
//                 .map((column: any) => (
//                     <Column
//                         key={column.field}
//                         field={column.field}
//                         header={column.header}
//                         body={column.type === 'password' ? () => passwordBodyTemplate() : 
//                             column.customTemplate ? (rowData) => column.render(rowData, column.field) : column.body}
//                     />
//                 ))}
//         </DataTable>
//     );
// };

// export default ThemeDataTable;

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useRef } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { AiOutlineEye } from "react-icons/ai";
import CardHeader from './CardHeader';
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";
import { getFilterLabel, getStatusClass } from '@/utils/helper';

const ThemeDataTable: React.FC<any> = ({
    data = [], // can be flat [] or grouped [{ status, data }]
    columns = [],
    pageSize = 10,
    onRowClick = null,
    loading = false,
    emptyMessage = "No data available",
    isPaginator = true,
    handleClickOpenPasswordModal,
    header,
    globalFilter,
    globalFilterFields, selectedFilterField = ''
}) => {
    const dt = useRef(null);

    const passwordBodyTemplate = () => {
        return (
            <div className="flex items-center gap-2">
                <span className="text-gray-600">••••••••••</span>
                <AiOutlineEye
                    className="w-4 h-4 text-blue-navigation-link-button cursor-pointer"
                    onClick={handleClickOpenPasswordModal}
                />
            </div>
        );
    };

    const renderColumns = () => {
        return columns
            .map((column: any) => (
                <Column
                    key={column.field}
                    field={column.field}
                    header={column.header}
                    className={column.className}
                    body={
                        column.type === 'password'
                            ? () => passwordBodyTemplate()
                            : column.customTemplate
                                ? (rowData) => column.render(rowData, column.field)
                                : column.body
                    }
                />
            ));
    };

    // Detect if `data` is grouped or flat
    const isGrouped = Array.isArray(data) && data.length > 0 && data[0]?.data;
    // console.log(selectedFilterField, "selectedFilterField")
    return (
        <div className="theme-datatable-wrapper inline-flex flex-col gap-4 sm:gap-0 h-full w-full">
            {header && <div className="mb-4">{header}</div>}

            {isGrouped ? (
                <Accordion multiple activeIndex={[0]} 
                    collapseIcon={<LiaAngleUpSolid className="w-8 h-8 p-1.5 text-primary-black bg-quaternary-navy-blue rounded-lg" />} 
                    expandIcon={<LiaAngleDownSolid className="w-8 h-8 p-1.5 text-primary-black bg-quaternary-navy-blue rounded-lg" />} 
                    className='theme-datatable-accordion'>
                    {data.map((group: any, idx: number) => {            
                        const statusClass = selectedFilterField === "statusName" ? getStatusClass(group.status) : '';
                        return <AccordionTab className='mb-4' key={group.status + idx} header={(
                            <>
                                {selectedFilterField && 
                                    <p className={'!text-gray-color text-sm font-light' + (selectedFilterField === "statusName" ? " pb-2" : "")}>
                                        {getFilterLabel(selectedFilterField)}</p>}
                                <CardHeader 
                                    title={(
                                        <>
                                            {selectedFilterField !== "statusName" ? 
                                                <span className='!text-primary-black pb-2'>{group.status}</span> : 
                                                <span className={`text-sm font-medium truncate px-4 py-2 rounded-full ${statusClass}`}>{group.status}</span>}
                                            <span className='pl-2 !text-gray-color font-normal'>({group.data.length})</span>
                                        </>
                                    )} 
                                    className="rounded-lg !bg-transparent !p-0 !pt-1.5" 
                                />
                            </>
                        )}>
                            <DataTable
                                ref={dt}
                                value={group.data}
                                paginator={false}
                                rows={pageSize}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {last} of {totalRecords} entries"
                                globalFilter={globalFilter}
                                globalFilterFields={globalFilterFields}
                                emptyMessage={emptyMessage}
                                loading={loading}
                                className="custom-paginator"
                                onRowClick={onRowClick}
                                rowClassName={() =>
                                    'cursor-pointer hover:!bg-gray-50 active:bg-gray-100 transition duration-200'
                                }
                            >
                                {renderColumns()}
                            </DataTable>
                        </AccordionTab>
                    })}
                </Accordion>
            ) : (
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
                    header={null}
                    emptyMessage={emptyMessage}
                    loading={loading}
                    className="custom-paginator"
                    onRowClick={onRowClick}
                    rowClassName={() =>
                        'cursor-pointer hover:!bg-gray-50 active:bg-gray-100 transition duration-200'
                    }
                >
                    {renderColumns()}
                </DataTable>
            )}
        </div>
    );
};

export default ThemeDataTable;
