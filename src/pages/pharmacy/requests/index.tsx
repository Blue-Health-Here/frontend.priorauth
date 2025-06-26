import ThemeDataTable from "@/components/common/ThemeDataTable";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import FilterField from "@/components/common/FilterField";
import ToggleColumnsField from "@/components/common/ToggleColumnsField";
import { FiSearch } from "react-icons/fi";

const sampleData = [
    {
        id: 1,
        patient: { name: 'Razan Ahmad', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Atorvastatin',
        prescriber: { name: 'Dr. Sarah Khan', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-20',
        request_status: 'Approved With Progress Notes',
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
        request_status: 'Progress Notes Required',
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
        request_status: 'Process Appeal– Queued For Call',
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
        request_status: 'Not Enrolled in the Billed Plan',
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
        request_status: 'Updated Progress Notes Required',
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
        request_status: 'Not Enrolled in the Billed Plan',
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
        request_status: 'Approved With Progress Notes',
        notes: '–',
        lastModified: '2025-05-15 03:10 PM',
        statusClass: "bg-status-success-bg-color text-status-success-text-color"
    },
    {
        id: 8,
        patient: { name: 'William Thomas', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Gabapentin',
        prescriber: { name: 'Dr. Mia Anderson', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-12',
        request_status: 'Process Appeal– Queued For Call',
        notes: '05/15/2025: A me...',
        lastModified: '2025-05-15 09:45 AM',
        statusClass: "bg-status-warning-bg-color text-status-error-text-color"
    },
    {
        id: 9,
        patient: { name: 'Ava Martin', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Hydrochlorothiazide',
        prescriber: { name: 'Dr. Daniel Young', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-11',
        request_status: 'Not Enrolled in the Billed Plan',
        notes: '–',
        lastModified: '2025-05-15 04:00 PM',
        statusClass: "bg-status-bg-lilac-sky text-status-text-lilac-sky"
    },
    {
        id: 10,
        patient: { name: 'Lucas Allen', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Levothyroxine',
        prescriber: { name: 'Dr. Grace Hall', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-10',
        request_status: 'Updated Progress Notes Required',
        notes: '05/15/2025: Foll...',
        lastModified: '2025-05-15 10:15 AM',
        statusClass: "bg-status-success-bg-color text-status-success-text-color"
    },
    {
        id: 11,
        patient: { name: 'Mia Scott', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Albuterol',
        prescriber: { name: 'Dr. Henry Clark', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-09',
        request_status: 'Pending Further Authorization',
        notes: '–',
        lastModified: '2025-05-15 11:30 AM',
        statusClass: "bg-status-bg-sky-blue text-status-text-sky-blue"
    },
    {
        id: 12,
        patient: { name: 'Benjamin Lee', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Montelukast',
        prescriber: { name: 'Dr. Zoe Robinson', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-08',
        request_status: 'Appeal In Progress',
        notes: '05/15/2025: The...',
        lastModified: '2025-05-15 12:00 PM',
        statusClass: "bg-status-warning-bg-color text-status-error-text-color"
    },
    {
        id: 13,
        patient: { name: 'Charlotte White', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Sertraline',
        prescriber: { name: 'Dr. David Walker', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-07',
        request_status: 'Approved with Additional Notes',
        notes: '05/15/2025: The...',
        lastModified: '2025-05-15 02:10 PM',
        statusClass: "bg-status-bg-lilac-sky text-status-text-lilac-sky"
    },
    {
        id: 14,
        patient: { name: 'James Harris', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        medication: 'Amoxicillin',
        prescriber: { name: 'Dr. Lily King', image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png" },
        submittedOn: '2025-06-06',
        request_status: 'Not Enrolled in the Billed Plan',
        notes: '05/15/2025: The...',
        lastModified: '2025-05-15 01:20 PM',
        statusClass: "bg-status-bg-sky-blue text-status-text-sky-blue"
    }
];

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
        render: (rowData: any, field: any) => (
            <div className={`px-4 py-1 rounded-full line-clamp-1 max-w-[240px] text-xs sm:text-sm lg:text-base font-normal ${rowData.statusClass}`}>
                {rowData[field]}
            </div>
        )
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

const PharmacyRequests = () => {
    const [visibleColumns, setVisibleColumns] = useState(columns.reduce((acc: any, col: any) => ({ ...acc, [col.field]: col.visible !== false }), {}));
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState('');

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
    const handleRowClick = (row: any) => {
        console.log(row, "row")
    };
    const tableHeader = (
        <div className="flex items-center justify-start gap-4">
            <div className="relative flex-1 max-w-md h-full">
                <InputText
                    value={globalFilter}
                    onChange={(e: any) => setGlobalFilter(e.target.value)}
                    placeholder="Search for request here..."
                    className="w-full !pl-10 !h-full !text-sm !rounded-xl !border-light-stroke"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiSearch className='w-5 h-5' />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <FilterField columns={columns} />
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
    )

    useEffect(() => {
        if (Object.keys(visibleColumns).filter((item) => visibleColumns[item]).length === columns.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [visibleColumns]);

    return (
        <ThemeDataTable
            header={tableHeader}
            data={sampleData}
            columns={columns}
            title="Your Requests"
            searchPlaceholder="Search"
            onRowClick={handleRowClick}
            visibleColumns={visibleColumns}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            globalFilterFields={['patient.name', 'medication', 'prescriber.name', 'submittedOn', 'request_status', 'notes', 'lastModified']}
        />
    );
};

export default PharmacyRequests;