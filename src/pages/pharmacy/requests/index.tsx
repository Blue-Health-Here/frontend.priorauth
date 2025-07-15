import ThemeDataTable from "@/components/common/ThemeDataTable";
import React, { useEffect, useRef, useState } from "react";
import FilterField from "@/components/common/FilterField";
import ToggleColumnsField from "@/components/common/ToggleColumnsField";
import ThemeButton from "@/components/common/ThemeButton";
import { useLocation, useNavigate } from "react-router-dom";
import AddRequestModal from "./AddRequestModal";
import { getAllPharmacyReqs, getAllReqStatuses, updateRequestStatus } from "@/services/pharmacyService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { filterRequestsByStatus, getStatusClass, groupByField, transformPharmacyRequest } from "@/utils/helper";
import RequestStatusDropdownField from "./RequestStatusDropdownField";
import SearchField from "@/components/common/SearchField";
import Loading from "@/components/common/Loading";
import RequestStatusDropdown from "@/components/RequestStatusDropdown";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";
import NameBadge from "@/components/NameBadge";
import NotesCell from "./NotesCell";

const PharmacyRequests: React.FC<any> = ({ isAdmin }) => {
    const columns = [
        {
            field: 'patient',
            header: 'Name',
            visible: true,
            filterable: true,
            sortable: true,
            customTemplate: true,
            render: (rowData: any, field: any) => <NameBadge data={rowData[field]} />
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
            render: (rowData: any, field: any) => <NameBadge data={rowData[field]} />
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
                <NotesCell note={rowData[field]} />
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
    const { reqStatusesData } = useSelector((state: RootState) => state.reqStatuses);
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
    const [selectedFilterField, setSelectedFilterField] = useState("");
    const [filteredRequests, setFilteredRequests] = useState<any[]>([]);

    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            if (isAdmin) {
                await Promise.all([
                    getAllReqStatuses(dispatch),
                    getAllPharmacyReqs(dispatch),
                ]);
            } else {
                await Promise.all([
                    getAllPharmacyReqs(dispatch),
                ]);
            }
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
            setFilteredStatuses(reqsData.map((item: any) => ({ 
                id: item.request_status, name: item.paStatus, statusClass: getStatusClass(item.paStatus) 
            })))
        }
    }, [reqsData]);
    
    const handleSubmitStatusChange = async (value: any, rowData: any) => {
        await updateRequestStatus(dispatch, rowData?.id, { 
            statusId: value.code, paStatus: value.name 
        }).then(() => fetchInitialData());
    };
    
    const requestStatusTemplate = (rowData: any, field: any) => {
        if (isAdmin) {
            return <RequestStatusDropdown
                className={`!border-0 max-w-48 !text-sm status-dropdown`}
                selectedValue={rowData[field]} 
                handleChange={(value: any) => handleSubmitStatusChange(value, rowData)}
                data={reqStatusesData.map((item: any) => ({ name: item.name, code: item.id }))} 
            />
        } else {
            const statusClass = getStatusClass(rowData[field]);
            return (
                <div className={`text-sm font-medium truncate px-4 py-2 rounded-full max-w-58 ${statusClass}`}>
                    {rowData[field]}
                </div>
            );
        }
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
            const filteredData = filterRequestsByStatus(groupByField(requestsData, selectedFilterField), status);
            setFilteredRequests(filteredData);
        } else {
            setFilteredRequests(groupByField(requestsData, selectedFilterField));
        }
    };

    const handleFilterChange = (field: string) => {
        setSelectedFilterField(field);
    };

    const tableHeader = (
        <>
            <div className="inline-flex gap-2 items-center h-12 flex-wrap w-full">
                <ThemeButtonTabs 
                    data={['All Requests', 'Active Requests']} 
                    activeTab={activeRequestTab} setActiveTab={setActiveRequestTab} />
                <div className="inline-flex h-full items-center gap-2 ml-auto">
                    <SearchField globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
                    <FilterField
                        columns={columns.filter((item: any) => item.field !== "notes")}
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
            {/* <h2 className="mt-2 capitalize bg-status-bg-sky-blue w-max font-semibold text-primary-black text-sm px-4 py-2 rounded-lg">
                {getFilterLabel(selectedFilterField)}
            </h2> */}
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
        <div className='bg-primary-white rounded-lg theme-datatable theme-shadow px-4 py-4'>
            {isModalOpen && <AddRequestModal isOpen={isModalOpen} onClose={(isAdded?: boolean) => {
                setIsModalOpen(false);
                if (isAdded) fetchInitialData();
            }} />}
            <div className="flex justify-between gap-4 items-center pb-2 h-14 flex-wrap">
                <h2 className='text-xl font-semibold text-primary-black whitespace-nowrap'>Your Requests</h2>
                <div className="inline-flex h-full gap-2 sm:ml-auto">
                    <ThemeButton type="button" className="!h-full min-w-max rounded-lg" variant="secondary">
                        Open Portal
                    </ThemeButton>
                    <ThemeButton className="w-full !h-full rounded-lg" variant="primary" type="button" onClick={() => setIsModalOpen(true)}>
                        Add Request
                    </ThemeButton>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-4 w-10 text-gray-500">
                    <Loading />
                </div>
            ) : (
                <ThemeDataTable
                    header={tableHeader}
                    data={selectedFilterField !== "" ? filteredRequests : requestsData}
                    columns={columns}
                    pageSize={5}
                    selectedFilterField={selectedFilterField}
                    visibleColumns={visibleColumns}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    globalFilterFields={['patient.name', 'medication', 'prescriber.name', 'submittedOn', 'statusName', 'notes', 'lastModified']}
                    onRowClick={(row: any) =>
                        navigate(location.pathname + "/" + row.data.id + "/request-details")
                    }
                />
            )}
        </div>
    );
};

export default PharmacyRequests;