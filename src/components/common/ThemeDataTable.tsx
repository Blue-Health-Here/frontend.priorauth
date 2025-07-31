import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useRef } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { AiOutlineEye } from "react-icons/ai";
import CardHeader from "./CardHeader";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";
import { getFilterLabel, getStatusClass } from "@/utils/helper";

const ThemeDataTable: React.FC<any> = ({
  data = [],
  columns = [],
  pageSize = 10,
  onRowClick = null,
  loading = false,
  isPaginator = true,
  handleClickOpenPasswordModal,
  header,
  visibleColumns,
  globalFilter,
  themeDataTableClass,
  globalFilterFields,
  selectedFilterField = "",
  setGlobalFilter
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
      .filter((column: any) => visibleColumns[column.field])
      .map((column: any) => (
        <Column
          key={column.field}
          field={column.field}
          header={column.header}
          className={column.className}
          body={
            column.type === "password"
              ? () => passwordBodyTemplate()
              : column.customTemplate
              ? (rowData) => column.render(rowData, column.field)
              : column.body
          }
        />
      ));
  };

  const isGrouped = Array.isArray(data) && data.length > 0 && data[0]?.data;
  
  // Check if we have matching data for the current search
  const hasMatchingData = () => {
    if (!globalFilter) return data.length > 0;
    
    if (isGrouped) {
      return data.some(group => 
       group.data?.some((item: Record<string, any>) => 
          Object.values(item).some(val => 
            String(val).toLowerCase().includes(globalFilter.toLowerCase())
          )
        )
      );
    }
    
    return data.some((item: Record<string, any>) => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(globalFilter.toLowerCase())
      )
    );
  };

  const handleSearchAgain = () => {
    setGlobalFilter?.('');
  };

  const renderEmptyState = () => {
    return (
      <div className="flex flex-col items-start md:items-center justify-center py-4 gap-2">
        <img
          src="/empty-state.svg"
          alt="No data found"
          width={100}
          height={100}
          className="mb-1 "
        />
        <div className="text-center">
          <p className="text-[#1E1E1E] font-medium text-lg">No results found</p>
          <p className="text-[#525252] text-sm mt-1">
            Try adjusting your search or filters.
          </p>
        </div>
        <button
          onClick={handleSearchAgain}
          className="bg-[#163066] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1a3a7a] transition-colors mt-2 "
        >
          Search Again
        </button>
      </div>
    );
  };

  return (
    <div className="theme-datatable-wrapper inline-flex flex-col gap-4 sm:gap-0 h-full w-full">
      {header && <div className="mb-4">{header}</div>}

      {isGrouped ? (
        <Accordion
          multiple
          activeIndex={[0]}
          collapseIcon={
            <LiaAngleUpSolid className="w-8 h-8 p-1.5 text-primary-black bg-quaternary-navy-blue rounded-lg" />
          }
          expandIcon={
            <LiaAngleDownSolid className="w-8 h-8 p-1.5 text-primary-black bg-quaternary-navy-blue rounded-lg" />
          }
          className="theme-datatable-accordion"
        >
          {data.map((group: any, idx: number) => {
            const statusClass =
              selectedFilterField === "statusName"
                ? getStatusClass(group.status)
                : "";
            // const groupHasData = group.data && group.data.length > 0;
            
            return (
              <AccordionTab
                className="mb-4"
                key={group.status + idx}
                header={
                  <>
                    {selectedFilterField && (
                      <p
                        className={
                          "!text-gray-color text-sm font-light" +
                          (selectedFilterField === "statusName" ? " pb-2" : "")
                        }
                      >
                        {getFilterLabel(selectedFilterField)}
                      </p>
                    )}
                    <CardHeader
                      title={
                        <>
                          {selectedFilterField !== "statusName" ? (
                            <span className="!text-primary-black pb-2">
                              {group.status}
                            </span>
                          ) : (
                            <span
                              className={`text-sm font-medium truncate px-4 py-2 rounded-full ${statusClass}`}
                            >
                              {group.status}
                            </span>
                          )}
                          <span className="pl-2 !text-gray-color font-normal">
                            ({group.data?.length || 0})
                          </span>
                        </>
                      }
                      className="rounded-lg !bg-transparent !p-0 !pt-1.5"
                    />
                  </>
                }
              >
                <DataTable
                  ref={dt}
                  value={group.data}
                  paginator={false}
                  rows={pageSize}
                  scrollable
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {last} of {totalRecords} entries"
                  globalFilter={globalFilter}
                  globalFilterFields={globalFilterFields}
                  emptyMessage={renderEmptyState()}
                  loading={loading}
                  className="custom-paginator min-w-[600px] md:min-w-0"
                  onRowClick={onRowClick}
                  rowClassName={() =>
                    "cursor-pointer hover:!bg-gray-50 active:bg-gray-100 transition duration-200"
                  }
                >
                  {renderColumns()}
                </DataTable>
              </AccordionTab>
            );
          })}
        </Accordion>
      ) : (
        <DataTable
          ref={dt}
          value={data}
          paginator={isPaginator && hasMatchingData()}
          rows={pageSize}
          rowsPerPageOptions={[5, 10, 25, 50]}
          scrollable
          paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {last} of {totalRecords} entries"
          globalFilter={globalFilter}
          globalFilterFields={globalFilterFields}
          header={null}
          emptyMessage={renderEmptyState()}
          loading={loading}
          className={`custom-paginator ${themeDataTableClass} min-w-[600px] md:min-w-0`}
          onRowClick={onRowClick}
          rowClassName={() =>
            "cursor-pointer hover:!bg-gray-50 active:bg-gray-100 transition duration-200"
          }
        >
          {renderColumns()}
        </DataTable>
      )}
      
    </div>
    
  );
};

export default ThemeDataTable;