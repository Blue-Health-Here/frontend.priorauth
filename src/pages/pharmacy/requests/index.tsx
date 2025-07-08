import ThemeDataTable from "@/components/common/ThemeDataTable";
import { useEffect, useRef, useState } from "react";
import FilterField from "@/components/common/FilterField";
import ToggleColumnsField from "@/components/common/ToggleColumnsField";
import ThemeButton from "@/components/common/ThemeButton";
import { useLocation, useNavigate } from "react-router-dom";
import AddRequestModal from "./AddRequestModal";
import { getAllPharmacyReqs } from "@/services/pharmacyService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { filterRequestsByStatus, getFilterLabel, getStatusClass, groupByField, transformPharmacyRequest } from "@/utils/helper";
import RequestStatusDropdownField from "./RequestStatusDropdownField";
import SearchField from "@/components/common/SearchField";

const PharmacyRequests = () => {
    const columns = [
        {
            field: 'patient',
            header: 'Name',
            visible: true,
            filterable: true,
            sortable: true,
            customTemplate: true,
            render: (rowData: any, field: any) => (
                <p>{rowData[field].name}</p>
            )
        },
        {
            field: 'medication',
            header: 'Medication',
            visible: true,
            filterable: true,
            sortable: true
        },
        {
            field: 'prescriber',
            header: 'Prescriber',
            visible: true,
            filterable: true,
            sortable: true,
            customTemplate: true,
            render: (rowData: any, field: any) => (
                <p>{rowData[field].name}</p>
            )
        },
        {
            field: 'submittedOn',
            header: 'Submitted On',
            visible: true,
            filterable: true,
            sortable: true
        },
        {
            field: 'statusName',
            header: 'Status',
            visible: true,
            filterable: true,
            sortable: true,
            customTemplate: true,
            render: (rowData: any, field: any) => requestStatusTemplate(rowData, field)
        },
        {
            field: 'notes',
            header: 'Notes',
            visible: true,
            filterable: true,
            sortable: true,
            customTemplate: true,
            render: (rowData: any, field: any) => (
                <div className="line-clamp-1 w-40">
                    {rowData[field]}
                </div>
            )
        },
        {
            field: 'lastModified',
            header: 'Last Modified',
            visible: true,
            filterable: true,
            sortable: true
        }
    ];
    // const { reqStatusesData } = useSelector((state: RootState) => state.reqStatuses);
    const { reqsData } = useSelector((state: RootState) => state.pharmacyReqs);
    const [requestsData, setRequestsData] = useState<any>([]);
    const [visibleColumns, setVisibleColumns] = useState(columns.reduce((acc: any, col: any) => ({ ...acc, [col.field]: col.visible !== false }), {}));
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [activeRequestTab, setActiveRequestTab] = useState<string>('Active Requests');
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const isFetchedStatuses = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredStatuses, setFilteredStatuses] = useState([]);
    const [selectedFilterField, setSelectedFilterField] = useState("patient");
    const [filteredRequests, setFilteredRequests] = useState<any[]>([]);

    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            await Promise.all([
                // getAllReqStatuses(dispatch),
                getAllPharmacyReqs(dispatch),
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isFetchedStatuses.current) {
            fetchInitialData();
            isFetchedStatuses.current = true;
        }
    }, []);

    useEffect(() => {
        if (reqsData.length > 0) {
            setRequestsData(reqsData.map((item: any) => ({ ...transformPharmacyRequest(item) })))
            setFilteredStatuses(reqsData.map((item: any) => ({ name: item.paStatus, statusClass: getStatusClass(item.paStatus) })))
        }
    }, [reqsData]);

    const requestStatusTemplate = (rowData: any, field: any) => {
        const statusClass = getStatusClass(rowData[field]);
        return (
            <div className={`text-sm font-medium truncate px-4 py-2 rounded-full max-w-58 ${statusClass}`}>
                {rowData[field]}
            </div>
        );
    };

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

    const handleStatusChange = (status: any) => {
        if (status?.length > 0) {
            const filteredData = filterRequestsByStatus(filteredRequests, status);
            setFilteredRequests(filteredData);
        } else {
            setFilteredRequests(filteredRequests);
        }
    };

    const handleFilterChange = (field: string) => {
        setSelectedFilterField(field);
        // console.log("Selected filter:", field);
    };

    const tableHeader = (
        <>
            <div className="flex gap-2 items-center h-12">
                <div className="flex space-x-2 text-xs border border-quaternary-navy-blue rounded-lg p-0.5 h-full">
                    {['All Requests', 'Active Requests'].map((item) => (
                        <button
                            key={item}
                            type='button'
                            onClick={() => setActiveRequestTab(item)}
                            className={`px-3 py-2 cursor-pointer rounded-md font-medium transition-colors ${activeRequestTab === item
                                ? 'bg-quaternary-navy-blue text-primary-navy-blue'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <div className="inline-flex h-full items-center gap-2 ml-auto">
                    <SearchField globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
                    <FilterField
                        columns={columns}
                        selectedValue={selectedFilterField}
                        onChange={handleFilterChange}
                    />
                    <RequestStatusDropdownField data={filteredStatuses} onChange={(selected) => handleStatusChange(selected)} />
                    <ToggleColumnsField
                        clearSelection={clearSelection}
                        selectAll={selectAll}
                        setIsChecked={setIsChecked}
                        isChecked={isChecked}
                        columns={columns}
                        visibleColumns={visibleColumns}
                        toggleColumn={toggleColumn}
                    />
                </div>
            </div>
            <h2 className="mt-2 capitalize bg-status-bg-sky-blue w-max font-semibold text-primary-black text-sm px-3 py-1 rounded-lg">
                {getFilterLabel(selectedFilterField)}
            </h2>
        </>
    );

    useEffect(() => {
        if (Object.keys(visibleColumns).filter((item) => visibleColumns[item]).length === columns.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [visibleColumns]);

    useEffect(() => {
        const normalizedData = [...requestsData];
        const filterValue = globalFilter.toLowerCase();
        const filtered = normalizedData.filter((item) => {
            if (selectedFilterField === 'patient') {
                return item[selectedFilterField].name.toLowerCase().includes(filterValue);
            } else if (selectedFilterField === 'prescriber') {
                return item[selectedFilterField].name.toLowerCase().includes(filterValue);
            } else if (selectedFilterField === 'request_status') {
                return item['statusName'].toLowerCase().includes(filterValue);
            } else if (typeof item[selectedFilterField] === 'string') {
                return item[selectedFilterField].toLowerCase().includes(filterValue);
            }
            return false;
        });

        if (selectedFilterField === 'request_status') {
            // setFilteredRequests(groupRequestsByStatus(filtered, reqStatusesData));
            setFilteredRequests(groupByField(filtered, 'statusName'));
        } else if (selectedFilterField === "notes") {
            setFilteredRequests(groupByField(filtered, 'patient'));
        } else {
            setFilteredRequests(groupByField(filtered, selectedFilterField))
        }
    }, [globalFilter, selectedFilterField, requestsData]);

    return (
        <div className='bg-primary-white rounded-2xl theme-datatable theme-shadow px-4 py-4'>
            {isModalOpen && <AddRequestModal isOpen={isModalOpen} onClose={(isAdded?: boolean) => {
                setIsModalOpen(false);
                if (isAdded) fetchInitialData();
            }} />}
            <div className="flex justify-between gap-4 items-center pb-4 h-16">
                <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black whitespace-nowrap'>Your Requests</h2>
                <div className="inline-flex h-full gap-2 ml-auto">
                    <ThemeButton type="button" className="!h-full min-w-max rounded-xl" variant="secondary">
                        Open Portal
                    </ThemeButton>
                    <ThemeButton className="w-full !h-full rounded-xl" variant="primary" type="button" onClick={() => setIsModalOpen(true)}>
                        Add Request
                    </ThemeButton>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-4 w-10 text-gray-500">
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-primary-sky-blue" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <ThemeDataTable
                    header={tableHeader}
                    data={filteredRequests}
                    columns={columns}
                    pageSize={5}
                    visibleColumns={visibleColumns}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    globalFilterFields={['patient.name', 'medication', 'prescriber.name', 'submittedOn', 'statusName', 'notes', 'lastModified']}
                    onRowClick={(row: any) =>
                        navigate(location.pathname + "/" + row.data.id + "/request-details")
                    }
                />
                // <ThemeDataTable
                //     header={tableHeader}
                //     data={filteredRequests}
                //     columns={columns}
                //     pageSize={5}
                //     searchPlaceholder="Search"
                //     onRowClick={(row: any) => navigate(location.pathname + "/" + row.data.id + "/request-details")}
                //     visibleColumns={visibleColumns}
                //     globalFilter={globalFilter}
                //     setGlobalFilter={setGlobalFilter}
                //     globalFilterFields={['patient.name', 'medication', 'prescriber.name', 'submittedOn', 'request_status', 'notes', 'lastModified']}
                // />
            )}
        </div>
    );
};

export default PharmacyRequests;