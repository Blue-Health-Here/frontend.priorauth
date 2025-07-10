import ThemeDataTable from "@/components/common/ThemeDataTable";
import { useEffect, useState } from "react";
import UnlockAccessInfoModal from "./UnlockAccessInfoModal";
import FilterField from "@/components/common/FilterField";
import ToggleColumnsField from "@/components/common/ToggleColumnsField";
import SearchField from "@/components/common/SearchField";
import ThemeButtonTabs from "@/components/ThemeButtonTabs";
import ThemeButton from "@/components/common/ThemeButton";
import { GoLock } from "react-icons/go";
import { getFilterLabel, groupByField } from "@/utils/helper";

const CMMAccountDatabase = () => {
    const sampleData = [
        {
            id: 1,
            name: 'Razan Ahmad',
            officeEmail: 'asadrazan12@gmail.com',
            officePassword: 'password123',
            faxNumber: '(484) 350-3141',
            contactPhone: '610-402-5391',
            cmmUsername: 'asadrazan12',
            appPassword: 'password123'
        },
        {
            id: 2,
            name: 'Liam Johnson',
            officeEmail: 'liam.johnson@email.com',
            officePassword: 'password123',
            faxNumber: '(123) 456-7890',
            contactPhone: '321-654-0987',
            cmmUsername: 'liamjohnson',
            appPassword: 'password123'
        },
        {
            id: 3,
            name: 'Razan Ahmad',
            officeEmail: 'sophia.w@email.com',
            officePassword: 'password123',
            faxNumber: '(987) 654-3210',
            contactPhone: '654-321-0987',
            cmmUsername: 'sophiaw',
            appPassword: 'password123'
        },
        {
            id: 4,
            name: 'Noah Brown',
            officeEmail: 'noah.brown@email.com',
            officePassword: 'password123',
            faxNumber: '(555) 123-4567',
            contactPhone: '765-432-1098',
            cmmUsername: 'noahbrown',
            appPassword: 'password123'
        },
        {
            id: 5,
            name: 'Emma Davis',
            officeEmail: 'emma.davis@email.com',
            officePassword: 'password123',
            faxNumber: '(777) 888-9999',
            contactPhone: '456-789-0123',
            cmmUsername: 'emmadavis',
            appPassword: 'password123'
        }
    ];

    const columns = [
        {
            field: 'name',
            header: 'Name',
            visible: true,
            filterable: true,
            sortable: true
        },
        {
            field: 'officeEmail',
            header: 'Office Email',
            visible: true,
            filterable: true,
            sortable: true
        },
        {
            field: 'officePassword',
            header: 'Office Password',
            type: 'password',
            visible: true,
            filterable: false,
            sortable: false
        },
        {
            field: 'faxNumber',
            header: 'Fax Number',
            visible: true,
            filterable: true,
            sortable: true
        },
        {
            field: 'contactPhone',
            header: 'Contact Phone',
            visible: true,
            filterable: true,
            sortable: true
        },
        {
            field: 'cmmUsername',
            header: 'CMM Username',
            visible: true,
            filterable: true,
            sortable: true
        },
        {
            field: 'appPassword',
            header: 'App Password',
            type: 'password',
            visible: true,
            filterable: false,
            sortable: false
        },
        {
            field: 'address',
            header: 'Address',
            visible: false,
            filterable: false,
            sortable: false
        },
        {
            field: 'city',
            header: 'City',
            visible: false,
            filterable: false,
            sortable: false
        },
        {
            field: 'state',
            header: 'State',
            visible: false,
            filterable: false,
            sortable: false
        },
        {
            field: 'zipCode',
            header: 'Zip Code',
            visible: false,
            filterable: false,
            sortable: false
        }
    ];

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedFilterField, setSelectedFilterField] = useState("");
    const [activeTab, setActiveTab] = useState("Prescribers");
    const [filteredCMMAccountDatabase, setfilteredCMMAccountDatabase] = useState<any>([]);
    const [visibleColumns, setVisibleColumns] = useState(columns.reduce((acc: any, col: any) => ({ 
        ...acc, [col.field]: col.visible !== false 
    }), {}));
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState('');

    const handleRowClick = (event: any) => {console.log('Row clicked:', event.data)};
    const handleOpenPasswordModal = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        setIsOpenModal(true);
    };

    const toggleColumn = (columnField: any) => {
        setVisibleColumns((prev: any) => ({
            ...prev,
            [columnField]: !prev[columnField]
        }));
    };

    const clearSelection = () => {
        setVisibleColumns(columns.reduce((acc: any, col: any) => ({ ...acc, [col.field]: false }), {}));
        setIsChecked(false);
    };

    const selectAll = (value: any) => {
        setVisibleColumns(columns.reduce((acc: any, col: any) => ({ ...acc, [col.field]: value }), {}));
    };

    const handleFilterChange = (field: string) => {
        setSelectedFilterField(field);
    };

    const header = (
        <>
            <div className="flex gap-2 items-center h-12 flex-wrap">
                <ThemeButtonTabs 
                    data={['Prescribers', 'Pharmacy', 'Barrons']} 
                    activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="inline-flex h-full items-center gap-2 ml-auto">
                    <SearchField globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
                    <ToggleColumnsField
                        clearSelection={clearSelection}
                        selectAll={selectAll}
                        setIsChecked={setIsChecked}
                        isChecked={isChecked}
                        columns={columns}
                        visibleColumns={visibleColumns}
                        toggleColumn={toggleColumn}
                    />
                    <FilterField columns={columns}
                        selectedValue={selectedFilterField} onChange={handleFilterChange} />
                    <ThemeButton variant="primary" type="button">
                        <p className="flex gap-2 items-center">
                            <span>Unlock Access</span>
                            <GoLock className="text-base" />
                        </p>
                    </ThemeButton>
                </div>
            </div>
            {selectedFilterField && <h2 className="mt-2 capitalize bg-status-bg-sky-blue w-max font-semibold text-primary-black text-sm px-4 py-2 rounded-lg">
                {getFilterLabel(selectedFilterField)}
            </h2>}
        </>
    )

    useEffect(() => {
        if (Object.keys(visibleColumns).filter((item) => visibleColumns[item]).length === columns.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [visibleColumns]);

    useEffect(() => {
        const normalizedData = [...sampleData];
        const filterValue = globalFilter.toLowerCase();
        const filtered = normalizedData.filter((item: any) => {
            if (typeof item[selectedFilterField] === 'string') {
                return item[selectedFilterField].toLowerCase().includes(filterValue);
            }
            return false;
        });

        setfilteredCMMAccountDatabase(groupByField(filtered, selectedFilterField))
    }, [selectedFilterField]);

    return (
        <div className='bg-primary-white rounded-2xl theme-datatable theme-shadow px-4 py-4'>
            <h2 className='text-xl font-semibold text-primary-black whitespace-nowrap pb-4'>CMM Account Database</h2>
            {isOpenModal && <UnlockAccessInfoModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />}
            <ThemeDataTable
                header={header}
                data={selectedFilterField !== "" ? filteredCMMAccountDatabase : sampleData}
                columns={columns}
                searchPlaceholder="Search..."
                onRowClick={handleRowClick}
                visibleColumns={visibleColumns}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                handleClickOpenPasswordModal={handleOpenPasswordModal}
            />
        </div>
    );
};

export default CMMAccountDatabase;