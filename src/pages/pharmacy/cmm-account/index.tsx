import ThemeDataTable from "@/components/common/ThemeDataTable";

// Example usage component
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
            name: 'Sophia Williams',
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

    const handleRowClick = (event: any) => {
        console.log('Row clicked:', event.data);
    };

    const handleOpenPasswordModal = (event: any) => {
        event.stopPropagation();
        console.log(event, "event");
    };

    return (
        <ThemeDataTable
            data={sampleData}
            columns={columns}
            title="CMM Account Database"
            searchPlaceholder="Search..."
            onRowClick={handleRowClick}
            handleClickOpenPasswordModal={handleOpenPasswordModal}
        />
    );
};

export default CMMAccountDatabase;