import ThemeDataTable from "@/components/common/ThemeDataTable";
import { useEffect, useState } from "react";
import UnlockAccessInfoModal from "./UnlockAccessInfoModal";
import ToggleColumnsField from "@/components/common/ToggleColumnsField";
import SearchField from "@/components/common/SearchField";
import { getAvatarInfo } from "@/utils/avatar";

const CMMAccountDatabase = () => {
    const sampleData = [
        {
            id: 1,
            prescriber: { name: 'Razan Ahmad', image: "/images/Abstergo Ltd..png" },
            name: 'Razan Ahmad',
            officeEmail: 'asadrazan12@gmail.com',
            officePassword: 'password123',
            faxNumber: '(484) 350-3141',
            contactPhone: '610-402-5391',
            cmmUsername: 'asadrazan12',
            appPassword: 'password123',
            zipCode: '19104',
            accountInfo: 'ebb9c0be-fd03-4abd-aa54-566f7bcef67f'
        },
        {
            id: 2,
            prescriber: { name: 'Liam Johnson', image: "/images/Acme Co..png" },
            name: 'Liam Johnson',
            officeEmail: 'liam.johnson@email.com',
            officePassword: 'password123',
            faxNumber: '(123) 456-7890',
            contactPhone: '321-654-0987',
            cmmUsername: 'liamjohnson',
            appPassword: 'password123',
            zipCode: '90210',
            accountInfo: '4ab0ee81-6f60-4e9d-ac44-6330a9803f53'
        },
        {
            id: 3,
            prescriber: { name: 'Sophia Williams', image: "/images/Barone LLC..png" },
            name: 'Razan Ahmad',
            officeEmail: 'sophia.w@email.com',
            officePassword: 'password123',
            faxNumber: '(987) 654-3210',
            contactPhone: '654-321-0987',
            cmmUsername: 'sophiaw',
            appPassword: 'password123',
            zipCode: '10001',
            accountInfo: 'ebb9c0be-fd03-4abd-aa54-566f7bcef67f'
        },
        {
            id: 4,
            prescriber: { name: 'Noah Brown', image: "/images/Big Kahuna Ltd..png" },
            name: 'Noah Brown',
            officeEmail: 'noah.brown@email.com',
            officePassword: 'password123',
            faxNumber: '(555) 123-4567',
            contactPhone: '765-432-1098',
            cmmUsername: 'noahbrown',
            appPassword: 'password123',
            zipCode: '60614',
            accountInfo: '4ab0ee81-6f60-4e9d-ac44-6330a9803f53'
        },
        {
            id: 5,
            prescriber: { name: 'Olivia Jones', image: "/images/notify3.png" },
            name: 'Emma Davis',
            officeEmail: 'olivia.jones@email.com',
            officePassword: 'password123',
            faxNumber: '(777) 888-9999',
            contactPhone: '456-789-0123',
            cmmUsername: 'emmadavis',
            appPassword: 'password123',
            zipCode: '30301',
            accountInfo: 'ebb9c0be-fd03-4abd-aa54-566f7bcef67f'
        }
    ];

    const columns = [
        {
            field: 'prescriber',
            header: 'Prescriber Name',
            visible: true,
            filterable: true,
            sortable: true,
            customTemplate: true,
            render: (rowData: any, field: any) => {
                const { initials, bgColor }: any = getAvatarInfo(rowData[field].name);
                return (
                    <div className="flex gap-2 items-center">
                        <span 
                            className="w-10 h-10 rounded-full text-center align-middle leading-10"
                            style={{
                                backgroundColor: bgColor,
                                color: "white",
                            }}
                        >
                            {initials}
                        </span>
                        <span>{rowData[field].name}</span>
                    </div>
                )
            }
        },
        {
            field: 'cmmUsername',
            header: 'CMM Username',
            visible: true,
            filterable: true,
            sortable: true
        },
        {
            field: 'officePassword',
            header: 'CMM Password',
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
            field: 'officeEmail',
            header: 'Gmail',
            visible: true,
            filterable: true,
            sortable: true,
            className: '!min-w-[240px]'
        },
        {
            field: 'zipCode',
            header: 'Zip Code',
            visible: true,
            filterable: false,
            sortable: false,
            className: '!min-w-40'
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
            field: 'accountInfo',
            header: 'Account Info',
            visible: true,
            filterable: false,
            sortable: false,
            className: 'whitespace-nowrap !max-w-max'
        }
    ];

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState(columns.reduce((acc: any, col: any) => ({ 
        ...acc, [col.field]: col.visible !== false 
    }), {}));
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleOpenPasswordModal = (event: any) => {
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
        <div className="flex flex-col md:flex-row gap-2 md:items-center h-12">
            <div className="flex gap-2 w-full">
                <div className={isMobile ? "flex-1 min-w-0" : "flex-grow md:flex-grow-0"}>
                    <SearchField 
                        globalFilter={globalFilter} 
                        setGlobalFilter={setGlobalFilter} 
                    />
                </div>
                <div className={isMobile ? "flex-shrink-0" : ""}>
                    <ToggleColumnsField
                        clearSelection={clearSelection}
                        selectAll={selectAll}
                        setIsChecked={setIsChecked}
                        isChecked={isChecked}
                        columns={columns}
                        visibleColumns={visibleColumns}
                        toggleColumn={toggleColumn}
                        buttonText={isMobile ? "Actions" : "Fields"}
                    />
                </div>
            </div>
        </div>
    );

    // Mobile view shows only first 2 columns by default
    const mobileVisibleColumns = {
        ...columns.reduce((acc: any, col: any) => ({ ...acc, [col.field]: false }), {}),
        prescriber: true,
        cmmUsername: true
    };

    return (
        <div className='bg-primary-white rounded-2xl theme-datatable theme-shadow px-4 py-4'>
            <h2 className='text-xl font-semibold text-primary-black whitespace-nowrap pb-4'>CMM Account Database</h2>
            {isOpenModal && <UnlockAccessInfoModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />}
            <div className={isMobile ? "overflow-x-auto" : ""}>
                <ThemeDataTable
                    header={header}
                    data={sampleData}
                    columns={columns}
                    searchPlaceholder="Search..."
                    visibleColumns={isMobile ? mobileVisibleColumns : visibleColumns}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    handleClickOpenPasswordModal={handleOpenPasswordModal}
                    className={isMobile ? "min-w-[600px]" : ""}
                />
            </div>
        </div>
    );
};

export default CMMAccountDatabase;