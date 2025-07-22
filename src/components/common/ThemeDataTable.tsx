import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useRef, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { AiOutlineEye } from "react-icons/ai";
import CardHeader from "./CardHeader";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";
import { getFilterLabel, getStatusClass } from "@/utils/helper";

interface ThemeDataTableProps {
  data?: any[];
  columns?: any[];
  pageSize?: number;
  onRowClick?: (event: any) => void;
  loading?: boolean;
  emptyMessage?: string;
  isPaginator?: boolean;
  handleClickOpenPasswordModal?: () => void;
  header?: React.ReactNode;
  visibleColumns?: Record<string, boolean>;
  globalFilter?: string;
  themeDataTableClass?: string;
  globalFilterFields?: string[];
  selectedFilterField?: string;
}

const CustomTooltip = ({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setShowTooltip(true);
    }
  };

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
        className="inline-block w-full truncate"
      >
        {children}
      </div>

      {showTooltip && (
        <div
          className="fixed z-[9999] p-2 bg-primary-navy-blue text-white text-sm rounded shadow-lg max-w-[300px] pointer-events-none"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: "translateY(-100%) translateY(-8px)",
            wordBreak: "break-word",
          }}
        >
          {content}
        </div>
      )}
    </>
  );
};

const ThemeDataTable: React.FC<ThemeDataTableProps> = ({
  data = [],
  columns = [],
  pageSize = 10,
  loading = false,
  emptyMessage = "No data available",
  isPaginator = true,
  handleClickOpenPasswordModal,
  header,
  visibleColumns = {},
  globalFilter,
  themeDataTableClass = "",
  globalFilterFields = [],
  selectedFilterField = "",
}) => {
  const dt = useRef<any>(null);

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
      .map((column: any) => {
        if (column.field === "notes") {
          return (
            <Column
              key={column.field}
              field={column.field}
              header={column.header}
              body={(rowData) => (
                <CustomTooltip content={rowData.notes}>
                  <span className="truncate block">{rowData.notes}</span>
                </CustomTooltip>
              )}
            />
          );
        }
        return (
          <Column
            key={column.field}
            field={column.field}
            header={column.header}
            className={column.className}
            body={
              column.type === "password"
                ? passwordBodyTemplate
                : column.customTemplate
                ? (rowData: any) => column.render(rowData, column.field)
                : column.body
            }
          />
        );
      });
  };

  const isGrouped = Array.isArray(data) && data.length > 0 && data[0]?.data;

  return (
    <div className="theme-datatable-wrapper flex flex-col gap-4 sm:gap-0 h-full w-full overflow-hidden">
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
                            ({group.data.length})
                          </span>
                        </>
                      }
                      className="rounded-lg !bg-transparent !p-0 !pt-1.5"
                    />
                  </>
                }
              >
                <div className="relative w-full overflow-x-auto">
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
                    emptyMessage={emptyMessage}
                    loading={loading}
                    className="custom-paginator w-full"
                    rowClassName={() =>
                      "cursor-pointer hover:!bg-gray-50 active:bg-gray-100 transition duration-200"
                    }
                  >
                    {renderColumns()}
                  </DataTable>
                </div>
              </AccordionTab>
            );
          })}
        </Accordion>
      ) : (
        <div className="relative w-full overflow-x-auto">
          <DataTable
            ref={dt}
            value={data}
            paginator={isPaginator}
            rows={pageSize}
            rowsPerPageOptions={[5, 10, 25, 50]}
            scrollable
            paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {last} of {totalRecords} entries"
            globalFilter={globalFilter}
            globalFilterFields={globalFilterFields}
            header={null}
            emptyMessage={emptyMessage}
            loading={loading}
            className={`custom-paginator w-full ${themeDataTableClass}`}
            rowClassName={() =>
              "cursor-pointer hover:!bg-gray-50 active:bg-gray-100 transition duration-200"
            }
          >
            {renderColumns()}
          </DataTable>
        </div>
      )}
    </div>
  );
};

export default ThemeDataTable;