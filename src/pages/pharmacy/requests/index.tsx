import ThemeDataTable from "@/components/common/ThemeDataTable";
import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import FilterField from "@/components/common/FilterField";
import ToggleColumnsField from "@/components/common/ToggleColumnsField";
import { FiSearch } from "react-icons/fi";
import ThemeButton from "@/components/common/ThemeButton";
import RequestStatusDropdownField from "./RequestStatusDropdownField";
import { useLocation, useNavigate } from "react-router-dom";
import AddRequestModal from "./AddRequestModal";
import { getAllReqStatuses } from "@/services/pharmacyService";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, FormikValues } from "formik";
import { RootState } from "@/store";
import { getStatusClass } from "@/utils/helper";
import { Dropdown } from "primereact/dropdown";

const sampleData = [
    {
        id: 1,
        patient: { name: 'Razan Ahmad', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Atorvastatin',
        prescriber: { name: 'Dr. Sarah Khan', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-20',
        request_status: '0b7048b1-4969-451f-8504-bf439eee6fd2',
        // request_status: 'Approved With Progress Notes',
        notes: '–',
        lastModified: '2025-05-15 10:30 AM',
        statusClass: "bg-status-success-bg-color text-status-success-text-color"
    },
    {
        id: 2,
        patient: { name: 'Liam Johnson', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Metformin',
        prescriber: { name: 'Dr. John Smith', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-18',
        request_status: '0b7048b1-4969-451f-8504-bf439eee6fd2',
        // request_status: 'Progress Notes Required',
        notes: '05/09/2025: The...',
        lastModified: '2025-05-15 09:00 AM',
        statusClass: "bg-status-bg-sky-blue text-status-text-sky-blue"
    },
    {
        id: 3,
        patient: { name: 'Sophia Williams', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Lisinopril',
        prescriber: { name: 'Dr. Emily Clark', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-15',
        request_status: '0b7048b1-4969-451f-8504-bf439eee6fd2',
        // request_status: 'Process Appeal– Queued For Call',
        notes: '05/15/2025: A fo...',
        lastModified: '2025-05-15 08:00 AM',
        statusClass: "bg-status-warning-bg-color text-status-error-text-color"
    },
    {
        id: 4,
        patient: { name: 'Noah Brown', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Omeprazole',
        prescriber: { name: 'Dr. Michael Lee', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-19',
        request_status: '84b0039e-d646-4e60-82af-cbd84146e8c9',
        // request_status: 'Not Enrolled in the Billed Plan',
        notes: '05/15/2025: A re...',
        lastModified: '2025-05-15 01:15 PM',
        statusClass: "bg-status-bg-lilac-sky text-status-text-lilac-sky"
    },
    {
        id: 5,
        patient: { name: 'Emma Davis', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Amlodipine',
        prescriber: { name: 'Dr. Olivia Garcia', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-17',
        request_status: '0b7048b1-4969-451f-8504-bf439eee6fd2',
        // request_status: 'Updated Progress Notes Required',
        notes: '05/15/2025: A ce...',
        lastModified: '2025-05-15 11:00 AM',
        statusClass: "bg-status-bg-sky-blue text-status-text-sky-blue"
    },
    {
        id: 6,
        patient: { name: 'Ethan Hall', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Losartan',
        prescriber: { name: 'Dr. Ava Martinez', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-14',
        request_status: '84b0039e-d646-4e60-82af-cbd84146e8c9',
        // request_status: 'Not Enrolled in the Billed Plan',
        notes: '05/15/2025: The...',
        lastModified: '2025-05-15 02:30 PM',
        statusClass: "bg-status-bg-lilac-sky text-status-text-lilac-sky"
    },
    {
        id: 7,
        patient: { name: 'Isabella Moore', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Simvastatin',
        prescriber: { name: 'Dr. James Wilson', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-13',
        request_status: '0b7048b1-4969-451f-8504-bf439eee6fd2',
        // request_status: 'Approved With Progress Notes',
        notes: '–',
        lastModified: '2025-05-15 03:10 PM',
        statusClass: "bg-status-success-bg-color text-status-success-text-color"
    }
];

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
                <div className="flex gap-2 items-center">
                    <img src={rowData[field].image} alt="patient img" className="w-10 h-10 rounded-full" />
                    <p>{rowData[field].name}</p>
                </div>
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
                <div className="flex gap-2 items-center">
                    <img src={rowData[field].image} alt="prescriber img" className="w-10 h-10 rounded-full" />
                    <p>{rowData[field].name}</p>
                </div>
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
            field: 'request_status',
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
            sortable: true
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
    const [requestsData, setRequestsData] = useState<any>(sampleData);
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

    const fetchAllReqStatuses = async () => {
        setIsLoading(true);
        await getAllReqStatuses(dispatch).finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (!isFetchedStatuses.current) {
            fetchAllReqStatuses();
            isFetchedStatuses.current = true;
        }
    }, []);

    const handleSubmitStatusChange = async (values: FormikValues) => {
        console.log(values, "values");
    };
    
    // console.log(reqStatusesData.map((item: any) => ({ label: item.name, value: item.id })), "reqStatusesData")
    const requestStatusTemplate = (rowData: any, field: any) => (
        <Formik
            initialValues={{ status: rowData[field] }}
            onSubmit={handleSubmitStatusChange}
            enableReinitialize
        >
            {({ values, setFieldValue, submitForm }) => {
                const statusOptions = reqStatusesData.map((item: any) => ({ label: item.name, value: item.id }));
                const findStatus = reqStatusesData.find((item: any) => item.id === rowData[field]);
                return (
                    <Form>
                        <div onClick={(e) => e.stopPropagation()} className="w-58">
                            <Dropdown
                                value={values.status}
                                options={statusOptions}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setFieldValue("status", e.target.value);
                                    submitForm();
                                }}
                                name="status"
                                className={`!border-0 max-w-58 ${findStatus && getStatusClass(findStatus.name)}`}
                                placeholder="Select Status"
                                // optionGroupTemplate={optionTemplate}
                                // valueTemplate={valueTemplate}
                            />
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );

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
            const filteredData = sampleData.filter(item => status.includes(item.request_status));
            setRequestsData(filteredData);
        } else {
            setRequestsData(sampleData);
        }
    };

    const tableHeader = (
        <div className="flex gap-2 items-center h-12"> {/* Set fixed height here */}
            <div className="relative h-full">
                <InputText
                    value={globalFilter}
                    onChange={(e: any) => setGlobalFilter(e.target.value)}
                    placeholder="Search for request here..."
                    className="!pl-10 !rounded-xl !border-light-stroke h-full" // Force full height
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiSearch className="w-5 h-5" />
                </div>
            </div>

            <div className="inline-flex h-full items-center gap-2">
                <FilterField columns={columns} />
                <RequestStatusDropdownField data={sampleData} onChange={(selected) => handleStatusChange(selected)} />
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

            <div className="inline-flex h-full gap-2 ml-auto">
                <ThemeButton type="button" className="!h-full min-w-max rounded-xl" variant="secondary">
                    Open Portal
                </ThemeButton>
                <ThemeButton className="w-full !h-full rounded-xl" variant="primary" type="button" onClick={() => setIsModalOpen(true)}>
                    Add Request
                </ThemeButton>
            </div>
        </div>
    );

    useEffect(() => {
        if (Object.keys(visibleColumns).filter((item) => visibleColumns[item]).length === columns.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [visibleColumns]);

    return (
        <div className='bg-primary-white rounded-2xl theme-datatable theme-shadow px-4 py-4'>
            {isModalOpen && <AddRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
            <div className="flex justify-between gap-4 items-center pb-4">
                <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black whitespace-nowrap'>Your Requests</h2>
                <div className="flex space-x-2 text-xs border border-quaternary-navy-blue rounded-lg p-0.5">
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
            </div>
            
            {reqStatusesData.length === 0 ? (
                <div className="text-center py-10 text-gray-500">Loading statuses...</div>
            ) : (
                <ThemeDataTable
                    header={tableHeader}
                    data={requestsData}
                    columns={columns}
                    pageSize={5}
                    loading={isLoading}
                    title="Your Requests"
                    searchPlaceholder="Search"
                    onRowClick={(row: any) => navigate(location.pathname + "/" + row.data.id + "/request-details")}
                    visibleColumns={visibleColumns}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    globalFilterFields={['patient.name', 'medication', 'prescriber.name', 'submittedOn', 'request_status', 'notes', 'lastModified']}
                />
            )}
        </div>
    );
};

export default PharmacyRequests;