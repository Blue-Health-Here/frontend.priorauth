import React, { useState } from 'react';
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import MoreOptionsMenu from '../../../components/common/MoreOptionsMenu';
import { Formik, Form } from 'formik';
import SelectField from '../../../components/common/form/SelectField';
import Button from '../../../components/common/Button';

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
    customHeaderButtonText?:string;
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
}) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

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

    const renderCellContent = (rowData: any, column: any) => {
        const cellData = rowData[column.key];

        if (!cellData) return '';

        if (typeof cellData === 'string' || typeof cellData === 'number') {
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
        <div className="flex flex-col md:flex-col lg:flex-row gap-4 pt-1">
            <h1 className="text-lg md:text-xl font-semibold flex-1 text-nowrap lg:text-2xl">
               {location ? `${title} (${location})` : title} 
            </h1>
            <Formik
                initialValues={{ category: "", search: "" }}
                onSubmit={() => { }}
            >
                {() => (
                    <Form className="flex md:min-w-64 flex-wrap pb-6 text-grey gap-3 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
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
                        <Button title={customHeaderButtonText} className="w-full sm:w-40" />
                    </Form>
                )}
            </Formik>
        </div>
    );

    return (
        <div className={`bg-primary-white rounded-2xl ${isShadow? 'shadow-lg' : ''} px-6 py-4 ${className}`}>            
            {customHeader ? title &&  <CustomHeader /> : title && <DefaultHeader />}

            <PrimeDataTable
                value={data}
                paginator={paginator}
                rows={rows}
                rowsPerPageOptions={rowsPerPageOptions}
                globalFilterFields={columns.map(col => col.key)}
                emptyMessage="No records found"
                className="mt-2"
                resizableColumns
                columnResizeMode="fit"
                tableStyle={{ minWidth: '100%' }}
            >
                {columns.map((col, i) => (
                    <Column
                        key={i}
                        field={col.key}
                        header={col.header}
                        sortable
                        filter
                        filterPlaceholder={`Search ${col.header}`}
                        style={{ width: col.width || 'auto' }}
                        body={(rowData) => renderCellContent(rowData, col)}
                    />
                ))}
            </PrimeDataTable>
        </div>
    );
};

export default DataTable;
