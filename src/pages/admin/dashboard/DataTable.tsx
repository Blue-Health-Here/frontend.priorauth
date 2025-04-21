import React from 'react';
interface DataTableProps {
    title: string;
    columns: any;
    data: any[];
    location?: string;
    customHeader?: React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ title, columns, data, location, customHeader }) => {
    const renderCellContent = (cellData: any) => {
        if (!cellData) return '';

        if (typeof cellData === 'string' || typeof cellData === 'number') {
            return cellData;
        }

        //for complex cell types
        if (typeof cellData === 'object') {
            switch (cellData.type) {
                case 'avatar':
                    return (
                        // <div className="flex items-center">
                        //     <img src={cellData.image} alt="" className="w-8 h-8 rounded-full mr-2" />
                        //     <span>{cellData.text}</span>
                        // </div>
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
                    let badgeClass = 'px-3 py-1 rounded-full  text-xs sm:text-sm lg:text-base font-seccondary';
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
        <div className="flex justify-between items-center">
            <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-primary-black leading-[110%]">
                {location ? `${title} (${location})` : title}
            </h2>
            <button className="border border-medium-stroke rounded-lg p-3 text-tertiary-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                </svg>
            </button>
        </div>
    );

    return (
        <div className="bg-primary-white rounded-2xl shadow-lg px-6 py-4">
            {customHeader ? customHeader : title && <DefaultHeader />}

            {/* table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="border-b border-light-stroke">
                            {columns.map((column: any, idx: number) => (
                                <th
                                    key={idx}
                                    style={{ width: column.width || 'auto' }}
                                    className="text-left p-4 font-normal text-xs sm:text-sm lg:text-base text-tertiary-black font-secondary whitespace-nowrap"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIdx) => (
                            <tr key={rowIdx} className="border-b border-light-stroke">
                                {columns.map((column: { header: string; key: string }, colIdx: number) => (
                                    <td
                                        key={colIdx}
                                        className="p-4 text-xs sm:text-sm lg:text-base text-secondary-black font-secondary whitespace-nowrap"
                                    >
                                        {renderCellContent(row[column.key])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable