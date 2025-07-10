import ThemeDataTable from "@/components/common/ThemeDataTable";
import { useEffect, useState } from "react";
import UnlockAccessInfoModal from "./UnlockAccessInfoModal";
import ToggleColumnsField from "@/components/common/ToggleColumnsField";
import SearchField from "@/components/common/SearchField";

const CMMAccountDatabase = () => {
    const sampleData = [
        {
            id: 1,
            pharmacyName: 'ABC Pharmacy 1',
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
            pharmacyName: 'ABC Pharmacy 2',
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
            pharmacyName: 'ABC Pharmacy 3',
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
            pharmacyName: 'ABC Pharmacy 4',
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
            pharmacyName: 'ABC Pharmacy 5',
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

    const header = (
        <>
            <div className="flex gap-2 items-center h-12 flex-wrap">
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
            </div>
        </>
    )

    useEffect(() => {
        if (Object.keys(visibleColumns).filter((item) => visibleColumns[item]).length === columns.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [visibleColumns]);

    return (
        <div className='bg-primary-white rounded-2xl theme-datatable theme-shadow px-4 py-4'>
            <h2 className='text-xl font-semibold text-primary-black whitespace-nowrap pb-4'>CMM Account Database</h2>
            {isOpenModal && <UnlockAccessInfoModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />}
            <ThemeDataTable
                header={header}
                data={sampleData}
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